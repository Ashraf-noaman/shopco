"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AnnouncementBar from "@/components/AnnouncementBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Newsletter from "@/components/Newsletter";
import { useApp } from "@/contexts/AppContext";
import { Trash2, Minus, Plus, ChevronRight, Tag, ArrowRight, ShoppingBag } from "lucide-react";
import Image from "next/image";

const DISCOUNT_RATE = 0.2;
const DELIVERY_FEE = 15;

export default function CartPage() {
  const router = useRouter();
  const { cartItems, removeFromCart, updateQuantity, placeOrder, t, user } = useApp();
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState(false);

  // Redirect to login if not authenticated — must be after all hooks
  useEffect(() => {
    if (user === null) {
      router.replace("/login");
    }
  }, [user, router]);

  if (!user) return null;

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = promoApplied ? Math.round(subtotal * DISCOUNT_RATE) : 0;
  const total = subtotal - discount + (cartItems.length > 0 ? DELIVERY_FEE : 0);

  const handleApplyPromo = () => {
    if (promoCode.trim().toLowerCase() === "save20") {
      setPromoApplied(true);
      setPromoError(false);
    } else {
      setPromoError(true);
      setPromoApplied(false);
    }
  };

  const handleCheckout = () => {
    placeOrder();
    router.push("/orders");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <AnnouncementBar />
      <Navbar />
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-1 text-sm text-muted-foreground mb-6">
          <Link href="/" className="hover:text-foreground transition-colors">{t.cart.home}</Link>
          <ChevronRight size={14} />
          <span className="text-foreground font-medium">{t.cart.breadcrumb}</span>
        </nav>

        <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-foreground mb-8">
          {t.cart.title}
        </h1>

        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 gap-5 text-center">
            <ShoppingBag size={72} className="text-muted-foreground" strokeWidth={1.2} />
            <div>
              <p className="text-xl font-bold text-foreground mb-1">{t.cart.emptyCart}</p>
              <p className="text-sm text-muted-foreground">Looks like you haven&apos;t added anything yet.</p>
            </div>
            <Link href="/casual" className="bg-foreground text-background px-8 py-3 rounded-full font-semibold text-sm hover:opacity-90 transition-opacity active:scale-95">
              {t.cart.continueShopping}
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6">

            {/* Cart Items */}
            <div className="border border-border rounded-2xl divide-y divide-border overflow-hidden">
              {cartItems.map((item) => (
                <div key={`${item.id}-${item.size}-${item.selectedColor}`}
                  className="flex items-start gap-4 p-5">
                  <div
                    className="w-20 h-24 overflow-hidden sm:w-24 sm:h-28 rounded-xl flex-shrink-0 flex items-center justify-center"
                    style={{ backgroundColor: item.color }}
                  >
                    <Image src={item.emoji} alt={item.name} width={100} height={70} className=" object-cover  " />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3 className="font-bold text-sm sm:text-base text-foreground leading-snug">{item.name}</h3>
                      <button
                        onClick={() => removeFromCart(item.id, item.size, item.selectedColor)}
                        className="p-1.5 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors shrink-0"
                        aria-label={t.cart.remove}
                      >
                        <Trash2 size={17} />
                      </button>
                    </div>
                    <p className="text-xs text-muted-foreground mb-0.5">
                      <span className="text-foreground/60">{t.cart.size}:</span> {item.size}
                    </p>
                    <p className="text-xs text-muted-foreground mb-3 flex items-center gap-1.5">
                      <span className="text-foreground/60">{t.cart.color}:</span>
                      <span className="w-3 h-3 rounded-full border border-border inline-block" style={{ backgroundColor: item.selectedColor }} />
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-foreground">${item.price}</span>
                      <div className="flex items-center bg-secondary rounded-full px-3 py-2 gap-3">
                        <button
                          onClick={() => updateQuantity(item.id, item.size, item.selectedColor, -1)}
                          className="text-foreground hover:opacity-60 transition-opacity"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="text-sm font-bold w-5 text-center select-none">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.size, item.selectedColor, 1)}
                          className="text-foreground hover:opacity-60 transition-opacity"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="border border-border rounded-2xl p-6 h-fit sticky top-24">
              <h2 className="text-xl font-bold text-foreground mb-6">{t.cart.orderSummary}</h2>
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{t.cart.subtotal}</span>
                  <span className="font-semibold text-foreground">${subtotal}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{t.cart.discount} (-20%)</span>
                  <span className={`font-semibold ${promoApplied ? "text-red-500" : "text-muted-foreground"}`}>
                    {promoApplied ? `-$${discount}` : "-$0"}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{t.cart.deliveryFee}</span>
                  <span className="font-semibold text-foreground">${DELIVERY_FEE}</span>
                </div>
                <div className="h-px bg-border" />
                <div className="flex justify-between">
                  <span className="font-semibold text-foreground">{t.cart.total}</span>
                  <span className="text-xl font-bold text-foreground">${total}</span>
                </div>
              </div>

              {/* Promo code */}
              <div className="flex gap-2 mb-2">
                <div className={`flex items-center flex-1 bg-secondary rounded-full px-4 py-2.5 gap-2 border transition-colors ${promoError ? "border-red-500" : "border-transparent focus-within:border-foreground/30"}`}>
                  <Tag size={14} className="text-muted-foreground shrink-0" />
                  <input
                    type="text"
                    value={promoCode}
                    onChange={e => { setPromoCode(e.target.value); setPromoError(false); setPromoApplied(false); }}
                    placeholder={t.cart.promoPlaceholder}
                    className="bg-transparent text-sm outline-none w-full placeholder:text-muted-foreground text-foreground"
                    onKeyDown={e => e.key === "Enter" && handleApplyPromo()}
                  />
                </div>
                <button
                  onClick={handleApplyPromo}
                  className="bg-foreground text-background px-5 py-2.5 rounded-full text-sm font-semibold hover:opacity-90 transition-opacity shrink-0"
                >
                  {t.cart.apply}
                </button>
              </div>
              {promoApplied && <p className="text-xs text-green-500 mb-4 px-1">✓ 20% discount applied!</p>}
              {promoError && <p className="text-xs text-red-500 mb-4 px-1">Invalid code. Try &quot;SAVE20&quot;</p>}

              <button
                onClick={handleCheckout}
                className="w-full bg-foreground text-background py-4 rounded-full font-bold text-sm hover:opacity-90 active:scale-95 transition-all flex items-center justify-center gap-2 mt-2"
              >
                {t.cart.checkout} <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}
      </main>
      <Newsletter />
      <Footer />
    </div>
  );
}
