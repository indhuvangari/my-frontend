import { products as rawProducts } from "../data/products";
 
/**
 * (Optional) normalization layer.
 * Right now your data is already normalized, so this just ensures types and fallbacks.
 */
const normalizeProduct = (raw) => ({
  id: String(raw.id),                               // normalize id to string for routing
  name: raw.name ?? "",                             // safe fallback
  category: raw.category ?? "all",
  price: Number(raw.price ?? 0),
  rating: Number(raw.rating ?? 0),
  inStock: Boolean(raw.inStock ?? true),
  imageUrl: raw.imageUrl ?? "",                     // main image
  description: raw.description ?? "",
  tags: Array.isArray(raw.tags) ? raw.tags : [],
  // Optional extras (uncomment if you add them in data):
  // brand: raw.brand ?? "",
  // discountPercent: raw.discountPercent ?? null,
  // images: Array.isArray(raw.images) ? raw.images : (raw.imageUrl ? [raw.imageUrl] : []),
});
 
/** Return all products (normalized) */
export async function fetchProducts() {
  // Optional latency simulation:
  // await new Promise((r) => setTimeout(r, 200));
  return rawProducts.map(normalizeProduct);
}
 
/** Return one product by id (robust for string/number ids) */
export async function fetchProductById(id) {
  const list = await fetchProducts();
  const idStr = String(id);
  return list.find((p) => p.id === idStr) ?? null;
}
 
/** Helper: get related products by category (excluding the current id) */
export async function fetchRelatedProducts(category, excludeId, limit = 8) {
  const list = await fetchProducts();
  return list
    .filter((p) => p.category === category && p.id !== String(excludeId))
    .slice(0, limit);
}
 