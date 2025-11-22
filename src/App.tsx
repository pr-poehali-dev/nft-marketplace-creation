
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Index from "./pages/Index";
import Catalog from "./pages/Catalog";
import TopSales from "./pages/TopSales";
import Profile from "./pages/Profile";
import Favorites from "./pages/Favorites";
import CreateNFT from "./pages/CreateNFT";
import Wallet from "./pages/Wallet";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/top-sales" element={<TopSales />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/create" element={<CreateNFT />} />
          <Route path="/wallet" element={<Wallet />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;