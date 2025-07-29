import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
}

interface ProductCardProps {
  product: Product;
  onQuantityChange: (productId: string, quantity: number) => void;
  currentQuantity: number;
}

const ProductCard = ({ product, onQuantityChange, currentQuantity }: ProductCardProps) => {
  const updateQuantity = (newQuantity: number) => {
    const validQuantity = Math.max(0, newQuantity);
    onQuantityChange(product.id, validQuantity);
  };

  return (
    <Card className="overflow-hidden border-accent hover:shadow-lg transition-all duration-300 bg-card">
      <CardContent className="p-0">
        <div className="aspect-square overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
        
        <div className="p-4 space-y-3">
          <div className="text-2xl font-bold text-primary">
            ${product.price.toFixed(2)}
          </div>
          
          <h3 className="font-semibold text-foreground text-lg">
            {product.name}
          </h3>
          
          <p className="text-muted-foreground text-sm">
            {product.description}
          </p>
          
          <div className="flex items-center justify-center space-x-3 pt-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => updateQuantity(currentQuantity - 1)}
              className="h-8 w-8 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            >
              <Minus className="h-4 w-4" />
            </Button>
            
            <span className="text-lg font-semibold min-w-[2rem] text-center">
              {currentQuantity}
            </span>
            
            <Button
              variant="outline"
              size="icon"
              onClick={() => updateQuantity(currentQuantity + 1)}
              className="h-8 w-8 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;