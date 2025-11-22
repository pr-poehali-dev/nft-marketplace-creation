import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";

const featuredNFTs = [
  {
    id: 1,
    title: "Cosmic Dreams",
    creator: "ArtistOne",
    price: 250,
    image: "https://cdn.poehali.dev/projects/64ba5f44-4177-4cb8-b85d-f74f7b34a55c/files/fd1c0fb7-78e1-47c1-9629-be5d2dd928a0.jpg",
    trending: true
  },
  {
    id: 2,
    title: "Neon Geometry",
    creator: "CryptoCreator",
    price: 180,
    image: "https://cdn.poehali.dev/projects/64ba5f44-4177-4cb8-b85d-f74f7b34a55c/files/2a41396e-2fe3-4036-849d-9acec1c08119.jpg",
    trending: false
  },
  {
    id: 3,
    title: "Cyber Portrait",
    creator: "DigitalMaster",
    price: 320,
    image: "https://cdn.poehali.dev/projects/64ba5f44-4177-4cb8-b85d-f74f7b34a55c/files/bc4a00ee-71b1-4ab2-ae42-8cfc956bbb23.jpg",
    trending: true
  }
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <section className="relative overflow-hidden py-20 md:py-32 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-4 px-4 py-2" variant="secondary">
              <Icon name="Sparkles" size={16} className="mr-2" />
              Маркетплейс цифровых активов
            </Badge>
            <h1 className="text-5xl md:text-7xl font-heading font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Создавайте и торгуйте NFT
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Уникальная платформа для создания, покупки и продажи цифровых активов. 
              Превратите свои идеи в NFT с помощью энефтиксов.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/catalog">
                <Button size="lg" className="gap-2 text-lg px-8">
                  <Icon name="Grid3x3" size={20} />
                  Смотреть каталог
                </Button>
              </Link>
              <Link to="/create">
                <Button size="lg" variant="outline" className="gap-2 text-lg px-8">
                  <Icon name="Plus" size={20} />
                  Создать NFT
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-heading font-bold mb-2">Популярные NFT</h2>
              <p className="text-muted-foreground">Самые горячие предложения на маркетплейсе</p>
            </div>
            <Link to="/catalog">
              <Button variant="ghost" className="gap-2">
                Смотреть все
                <Icon name="ArrowRight" size={18} />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredNFTs.map((nft) => (
              <Card key={nft.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
                <div className="aspect-square overflow-hidden relative">
                  {nft.trending && (
                    <Badge className="absolute top-3 left-3 z-10 gap-1">
                      <Icon name="TrendingUp" size={14} />
                      В тренде
                    </Badge>
                  )}
                  <img 
                    src={nft.image} 
                    alt={nft.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-heading font-semibold text-lg mb-2">{nft.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4 flex items-center gap-1">
                    <Icon name="User" size={14} />
                    {nft.creator}
                  </p>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-muted-foreground">Цена</p>
                      <p className="font-heading font-bold text-primary">{nft.price} ₽</p>
                    </div>
                    <Button size="sm">
                      <Icon name="ShoppingCart" size={16} className="mr-1" />
                      Купить
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              Как это работает
            </h2>
            <p className="text-muted-foreground text-lg">
              Три простых шага до вашего первого NFT
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Icon name="Wallet" size={32} className="text-primary" />
              </div>
              <h3 className="font-heading font-bold text-xl mb-2">1. Пополните баланс</h3>
              <p className="text-muted-foreground">
                Купите энефтиксы — внутреннюю валюту маркетплейса. 1 💎 = 10 ₽
              </p>
            </Card>

            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Icon name="Sparkles" size={32} className="text-primary" />
              </div>
              <h3 className="font-heading font-bold text-xl mb-2">2. Создайте NFT</h3>
              <p className="text-muted-foreground">
                Загрузите изображение и создайте уникальный NFT за 150 💎
              </p>
            </Card>

            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Icon name="TrendingUp" size={32} className="text-primary" />
              </div>
              <h3 className="font-heading font-bold text-xl mb-2">3. Торгуйте</h3>
              <p className="text-muted-foreground">
                Продавайте свои NFT или покупайте работы других авторов
              </p>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-primary to-secondary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
            Готовы начать?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Присоединяйтесь к сообществу создателей и коллекционеров NFT
          </p>
          <Link to="/create">
            <Button size="lg" variant="secondary" className="gap-2 text-lg px-8">
              <Icon name="Rocket" size={20} />
              Создать первый NFT
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Index;
