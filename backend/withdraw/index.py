import json
import os
import uuid
from typing import Dict, Any
import requests
from base64 import b64encode

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Process withdrawal from eneftix balance to phone number
    Args: event with httpMethod, body with amount and phone
          context with request_id attribute
    Returns: HTTP response with withdrawal status
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-User-Id',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method == 'POST':
        body_data = json.loads(event.get('body', '{}'))
        amount_eneftix = body_data.get('amount', 0)
        user_phone = body_data.get('phone', '')
        user_id = event.get('headers', {}).get('x-user-id', 'guest')
        
        if amount_eneftix < 10:
            return {
                'statusCode': 400,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'error': 'Minimum withdrawal is 10 eneftix'}),
                'isBase64Encoded': False
            }
        
        if not user_phone:
            return {
                'statusCode': 400,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'error': 'Phone number required'}),
                'isBase64Encoded': False
            }
        
        amount_rub = amount_eneftix * 10
        
        shop_id = os.environ.get('YOOKASSA_SHOP_ID', '')
        secret_key = os.environ.get('YOOKASSA_SECRET_KEY', '')
        
        if not shop_id or not secret_key:
            return {
                'statusCode': 500,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'error': 'Payment system not configured'}),
                'isBase64Encoded': False
            }
        
        idempotence_key = str(uuid.uuid4())
        auth_string = f"{shop_id}:{secret_key}"
        auth_header = b64encode(auth_string.encode()).decode()
        
        payout_data = {
            "amount": {
                "value": f"{amount_rub:.2f}",
                "currency": "RUB"
            },
            "payout_destination_data": {
                "type": "bank_card",
                "card": {
                    "number": user_phone
                }
            },
            "description": f"Вывод {amount_eneftix} энефтиксов",
            "metadata": {
                "user_id": user_id
            }
        }
        
        try:
            response = requests.post(
                'https://api.yookassa.ru/v3/payouts',
                json=payout_data,
                headers={
                    'Authorization': f'Basic {auth_header}',
                    'Idempotence-Key': idempotence_key,
                    'Content-Type': 'application/json'
                },
                timeout=10
            )
            
            result = response.json()
            
            if response.status_code in [200, 201]:
                return {
                    'statusCode': 200,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({
                        'payout_id': result.get('id'),
                        'status': result.get('status'),
                        'message': 'Withdrawal request created successfully'
                    }),
                    'isBase64Encoded': False
                }
            else:
                return {
                    'statusCode': response.status_code,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({'error': result}),
                    'isBase64Encoded': False
                }
                
        except Exception as e:
            return {
                'statusCode': 500,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'error': str(e)}),
                'isBase64Encoded': False
            }
    
    return {
        'statusCode': 405,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps({'error': 'Method not allowed'}),
        'isBase64Encoded': False
    }
