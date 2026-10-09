
import type { Category, Product } from "@/types";

const BASE_URL =
  "https://api.api-store.workers.dev/api/bazardor";

async function fetchApi<T>(path: string): Promise<T> {
  const response = await fetch(`${BASE_URL}${path}`, {
  next: { revalidate: 300 },
});

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  return (await response.json()) as T;
}

export async function getProducts(): Promise<Product[]> {
  return fetchApi<Product[]>("/products");
}

export async function getCategories(): Promise<Category[]> {
  return fetchApi<Category[]>("/categories");
}

export async function getProductById(
  id: number | string,
): Promise<Product> {
  return fetchApi<Product>(`/products/${id}`);
}

export async function getProductsByCategory(
  category: string,
): Promise<Product[]> {
  return fetchApi<Product[]>(
    `/products?category=${encodeURIComponent(category)}`,
  );
}
