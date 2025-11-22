import { useState } from "react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Icon from "@/components/ui/icon";
import { useToast } from "@/hooks/use-toast";

const CreateNFT = () => {
  const { toast } = useToast();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const userBalance = 500;
  const creationCost = 150;
  const canCreate = userBalance >= creationCost;

  const handleCreate = () => {
    if (!title.trim()) {
      toast({
        title: "Ошибка",
        description: "Укажите название NFT",
        variant: "destructive"
      });
      return;
    }

    if (!canCreate) {
      toast({
        title: "Недостаточно энефтиксов",
        description: `Нужно ${creationCost} 💎, у вас ${userBalance} 💎`,
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "NFT создан!",
      description: `"${title}" успешно добавлен в вашу коллекцию`,
    });

    setTitle("");
    setDescription("");
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="mb-8">
          <h1 className="text-4xl font-heading font-bold mb-4">Создать NFT</h1>
          <p className="text-muted-foreground">Превратите свою идею в уникальный цифровой актив</p>
        </div>

        <Card className="p-6 mb-6">
          <div className="flex items-center justify-between p-4 bg-primary/5 rounded-lg border border-primary/20">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Icon name="Wallet" size={24} className="text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Ваш баланс</p>
                <p className="text-2xl font-heading font-bold">{userBalance} 💎</p>
                <p className="text-xs text-muted-foreground">{userBalance * 10} ₽</p>
              </div>
            </div>
            <Link to="/wallet">
              <Button variant="outline">
                <Icon name="Plus" size={16} className="mr-2" />
                Пополнить
              </Button>
            </Link>
          </div>
        </Card>

        <Card className="p-6 mb-6">
          <Alert className={canCreate ? "bg-primary/5 border-primary/20" : "bg-destructive/5 border-destructive/20"}>
            <Icon name={canCreate ? "Sparkles" : "AlertCircle"} size={20} />
            <AlertDescription>
              Стоимость создания NFT: <strong>{creationCost} 💎</strong> ({creationCost * 10} ₽)
              {!canCreate && (
                <span className="block mt-2 text-destructive">
                  Недостаточно энефтиксов. Пополните баланс для создания NFT.
                </span>
              )}
            </AlertDescription>
          </Alert>
        </Card>

        <Card className="p-6">
          <div className="space-y-6">
            <div className="border-2 border-dashed border-muted rounded-lg p-12 text-center hover:border-primary transition-colors cursor-pointer">
              <Icon name="Upload" size={48} className="mx-auto text-muted-foreground mb-4" />
              <p className="font-heading font-semibold mb-2">Загрузите изображение</p>
              <p className="text-sm text-muted-foreground">PNG, JPG, GIF до 10MB</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="title">Название *</Label>
              <Input 
                id="title"
                placeholder="Введите название NFT"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Описание</Label>
              <Textarea 
                id="description"
                placeholder="Расскажите о вашем NFT..."
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">Цена продажи (₽)</Label>
              <Input 
                id="price"
                type="number"
                placeholder="0"
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button 
                className="flex-1"
                size="lg"
                onClick={handleCreate}
                disabled={!canCreate}
              >
                <Icon name="Sparkles" size={20} className="mr-2" />
                Создать за {creationCost} 💎
              </Button>
              <Button variant="outline" size="lg">
                Отмена
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default CreateNFT;