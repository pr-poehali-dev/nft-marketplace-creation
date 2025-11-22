import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";

interface NFT {
  id: number;
  title: string;
  creator: string;
  price: number;
  image: string;
  category: string;
}

const mockNFTs: NFT[] = [
  {
    id: 1,
    title: "Cosmic Dreams",
    creator: "ArtistOne",
    price: 250,
    image: "https://cdn.poehali.dev/projects/64ba5f44-4177-4cb8-b85d-f74f7b34a55c/files/fd1c0fb7-78e1-47c1-9629-be5d2dd928a0.jpg",
    category: "Digital Art"
  },
  {
    id: 2,
    title: "Neon Geometry",
    creator: "CryptoCreator",
    price: 180,
    image: "https://cdn.poehali.dev/projects/64ba5f44-4177-4cb8-b85d-f74f7b34a55c/files/2a41396e-2fe3-4036-849d-9acec1c08119.jpg",
    category: "Abstract"
  },
  {
    id: 3,
    title: "Cyber Portrait",
    creator: "DigitalMaster",
    price: 320,
    image: "https://cdn.poehali.dev/projects/64ba5f44-4177-4cb8-b85d-f74f7b34a55c/files/bc4a00ee-71b1-4ab2-ae42-8cfc956bbb23.jpg",
    category: "Character"
  },
  {
    id: 4,
    title: "Abstract Flow",
    creator: "ArtistOne",
    price: 200,
    image: "https://cdn.poehali.dev/projects/64ba5f44-4177-4cb8-b85d-f74f7b34a55c/files/fd1c0fb7-78e1-47c1-9629-be5d2dd928a0.jpg",
    category: "Abstract"
  },
  {
    id: 5,
    title: "Digital Waves",
    creator: "CryptoCreator",
    price: 150,
    image: "https://cdn.poehali.dev/projects/64ba5f44-4177-4cb8-b85d-f74f7b34a55c/files/2a41396e-2fe3-4036-849d-9acec1c08119.jpg",
    category: "Digital Art"
  },
  {
    id: 6,
    title: "Future Vision",
    creator: "DigitalMaster",
    price: 280,
    image: "https://cdn.poehali.dev/projects/64ba5f44-4177-4cb8-b85d-f74f7b34a55c/files/bc4a00ee-71b1-4ab2-ae42-8cfc956bbb23.jpg",
    category: "Character"
  }
];

const Catalog = () => {
  const [filter, setFilter] = useState("all");

  const categories = ["all", "Digital Art", "Abstract", "Character"];

  const filteredNFTs = filter === "all" 
    ? mockNFTs 
    : mockNFTs.filter(nft => nft.category === filter);

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-heading font-bold mb-4">Каталог NFT</h1>
          <p className="text-muted-foreground">Исследуйте уникальные цифровые активы</p>
        </div>

        <div className="flex gap-2 mb-8 flex-wrap">
          {categories.map((category) => (
            <Button
              key={category}
              variant={filter === category ? "default" : "outline"}
              onClick={() => setFilter(category)}
              className="capitalize"
            >
              {category === "all" ? "Все" : category}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNFTs.map((nft) => (
            <Card key={nft.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="aspect-square overflow-hidden">
                <img 
                  src={nft.image} 
                  alt={nft.title}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-heading font-semibold text-lg">{nft.title}</h3>
                  <Badge variant="secondary">{nft.category}</Badge>
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
      </div>
    </div>
  );
};

export default Catalog;
