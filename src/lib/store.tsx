import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { getProduct } from './products';

export type CartLine = { slug: string; size: string; qty: number };

type CartCtx = {
  lines: CartLine[];
  count: number;
  subtotal: number;
  drawerOpen: boolean;
  setDrawerOpen: (v: boolean) => void;
  add: (slug: string, size: string, qty?: number) => void;
  remove: (slug: string, size: string) => void;
  setQty: (slug: string, size: string, qty: number) => void;
  clear: () => void;
};

const Ctx = createContext<CartCtx | null>(null);
const KEY = 'zahyr-cart-v1';

function load(): CartLine[] {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((l) => l && typeof l.slug === 'string' && typeof l.size === 'string');
  } catch { return []; }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => { setLines(load()); setHydrated(true); }, []);
  useEffect(() => { if (hydrated) localStorage.setItem(KEY, JSON.stringify(lines)); }, [lines, hydrated]);

  const { count, subtotal } = useMemo(() => {
    let c = 0; let s = 0;
    for (const l of lines) {
      const p = getProduct(l.slug);
      c += l.qty;
      if (p) s += p.price * l.qty;
    }
    return { count: c, subtotal: s };
  }, [lines]);

  const add = (slug: string, size: string, qty = 1) => {
    setLines((prev) => {
      const i = prev.findIndex((l) => l.slug === slug && l.size === size);
      if (i >= 0) {
        const next = [...prev];
        next[i] = { ...next[i], qty: Math.min(9, next[i].qty + qty) };
        return next;
      }
      return [...prev, { slug, size, qty }];
    });
    setDrawerOpen(true);
  };
  const remove = (slug: string, size: string) =>
    setLines((prev) => prev.filter((l) => !(l.slug === slug && l.size === size)));
  const setQty = (slug: string, size: string, qty: number) => {
    if (qty <= 0) return remove(slug, size);
    setLines((prev) => prev.map((l) => (l.slug === slug && l.size === size ? { ...l, qty: Math.min(9, qty) } : l)));
  };
  const clear = () => setLines([]);

  const value = useMemo(() => ({ lines, count, subtotal, drawerOpen, setDrawerOpen, add, remove, setQty, clear }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [lines, count, subtotal, drawerOpen]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart() {
  const v = useContext(Ctx);
  if (!v) throw new Error('useCart outside provider');
  return v;
}
