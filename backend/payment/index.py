import json
import os
import uuid
from typing import Dict, Any
import requests
from base64 import b64encode

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Create payment for balance top-up via YooKassa
    Args: event with httpMethod, body, queryStringParameters
          context with request_id attribute
    Returns: HTTP response with payment URL or confirmation URL
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-User-Id',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method == 'POST':
        body_data = json.loads(event.get('body', '{}'))
        amount_eneftix = body_data.get('amount', 0)
        user_id = event.get('headers', {}).get('x-user-id', 'guest')
        
        if amount_eneftix < 10:
            return {
                'statusCode': 400,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'error': 'Minimum amount is 10 eneftix'}),
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
        
        payment_data = {
            "amount": {
                "value": f"{amount_rub:.2f}",
                "currency": "RUB"
            },
            "confirmation": {
                "type": "redirect",
                "return_url": body_data.get('return_url', 'https://your-app.com/profile')
            },
            "capture": True,
            "description": f"Пополнение баланса {amount_eneftix} энефтиксов",
            "metadata": {
                "user_id": user_id,
                "amount_eneftix": amount_eneftix
            }
        }
        
        try:
            response = requests.post(
                'https://api.yookassa.ru/v3/payments',
                json=payment_data,
                headers={
                    'Authorization': f'Basic {auth_header}',
                    'Idempotence-Key': idempotence_key,
                    'Content-Type': 'application/json'
                },
                timeout=10
            )
            
            result = response.json()
            
            if response.status_code == 200:
                return {
                    'statusCode': 200,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({
                        'payment_id': result.get('id'),
                        'confirmation_url': result.get('confirmation', {}).get('confirmation_url'),
                        'status': result.get('status')
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
