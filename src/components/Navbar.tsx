import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NavbarProps {
  cartCount: number;
  onCartClick: () => void;
}

const Navbar = ({ cartCount, onCartClick }: NavbarProps) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-secondary text-secondary-foreground shadow-lg">
      <div className="container mx-auto px-5 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <img
            src="/src/assets/logo.png" // Replace with your logo file path
            alt="Renee Logo"
            className="max-h-12 w-auto" // Adjust max height to fit navbar, width scales naturally
          />
        </div>
        
        <Button
          variant="ghost"
          size="lg"
          onClick={onCartClick}
          className="relative hover:bg-secondary-foreground/10 transition-colors"
        >
          <ShoppingCart className="h-6 w-6" />
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