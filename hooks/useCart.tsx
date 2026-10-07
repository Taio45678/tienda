"use client";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";
export type Line = { key: string; id: string; qty: number; size?: string; color?: string };
type Ctx = { lines: Line[]; ready: boolean; count: number; add: (id: string, qty?: number, size?: string, color?: string) => void; setQty: (key: string, qty: number) => void; remove: (key: string) => void; clear: () => void };
const C = createContext<Ctx | null>(null);
export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<Line[]>([]);
  const [ready, setReady] = useState(false);
  useEffect(() => { try { setLines(JSON.parse(localStorage.getItem("cart") || "[]")); } catch {} setReady(true); }, []);
  useEffect(() => { if (ready) localStorage.setItem("cart", JSON.stringify(lines)); }, [lines, ready]);
  const add: Ctx["add"] = (id, qty = 1, size, color) => {
    const key = [id, size, color].join("|");
    setLines((l) => (l.some((x) => x.key === key) ? l.map((x) => (x.key === key ? { ...x, qty: x.qty + qty } : x)) : [...l, { key, id, qty, size, color }]));
  };
  const setQty: Ctx["setQty"] = (key, qty) => setLines((l) => (qty < 1 ? l.filter((x) => x.key !== key) : l.map((x) => (x.key === key ? { ...x, qty } : x))));
  const remove: Ctx["remove"] = (key) => setLines((l) => l.filter((x) => x.key !== key));
  const count = lines.reduce((a, l) => a + l.qty, 0);
  return <C.Provider value={{ lines, ready, count, add, setQty, remove, clear: () => setLines([]) }}>{children}</C.Provider>;
}
export const useCart = () => useContext(C)!;
