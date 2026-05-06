"use client";
import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { TESTIMONIALS } from "@/data";
import StarRating from "./StarRating";
import { useApp } from "@/contexts/AppContext";

export default function Testimonials() {
  const [startIndex, setStartIndex] = useState(0);
  const { t } = useApp();
  const visible = 3;

  const prev = () => setStartIndex((i) => Math.max(0, i - 1));
  const next = () => setStartIndex((i) => Math.min(TESTIMONIALS.length - visible, i + 1));

  const shown = TESTIMONIALS.slice(startIndex, startIndex + visible);

  return (
    <section className="py-14 sm:py-20 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-10 sm:mb-14">
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground tracking-tight max-w-sm leading-tight"
            style={{ fontFamily: "'Integral CF', sans-serif" }}
          >
            {t.sections.happyCustomers}
          </h2>
          <div className="flex items-center gap-2 shrink-0 ml-4">
            <button
              onClick={prev}
              disabled={startIndex === 0}
              className="w-9 h-9 rounded-full border border-border flex items-center justify-center hover:bg-foreground hover:text-background hover:border-foreground disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-150"
              aria-label="Previous"
            >
              <ArrowLeft size={16} />
            </button>
            <button
              onClick={next}
              disabled={startIndex >= TESTIMONIALS.length - visible}
              className="w-9 h-9 rounded-full border border-border flex items-center justify-center hover:bg-foreground hover:text-background hover:border-foreground disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-150"
              aria-label="Next"
            >
              <ArrowRight size={16} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {shown.map((item) => (
            <div
              key={item.id}
              className="border border-border rounded-2xl p-6 hover:shadow-md transition-shadow duration-200 flex flex-col gap-3 bg-card"
            >
              <StarRating rating={item.rating} />
              <div className="flex items-center gap-2">
                <span className="font-bold text-base text-card-foreground">{item.name}</span>
                {item.verified && (
                  <span className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center shrink-0">
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                )}
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                &ldquo;{item.review}&rdquo;
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
