import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Icon from "@/components/ui/icon";
import { useToast } from "@/hooks/use-toast";

const Wallet = () => {
  const { toast } = useToast();
  const [topupAmount, setTopupAmount] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const userBalance = 500;

  const handleTopup = async () => {
    const amount = parseInt(topupAmount);
    
    if (!amount || amount < 10) {
      toast({
        title: "Ошибка",
        description: "Минимальная сумма пополнения: 10 💎",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('https://functions.poehali.dev/c6b65e60-1d34-48a8-a2ed-0c37116ef44a', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-User-Id': 'user123'
        },
        body: JSON.stringify({
          amount: amount,
          return_url: window.location.origin + '/wallet'
        })
      });

      const data = await response.json();

      if (response.ok && data.confirmation_url) {
        window.location.href = data.confirmation_url;
      } else {
        toast({
          title: "Ошибка",
          description: data.error || "Не удалось создать платеж",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Проблема с подключением к платежной системе",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleWithdraw = async () => {
    const amount = parseInt(withdrawAmount);
    
    if (!amount || amount < 10) {
      toast({
        title: "Ошибка",
        description: "Минимальная сумма вывода: 10 💎",
        variant: "destructive"
      });
      return;
    }

    if (amount > userBalance) {
      toast({
        title: "Недостаточно средств",
        description: `У вас на балансе ${userBalance} 💎`,
        variant: "destructive"
      });
      return;
    }

    if (!phone) {
      toast({
        title: "Ошибка",
        description: "Укажите номер телефона карты",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('https://functions.poehali.dev/2536a5f9-8aae-43bc-9141-9d3d027f6f70', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-User-Id': 'user123'
        },
        body: JSON.stringify({
          amount: amount,
          phone: phone
        })
      });

      const data = await response.json();

      if (response.ok) {
        toast({
          title: "Заявка создана",
          description: "Вывод средств будет обработан в течение 1-3 дней"
        });
        setWithdrawAmount("");
        setPhone("");
      } else {
        toast({
          title: "Ошибка",
          description: data.error || "Не удалось создать заявку на вывод",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Проблема с подключением",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="mb-8">
          <h1 className="text-4xl font-heading font-bold mb-4">Кошелек</h1>
          <p className="text-muted-foreground">Управление балансом энефтиксов</p>
        </div>

        <Card className="p-6 mb-6">
          <div className="flex items-center justify-between p-6 bg-gradient-to-r from-primary to-secondary rounded-lg text-primary-foreground">
            <div className="flex items-center gap-4">
              <div className="p-4 bg-white/20 rounded-lg">
                <Icon name="Wallet" size={32} />
              </div>
              <div>
                <p className="text-sm opacity-90">Текущий баланс</p>
                <p className="text-4xl font-heading font-bold">{userBalance} 💎</p>
                <p className="text-sm opacity-90">{userBalance * 10} ₽</p>
              </div>
            </div>
          </div>
        </Card>

        <Tabs defaultValue="topup" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="topup">
              <Icon name="Plus" size={16} className="mr-2" />
              Пополнить
            </TabsTrigger>
            <TabsTrigger value="withdraw">
              <Icon name="ArrowDownToLine" size={16} className="mr-2" />
              Вывести
            </TabsTrigger>
          </TabsList>

          <TabsContent value="topup" className="mt-6">
            <Card className="p-6">
              <Alert className="mb-6">
                <Icon name="Info" size={20} />
                <AlertDescription>
                  1 энефтикс = 10 ₽. Минимальная сумма пополнения: 10 💎 (100 ₽)
                </AlertDescription>
              </Alert>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="topup-amount">Количество энефтиксов</Label>
                  <Input
                    id="topup-amount"
                    type="number"
                    placeholder="100"
                    value={topupAmount}
                    onChange={(e) => setTopupAmount(e.target.value)}
                    min="10"
                  />
                  {topupAmount && (
                    <p className="text-sm text-muted-foreground">
                      К оплате: {parseInt(topupAmount) * 10} ₽
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {[50, 100, 500].map((amount) => (
                    <Button
                      key={amount}
                      variant="outline"
                      onClick={() => setTopupAmount(amount.toString())}
                    >
                      {amount} 💎
                    </Button>
                  ))}
                </div>

                <Button
                  className="w-full"
                  size="lg"
                  onClick={handleTopup}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>Загрузка...</>
                  ) : (
                    <>
                      <Icon name="CreditCard" size={20} className="mr-2" />
                      Перейти к оплате
                    </>
                  )}
                </Button>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="withdraw" className="mt-6">
            <Card className="p-6">
              <Alert className="mb-6 bg-yellow-50 border-yellow-200">
                <Icon name="AlertCircle" size={20} />
                <AlertDescription>
                  Вывод средств обрабатывается 1-3 рабочих дня. Минимум: 10 💎 (100 ₽)
                </AlertDescription>
              </Alert>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="withdraw-amount">Количество энефтиксов</Label>
                  <Input
                    id="withdraw-amount"
                    type="number"
                    placeholder="50"
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(e.target.value)}
                    min="10"
                    max={userBalance}
                  />
                  {withdrawAmount && (
                    <p className="text-sm text-muted-foreground">
                      Вы получите: {parseInt(withdrawAmount) * 10} ₽
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Номер телефона карты</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+79001234567"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">
                    Укажите номер телефона, привязанный к карте
                  </p>
                </div>

                <Button
                  className="w-full"
                  size="lg"
                  onClick={handleWithdraw}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>Загрузка...</>
                  ) : (
                    <>
                      <Icon name="Send" size={20} className="mr-2" />
                      Создать заявку на вывод
                    </>
                  )}
                </Button>
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        <Card className="mt-6 p-4 bg-muted/30">
          <div className="flex items-start gap-3">
            <Icon name="Shield" size={20} className="text-primary mt-0.5" />
            <div className="text-sm">
              <p className="font-medium mb-1">Безопасность платежей</p>
              <p className="text-muted-foreground">
                Все платежи обрабатываются через защищенную систему ЮKassa. 
                Ваши данные надежно защищены.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Wallet;
