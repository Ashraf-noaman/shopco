"use client";
import { BRANDS } from "@/data";

export default function BrandsBar() {
  return (
    <div className="bg-foreground text-background py-5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-around flex-wrap gap-6">
          {BRANDS.map((brand) => (
            <span
              key={brand}
              className="cursor-pointer text-xl sm:text-2xl font-black tracking-tight opacity-90 hover:opacity-100 transition-opacity select-none"
            >
              {brand}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
