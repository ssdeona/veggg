import { SimpleGrid } from "@mantine/core";

import ProductCard from "../ProductCard/ProductCard";

import type { Product } from "../../types/product";

interface ProductGridProps {
  products: Product[];
  onAddToCart: (product: Product, count: number) => void;
}

export default function ProductGrid({
  products,
  onAddToCart,
}: ProductGridProps) {
  return (
    <SimpleGrid
      cols={{
        base: 1,
        sm: 2,
        md: 3,
        lg: 4,
      }}
      spacing="lg"
    >
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={onAddToCart}
        />
      ))}
    </SimpleGrid>
  );
}