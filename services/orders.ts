import type { Order, OrderStatus } from "@/types";
// Persistencia TEMPORAL en el navegador. Reemplazar por API + base de datos.
const K = "orders";
export const listOrders = (): Order[] => { try { return JSON.parse(localStorage.getItem(K) || "[]"); } catch { return []; } };
const save = (o: Order[]) => localStorage.setItem(K, JSON.stringify(o));
export function createOrder(o: Omit<Order, "id" | "createdAt" | "status">): Order {
  const order: Order = { ...o, id: Date.now().toString(36).toUpperCase(), createdAt: new Date().toISOString(), status: "pendiente" };
  save([order, ...listOrders()]);
  return order;
}
export const getOrder = (id: string) => listOrders().find((o) => o.id === id);
export const setStatus = (id: string, s: OrderStatus) => save(listOrders().map((o) => (o.id === id ? { ...o, status: s } : o)));
