import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";

const favoriteNFTs = [
  {
    id: 1,
    title: "Cosmic Dreams",
    creator: "ArtistOne",
    price: 250,
    image: "https://cdn.poehali.dev/projects/64ba5f44-4177-4cb8-b85d-f74f7b34a55c/files/fd1c0fb7-78e1-47c1-9629-be5d2dd928a0.jpg",
  },
  {
    id: 2,
    title: "Neon Geometry",
    creator: "CryptoCreator",
    price: 180,
    image: "https://cdn.poehali.dev/projects/64ba5f44-4177-4cb8-b85d-f74f7b34a55c/files/2a41396e-2fe3-4036-849d-9acec1c08119.jpg",
  },
  {
    id: 3,
    title: "Cyber Portrait",
    creator: "DigitalMaster",
    price: 320,
    image: "https://cdn.poehali.dev/projects/64ba5f44-4177-4cb8-b85d-f74f7b34a55c/files/bc4a00ee-71b1-4ab2-ae42-8cfc956bbb23.jpg",
  }
];

const Favorites = () => {
  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-heading font-bold mb-4 flex items-center gap-3">
            <Icon name="Heart" size={36} className="text-primary" />
            Избранное
          </h1>
          <p className="text-muted-foreground">NFT, которые вам понравились</p>
        </div>

        {favoriteNFTs.length === 0 ? (
          <Card className="p-12 text-center">
            <Icon name="Heart" size={48} className="mx-auto text-muted-foreground mb-4" />
            <h3 className="font-heading font-semibold text-xl mb-2">Пока пусто</h3>
            <p className="text-muted-foreground mb-4">Добавьте NFT в избранное, чтобы они появились здесь</p>
            <Button>Перейти в каталог</Button>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favoriteNFTs.map((nft) => (
              <Card key={nft.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="aspect-square overflow-hidden relative group">
                  <img 
                    src={nft.image} 
                    alt={nft.title}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                  <Button 
                    size="icon" 
                    variant="secondary"
                    className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Icon name="HeartOff" size={20} />
                  </Button>
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-heading font-semibold text-lg">{nft.title}</h3>
                    <Badge variant="secondary">
                      <Icon name="Heart" size={12} className="mr-1" />
                    </Badge>
                  </div>
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
        )}
      </div>
    </div>
  );
};

export default Favorites;
