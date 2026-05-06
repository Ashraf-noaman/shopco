"use client";
import { NEW_ARRIVALS } from "@/data";
import ProductCard from "./ProductCard";
import { useApp } from "@/contexts/AppContext";

export default function NewArrivals() {
  const { t } = useApp();
  const products = NEW_ARRIVALS.map((p) => ({ ...p, name: t.products[p.id] ?? p.name }));

  return (
    <section className="py-14 sm:py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2
          className="text-3xl sm:text-4xl lg:text-5xl font-black text-center text-foreground tracking-tight mb-10 sm:mb-14"
          style={{ fontFamily: "'Integral CF', sans-serif" }}
        >
          {t.sections.newArrivals}
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="flex justify-center mt-10 sm:mt-14">
          <a
            href="#"
            className="border border-border text-foreground font-medium text-sm px-10 py-3 rounded-full hover:bg-foreground hover:text-background hover:border-foreground transition-all duration-200 active:scale-95"
          >
            {t.sections.viewAll}
          </a>
        </div>
      </div>
    </section>
  );
}
