import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Banner from "@/components/Banner";
import ProductCard from "@/components/ProductCard";
import FloatingCartButton from "@/components/FloatingCartButton";
import CheckoutModal, { CartItem } from "@/components/CheckoutModal";
import { products } from "@/data/products";

const Index = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const getTotalCartCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const handleQuantityChange = (productId: string, quantity: number) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.product.id === productId);
      
      if (quantity === 0) {
        return prev.filter(item => item.product.id !== productId);
      }
      
      if (existingItem) {
        return prev.map(item =>
          item.product.id === productId ? { ...item, quantity } : item
        );
      } else {
        const product = products.find(p => p.id === productId);
        if (product) {
          return [...prev, { product, quantity }];
        }
      }
      
      return prev;
    });
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems(prev => prev.filter(item => item.product.id !== productId));
  };

  const getProductQuantity = (productId: string) => {
    const item = cartItems.find(item => item.product.id === productId);
    return item ? item.quantity : 0;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      <Navbar 
        cartCount={getTotalCartCount()} 
        onCartClick={() => setIsCheckoutOpen(true)} 
      />
      
      <main className="pt-20">
        {/* Banner Section */}
        <section className="px-5 py-6">
          <Banner />
        </section>

        {/* Products Section */}
        <section className="px-5 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-red-900 mb-4">
             Kobby's Special Shito
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Authentic Ghanaian spicy sauce made with love and traditional recipes. 
              Experience the perfect blend of heat and flavor in every jar.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuantityChange={handleQuantityChange}
                currentQuantity={getProductQuantity(product.id)}
              />
            ))}
          </div>
        </section>
      </main>

      <FloatingCartButton 
        cartCount={getTotalCartCount()}
        onClick={() => setIsCheckoutOpen(true)}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleQuantityChange}
        onRemoveItem={handleRemoveItem}
      />
    </div>
  );
};

export default Index;
