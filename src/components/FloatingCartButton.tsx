import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FloatingCartButtonProps {
  cartCount: number;
  onClick: () => void;
}

const FloatingCartButton = ({ cartCount, onClick }: FloatingCartButtonProps) => {
  if (cartCount === 0) return null;

  return (
    <Button
      onClick={onClick}
      className="fixed bottom-5 right-5 z-40 h-14 w-14 rounded-full bg-secondary hover:bg-secondary/90 text-secondary-foreground shadow-lg hover:shadow-xl transition-all duration-300"
      size="icon"
    >
      <ShoppingCart className="h-6 w-6" />
      <span className="absolute -top-2 -right-2 bg-cart-badge text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
        {cartCount}
      </span>
    </Button>
  );
};

export default FloatingCartButton;