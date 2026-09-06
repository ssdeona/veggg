import type { Product } from "../types/product";

const API =
  "https://res.cloudinary.com/sivadass/raw/upload/v1535817394/json/products.json";

export async function getProducts(): Promise<Product[]> {
  const response = await fetch(API);

  if (!response.ok) {
    throw new Error("Не удалось загрузить товары");
  }

  return response.json();
}