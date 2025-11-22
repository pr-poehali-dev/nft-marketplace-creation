import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

const Navigation = () => {
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Главная", icon: "Home" },
    { path: "/catalog", label: "Каталог", icon: "Grid3x3" },
    { path: "/top-sales", label: "Топ-продажи", icon: "TrendingUp" },
    { path: "/favorites", label: "Избранное", icon: "Heart" },
    { path: "/wallet", label: "Кошелек", icon: "Wallet" },
    { path: "/profile", label: "Профиль", icon: "User" },
  ];

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-2xl">💎</span>
            </div>
            <span className="font-heading font-bold text-xl">NFT Market</span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link key={item.path} to={item.path}>
                <Button 
                  variant={location.pathname === item.path ? "default" : "ghost"}
                  className="gap-2"
                >
                  <Icon name={item.icon as any} size={18} />
                  {item.label}
                </Button>
              </Link>
            ))}
          </div>

          <Link to="/create">
            <Button className="gap-2">
              <Icon name="Plus" size={18} />
              <span className="hidden sm:inline">Создать NFT</span>
            </Button>
          </Link>
        </div>

        <div className="md:hidden flex gap-1 overflow-x-auto pb-2 -mx-2 px-2">
          {navItems.map((item) => (
            <Link key={item.path} to={item.path}>
              <Button 
                variant={location.pathname === item.path ? "default" : "ghost"}
                size="sm"
                className="gap-2 whitespace-nowrap"
              >
                <Icon name={item.icon as any} size={16} />
                {item.label}
              </Button>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;