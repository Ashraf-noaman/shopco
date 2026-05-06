"use client";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { translations, Lang, Translations } from "@/data/translations";

type Theme = "light" | "dark";

export interface AuthUser {
  name: string;
  email: string;
}

export interface CartItem {
  id: number;
  name: string;
  price: number;
  originalPrice: number | null;
  discount: number | null;
  emoji: string;
  color: string;
  size: string;
  selectedColor: string;
  quantity: number;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  total: number;
  status: "Processing" | "Shipped" | "Delivered";
}

interface AppContextValue {
  lang: Lang;
  theme: Theme;
  t: Translations;
  toggleLang: () => void;
  toggleTheme: () => void;
  user: AuthUser | null;
  login: (user: AuthUser) => void;
  logout: () => void;
  cartItems: CartItem[];
  addToCart: (item: Omit<CartItem, "quantity"> & { quantity?: number }) => void;
  removeFromCart: (id: number, size: string, selectedColor: string) => void;
  updateQuantity: (id: number, size: string, selectedColor: string, delta: number) => void;
  clearCart: () => void;
  cartCount: number;
  orders: Order[];
  placeOrder: () => void;
  removeOrder: (id: string) => void;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");
  const [theme, setTheme] = useState<Theme>("dark");
  const [user, setUser] = useState<AuthUser | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const savedLang = localStorage.getItem("shopco_lang") as Lang | null;
    const savedTheme = localStorage.getItem("shopco_theme") as Theme | null;
    const savedUser = localStorage.getItem("shopco_user");
    const savedCart = localStorage.getItem("shopco_cart");
    const savedOrders = localStorage.getItem("shopco_orders");
    if (savedLang === "en" || savedLang === "ar") setLang(savedLang);
    if (savedTheme === "light" || savedTheme === "dark") setTheme(savedTheme);
    if (savedUser) { try { setUser(JSON.parse(savedUser)); } catch { /* ignore */ } }
    if (savedCart) { try { setCartItems(JSON.parse(savedCart)); } catch { /* ignore */ } }
    if (savedOrders) { try { setOrders(JSON.parse(savedOrders)); } catch { /* ignore */ } }
  }, []);

  useEffect(() => {
    const html = document.documentElement;
    html.dir = translations[lang].dir;
    html.lang = lang;
    if (theme === "dark") { html.classList.add("dark"); } else { html.classList.remove("dark"); }
  }, [lang, theme]);

  useEffect(() => {
    if (lang === "ar") {
      const id = "cairo-font";
      if (!document.getElementById(id)) {
        const link = document.createElement("link");
        link.id = id; link.rel = "stylesheet";
        link.href = "https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;900&display=swap";
        document.head.appendChild(link);
      }
      document.body.style.fontFamily = "'Cairo', sans-serif";
    } else {
      document.body.style.fontFamily = "";
    }
  }, [lang]);

  const toggleLang = () => setLang((l) => { const next = l === "en" ? "ar" : "en"; localStorage.setItem("shopco_lang", next); return next; });
  const toggleTheme = () => setTheme((t) => { const next = t === "light" ? "dark" : "light"; localStorage.setItem("shopco_theme", next); return next; });
  const login = (u: AuthUser) => { setUser(u); localStorage.setItem("shopco_user", JSON.stringify(u)); };
  const logout = () => { setUser(null); localStorage.removeItem("shopco_user"); };

  const addToCart = (item: Omit<CartItem, "quantity"> & { quantity?: number }) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === item.id && i.size === item.size && i.selectedColor === item.selectedColor);
      let next: CartItem[];
      if (existing) {
        next = prev.map((i) => i.id === item.id && i.size === item.size && i.selectedColor === item.selectedColor ? { ...i, quantity: i.quantity + (item.quantity ?? 1) } : i);
      } else {
        next = [...prev, { ...item, quantity: item.quantity ?? 1 }];
      }
      localStorage.setItem("shopco_cart", JSON.stringify(next));
      return next;
    });
  };

  const removeFromCart = (id: number, size: string, selectedColor: string) => {
    setCartItems((prev) => { const next = prev.filter((i) => !(i.id === id && i.size === size && i.selectedColor === selectedColor)); localStorage.setItem("shopco_cart", JSON.stringify(next)); return next; });
  };

  const updateQuantity = (id: number, size: string, selectedColor: string, delta: number) => {
    setCartItems((prev) => {
      const next = prev.map((i) => i.id === id && i.size === size && i.selectedColor === selectedColor ? { ...i, quantity: Math.max(1, i.quantity + delta) } : i);
      localStorage.setItem("shopco_cart", JSON.stringify(next));
      return next;
    });
  };

  const clearCart = () => { setCartItems([]); localStorage.removeItem("shopco_cart"); };

  const placeOrder = () => {
    if (cartItems.length === 0) return;
    const subtotal = cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0);
    const newOrder: Order = {
      id: `ORD-${Date.now()}`,
      date: new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
      items: [...cartItems],
      total: subtotal,
      status: "Processing",
    };
    setOrders((prev) => { const next = [newOrder, ...prev]; localStorage.setItem("shopco_orders", JSON.stringify(next)); return next; });
    clearCart();
  };

  const removeOrder = (id: string) => {
    setOrders((prev) => {
      const next = prev.filter((o) => o.id !== id);
      localStorage.setItem("shopco_orders", JSON.stringify(next));
      return next;
    });
  };

  const cartCount = cartItems.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <AppContext.Provider value={{ lang, theme, t: translations[lang], toggleLang, toggleTheme, user, login, logout, cartItems, addToCart, removeFromCart, updateQuantity, clearCart, cartCount, orders, placeOrder, removeOrder }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used inside AppProvider");
  return ctx;
}
