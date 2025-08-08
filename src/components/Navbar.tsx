import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import reneeLogo from "@/assets/logo.png";

interface NavbarProps {
  cartCount: number;
  onCartClick: () => void;
}

const Navbar = ({ cartCount, onCartClick }: NavbarProps) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-primary text-white shadow-lg">
      <div className="container mx-auto px-5 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <img
            src={reneeLogo}
            alt="Renee Logo"
            className="max-h-12 w-auto"
          />
        </div>
        
        <Button
          variant="ghost"
          size="lg"
          onClick={onCartClick}
          className="relative hover:bg-white/10 transition-colors"
        >
          <ShoppingCart className="h-6 w-6 text-white" />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-cart-badge text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </Button>
      </div>
    </nav>
  );
};


export default Navbar;