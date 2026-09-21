import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type CartItem = {
  key: string;
  slug: string;
  name: string;
  sku: string;
  variant: string;
  quantity: number;
  unitPrice: number;
  image: string;
};

type StoreContextValue = {
  cart: CartItem[];
  cartCount: number;
  cartTotal: number;
  addToCart: (item: Omit<CartItem, "key">) => void;
  updateQuantity: (key: string, quantity: number) => void;
  removeFromCart: (key: string) => void;
  clearCart: () => void;
};

const StoreContext = createContext<StoreContextValue | null>(null);

function readCart(): CartItem[] {
  try {
    const raw = localStorage.getItem("flash-cart");
    return raw ? JSON.parse(raw) as CartItem[] : [];
  } catch {
    return [];
  }
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(readCart);

  useEffect(() => {
    localStorage.setItem("flash-cart", JSON.stringify(cart));
  }, [cart]);

  const value = useMemo<StoreContextValue>(() => ({
    cart,
    cartCount: cart.reduce((sum, item) => sum + item.quantity, 0),
    cartTotal: cart.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0),
    addToCart: (item) => {
      setCart(current => {
        const key = `${item.slug}:${item.sku}`;
        const found = current.find(entry => entry.key === key);
        if (found) {
          return current.map(entry => entry.key === key ? { ...entry, quantity: entry.quantity + item.quantity } : entry);
        }
        return [...current, { ...item, key }];
      });
    },
    updateQuantity: (key, quantity) => {
      if (quantity <= 0) {
        setCart(current => current.filter(item => item.key !== key));
      } else {
        setCart(current => current.map(item => item.key === key ? { ...item, quantity } : item));
      }
    },
    removeFromCart: (key) => setCart(current => current.filter(item => item.key !== key)),
    clearCart: () => setCart([]),
  }), [cart]);

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) throw new Error("useStore must be used inside StoreProvider");
  return context;
}
