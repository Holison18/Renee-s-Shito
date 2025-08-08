import { Product } from "@/components/ProductCard";
import product1 from "@/assets/shito-product-21.jpg";
import product2 from "@/assets/shito-product-31.jpg";
import product3 from "@/assets/shito-product-51.jpg";
import product4 from "@/assets/shito-product-11.jpg";
import product5 from "@/assets/shito-product-61.jpg";
import product6 from "@/assets/shito-product-71.jpg";

export const products: Product[] = [
  {
    id: "1",
    name: "Renee's Shito (1000mL)",
    price: 30.00,
    description: "Shrimp and fish powder, onion, pepper, ginger, garlic.",
    image: product4
  },
  {
    id: "2",
    name: "Renee's Shito (750mL)",
    price: 25.00,
    description: "Shrimp and fish powder, onion, pepper, ginger, garlic.",
    image: product1
  },
  {
    id: "3",
    name: "Renee's Shito (500mL)",
    price: 15.00,
    description: "Shrimp and fish powder, onion, pepper, ginger, garlic.",
    image: product2
  },
  {
    id: "4",
    name: "Renee's Shito (350mL)",
    price: 12.00,
    description: "Shrimp and fish powder, onion, pepper, ginger, garlic.",
    image: product3
  },
  {
    id: "5",
    name: "Renee's Shito Sachect Small (60g)",
    price: 1.00,
    description: "Shrimp and fish powder, onion, pepper, ginger, garlic.",
    image: product5
  },
  {
    id: "6",
    name: "Renee's Shito Sachect Large (100g)",
    price: 2.00,
    description: "Shrimp and fish powder, onion, pepper, ginger, garlic.",
    image: product6
  }
];