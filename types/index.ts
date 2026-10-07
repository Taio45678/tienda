export type Product = {
  id: string; slug: string; name: string; description: string;
  price: number; oldPrice?: number; images: string[]; category: string;
  stock: number; sku: string; brand: string; tags: string[];
  sizes?: string[]; colors?: string[]; features: string[];
  featured?: boolean; isNew?: boolean;
};
export type OrderStatus = "pendiente" | "pagado" | "enviado" | "entregado" | "cancelado";
export type Order = {
  id: string; createdAt: string; status: OrderStatus; customer: Record<string, string>;
  shipping: { method: string; zone?: string; cost: number }; payment: string;
  items: { id: string; name: string; price: number; qty: number; size?: string; color?: string }[];
  subtotal: number; total: number;
};
