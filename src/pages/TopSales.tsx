import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

const topNFTs = [
  {
    id: 1,
    title: "Cosmic Dreams",
    creator: "ArtistOne",
    price: 250,
    sales: 45,
    image: "https://cdn.poehali.dev/projects/64ba5f44-4177-4cb8-b85d-f74f7b34a55c/files/fd1c0fb7-78e1-47c1-9629-be5d2dd928a0.jpg",
  },
  {
    id: 2,
    title: "Cyber Portrait",
    creator: "DigitalMaster",
    price: 320,
    sales: 38,
    image: "https://cdn.poehali.dev/projects/64ba5f44-4177-4cb8-b85d-f74f7b34a55c/files/bc4a00ee-71b1-4ab2-ae42-8cfc956bbb23.jpg",
  },
  {
    id: 3,
    title: "Neon Geometry",
    creator: "CryptoCreator",
    price: 180,
    sales: 32,
    image: "https://cdn.poehali.dev/projects/64ba5f44-4177-4cb8-b85d-f74f7b34a55c/files/2a41396e-2fe3-4036-849d-9acec1c08119.jpg",
  }
];

const TopSales = () => {
  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-heading font-bold mb-4">Топ-продажи</h1>
          <p className="text-muted-foreground">Самые популярные NFT на маркетплейсе</p>
        </div>

        <div className="space-y-4">
          {topNFTs.map((nft, index) => (
            <Card key={nft.id} className="overflow-hidden hover:shadow-xl transition-all duration-300">
              <div className="flex flex-col md:flex-row gap-6 p-6">
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0">
                    <Badge className="h-12 w-12 rounded-full flex items-center justify-center text-xl font-heading font-bold">
                      {index + 1}
                    </Badge>
                  </div>
                  <div className="w-32 h-32 rounded-lg overflow-hidden flex-shrink-0">
                    <img 
                      src={nft.image} 
                      alt={nft.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-heading font-bold text-2xl mb-2">{nft.title}</h3>
                    <p className="text-muted-foreground flex items-center gap-1">
                      <Icon name="User" size={16} />
                      {nft.creator}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-8 mt-4">
                    <div>
                      <p className="text-xs text-muted-foreground">Продажи</p>
                      <p className="font-heading font-bold text-lg flex items-center gap-1">
                        <Icon name="TrendingUp" size={18} className="text-primary" />
                        {nft.sales}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Цена</p>
                      <p className="font-heading font-bold text-lg text-primary">{nft.price} ₽</p>
                    </div>
                    <Button className="ml-auto">
                      <Icon name="ShoppingCart" size={16} className="mr-2" />
                      Купить
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopSales;
