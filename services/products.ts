import { products } from "@/data/products";
// Capa de acceso a datos: reemplazá el cuerpo por consultas a tu base de datos.
export const getProducts = () => products;
export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
export const getProductById = (id: string) => products.find((p) => p.id === id);
export const getRelated = (slug: string) => {
  const p = getProduct(slug);
  return products.filter((x) => x.category === p?.category && x.slug !== slug).slice(0, 4);
};
