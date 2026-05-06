"use client";
import Link from "next/link";
import AnnouncementBar from "@/components/AnnouncementBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Newsletter from "@/components/Newsletter";
import { useApp } from "@/contexts/AppContext";
import { ChevronRight, CheckCircle2, Truck, Clock, ShoppingBag, Trash2 } from "lucide-react";
import Image from "next/image";

export default function OrdersPage() {
  const { orders, removeOrder, user, t } = useApp();

  const STATUS_CONFIG = {
    Processing: { icon: Clock,         color: "text-amber-500", bg: "bg-amber-500/10", label: t.orders.statusProcessing },
    Shipped:    { icon: Truck,          color: "text-blue-500",  bg: "bg-blue-500/10",  label: t.orders.statusShipped    },
    Delivered:  { icon: CheckCircle2,   color: "text-green-500", bg: "bg-green-500/10", label: t.orders.statusDelivered  },
  } as const;

  return (
    <div className="min-h-screen flex flex-col">
      <AnnouncementBar />
      <Navbar />
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-1 text-sm text-muted-foreground mb-6">
          <Link href="/" className="hover:text-foreground transition-colors">{t.orders.home}</Link>
          <ChevronRight size={14} />
          <span className="text-foreground font-medium">{t.orders.breadcrumb}</span>
        </nav>

        <div className="flex items-end justify-between mb-8 flex-wrap gap-3">
          <div>
            <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-foreground">{t.orders.title}</h1>
            {user && (
              <p className="text-sm text-muted-foreground mt-1">
                {t.orders.loggedInAs} <span className="font-semibold text-foreground">{user.name}</span>
              </p>
            )}
          </div>
          {orders.length > 0 && (
            <span className="text-sm text-muted-foreground">
              {orders.length} {orders.length !== 1 ? t.orders.ordersCountPlural : t.orders.ordersCount}
            </span>
          )}
        </div>

        {orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 gap-5 text-center">
            <ShoppingBag size={72} className="text-muted-foreground" strokeWidth={1.2} />
            <div>
              <p className="text-xl font-bold text-foreground mb-1">{t.orders.noOrders}</p>
              <p className="text-sm text-muted-foreground">{t.orders.noOrdersDesc}</p>
            </div>
            <Link href="/casual" className="bg-foreground text-background px-8 py-3 rounded-full font-semibold text-sm hover:opacity-90 transition-opacity active:scale-95">
              {t.orders.startShopping}
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-5">
            {orders.map((order) => {
              const cfg = STATUS_CONFIG[order.status];
              const StatusIcon = cfg.icon;
              return (
                <div key={order.id} className="border border-border rounded-2xl overflow-hidden">

                  {/* Order header */}
                  <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 bg-secondary/40 border-b border-border">
                    <div className="flex flex-wrap gap-x-6 gap-y-1">
                      <div>
                        <p className="text-[10px] uppercase tracking-wide text-muted-foreground font-semibold">{t.orders.orderId}</p>
                        <p className="text-sm font-bold text-foreground">{order.id}</p>
                      </div>
                      <div>
                        <p className="text-[10px] uppercase tracking-wide text-muted-foreground font-semibold">{t.orders.date}</p>
                        <p className="text-sm font-semibold text-foreground">{order.date}</p>
                      </div>
                      <div>
                        <p className="text-[10px] uppercase tracking-wide text-muted-foreground font-semibold">{t.orders.total}</p>
                        <p className="text-sm font-bold text-foreground">${order.total}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      {/* Status badge */}
                      <span className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold ${cfg.color} ${cfg.bg}`}>
                        <StatusIcon size={12} />
                        {cfg.label}
                      </span>

                      {/* Remove order button */}
                      <button
                        onClick={() => removeOrder(order.id)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold text-red-500 bg-red-500/10 hover:bg-red-500/20 transition-colors"
                        aria-label={t.orders.removeOrder}
                      >
                        <Trash2 size={12} />
                        {t.orders.removeOrder}
                      </button>
                    </div>
                  </div>

                  {/* Order items */}
                  <div className="divide-y divide-border">
                    {order.items.map((item, i) => (
                      <div key={i} className="flex items-center gap-4 px-5 py-4">
                        <div className="w-12 h-14 overflow-hidden rounded-xl shrink-0 flex items-center justify-center" style={{ backgroundColor: item.color }}>
                          <Image src={item.emoji} alt={item.name} width={95} height={70} className=" object-cover  " />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-sm text-foreground truncate">{item.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {t.orders.size}: {item.size} · {t.orders.qty}: {item.quantity}
                          </p>
                        </div>
                        <p className="font-bold text-sm text-foreground shrink-0">${item.price * item.quantity}</p>
                      </div>
                    ))}
                  </div>

                </div>
              );
            })}
          </div>
        )}
      </main>
      <Newsletter />
      <Footer />
    </div>
  );
}
