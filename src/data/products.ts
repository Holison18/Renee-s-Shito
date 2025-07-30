import { Product } from "@/components/ProductCard";
import product1 from "@/assets/shito-product-1.png";
import product2 from "@/assets/shito-product-2.png";
import product3 from "@/assets/shito-product-3.png";
import product4 from "@/assets/shito-product-4.png";
import product5 from "@/assets/shito-product-7.png";
import product6 from "@/assets/shito-product-6.png";

export const products: Product[] = [
  {
    id: "1",
    name: "Renee's Shito (Big Size)",
    price: 25.00,
    description: "Shrimp and fish powder, onion, pepper, ginger, garlic.",
    image: product1
  },
  {
    id: "2",
    name: "Renee's Shito (Medium Size)",
    price: 15.00,
    description: "Shrimp and fish powder, onion, pepper, ginger, garlic.",
    image: product2
  },
  {
    id: "3",
    name: "Renee's Shito (Small Size)",
    price: 12.00,
    description: "Shrimp and fish powder, onion, pepper, ginger, garlic.",
    image: product3
  },
  {
    id: "4",
    name: "Renee's Shito (Biggest Size)",
    price: 30.00,
    description: "Shrimp and fish powder, onion, pepper, ginger, garlic.",
    image: product4
  },
  {
    id: "5",
    name: "Renee's Shito (Sachet)",
    price: 1.00,
    description: "Shrimp and fish powder, onion, pepper, ginger, garlic.",
    image: product5
  },
  {
    id: "6",
    name: "Renee's Shito (Sachet)",
    price: 2.00,
    description: "Shrimp and fish powder, onion, pepper, ginger, garlic.",
    image: product6
  }
];