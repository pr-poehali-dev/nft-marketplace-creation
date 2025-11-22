import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Icon from "@/components/ui/icon";

const Profile = () => {
  const userBalance = 500;
  const rubleEquivalent = userBalance * 10;

  const myNFTs = [
    {
      id: 1,
      title: "My Digital Art",
      image: "https://cdn.poehali.dev/projects/64ba5f44-4177-4cb8-b85d-f74f7b34a55c/files/fd1c0fb7-78e1-47c1-9629-be5d2dd928a0.jpg",
      price: 200
    },
    {
      id: 2,
      title: "Abstract Creation",
      image: "https://cdn.poehali.dev/projects/64ba5f44-4177-4cb8-b85d-f74f7b34a55c/files/2a41396e-2fe3-4036-849d-9acec1c08119.jpg",
      price: 150
    }
  ];

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        <Card className="mb-8 overflow-hidden">
          <div className="h-32 bg-gradient-to-r from-primary to-secondary" />
          <div className="px-6 pb-6">
            <div className="flex items-end gap-4 -mt-16 mb-4">
              <Avatar className="h-32 w-32 border-4 border-background">
                <AvatarFallback className="text-4xl font-heading bg-primary text-primary-foreground">
                  U
                </AvatarFallback>
              </Avatar>
              <div className="mb-4">
                <h1 className="text-3xl font-heading font-bold">Пользователь</h1>
                <p className="text-muted-foreground">@user123</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <Link to="/wallet">
                <Card className="p-4 bg-primary/5 border-primary/20 hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <Icon name="Wallet" size={24} className="text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Баланс</p>
                      <p className="text-2xl font-heading font-bold">{userBalance} 💎</p>
                      <p className="text-xs text-muted-foreground">{rubleEquivalent} ₽</p>
                    </div>
                  </div>
                </Card>
              </Link>

              <Card className="p-4 border-muted">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-muted rounded-lg">
                    <Icon name="Image" size={24} className="text-foreground" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Мои NFT</p>
                    <p className="text-2xl font-heading font-bold">{myNFTs.length}</p>
                  </div>
                </div>
              </Card>

              <Card className="p-4 border-muted">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-muted rounded-lg">
                    <Icon name="Heart" size={24} className="text-foreground" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Избранное</p>
                    <p className="text-2xl font-heading font-bold">3</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </Card>

        <Tabs defaultValue="nfts" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="nfts">Мои NFT</TabsTrigger>
            <TabsTrigger value="activity">Активность</TabsTrigger>
          </TabsList>

          <TabsContent value="nfts" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {myNFTs.map((nft) => (
                <Card key={nft.id} className="overflow-hidden hover:shadow-xl transition-all duration-300">
                  <div className="aspect-square overflow-hidden">
                    <img 
                      src={nft.image} 
                      alt={nft.title}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-heading font-semibold mb-2">{nft.title}</h3>
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-muted-foreground">{nft.price} ₽</p>
                      <Button size="sm" variant="outline">
                        Продать
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="activity" className="mt-6">
            <Card className="p-6">
              <p className="text-center text-muted-foreground">История активности пуста</p>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;