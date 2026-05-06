"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ChevronRight,
  ChevronUp,
  ChevronDown,
  SlidersHorizontal,
  Check,
  ChevronLeft,
  X,
  Globe,
  ShoppingCart,
} from "lucide-react";
import Navbar from "./Navbar";
import AnnouncementBar from "./AnnouncementBar";
import Footer from "./Footer";
import StarRating from "./StarRating";
import { useApp } from "@/contexts/AppContext";
import Image from "next/image";

/* ─── Data ────────────────────────────────────────────────────────── */
const ALL_PRODUCTS = [
  {
    id: 1,
    price: 145,
    originalPrice: null as number | null,
    discount: null as number | null,
    rating: 4.5,
    emoji: "/assets/61.png",
    color: "#e4cdb7",
    category: "T-shirts",
    size: "Medium",
    selectedColor: "#e4cdb7",
  },
  {
    id: 2,
    price: 180,
    originalPrice: null,
    discount: null,
    rating: 4.5,
    emoji: "/assets/62.png",
    color: "#c08080",
    category: "Shirts",
    size: "Medium",
    selectedColor: "#c08080",
  },
  {
    id: 3,
    price: 120,
    originalPrice: 160,
    discount: -25,
    rating: 5.0,
    emoji: "/assets/63.png",
    color: "#1a1a2e",
    category: "T-shirts",
    size: "Large",
    selectedColor: "#1a1a2e",
  },
  {
    id: 4,
    price: 240,
    originalPrice: 260,
    discount: -20,
    rating: 3.5,
    emoji: "/assets/64.png",
    color: "#4a6fa5",
    category: "Jeans",
    size: "Large",
    selectedColor: "#4a6fa5",
  },
  {
    id: 5,
    price: 180,
    originalPrice: null,
    discount: null,
    rating: 4.5,
    emoji: "/assets/65.png",
    color: "#7b3f20",
    category: "Shirts",
    size: "Medium",
    selectedColor: "#7b3f20",
  },
  {
    id: 6,
    price: 130,
    originalPrice: 160,
    discount: -18,
    rating: 4.5,
    emoji: "/assets/66.png",
    color: "#c85a20",
    category: "T-shirts",
    size: "Small",
    selectedColor: "#c85a20",
  },
  {
    id: 7,
    price: 212,
    originalPrice: 232,
    discount: -20,
    rating: 5.0,
    emoji: "/assets/66.png",
    color: "#4a7c59",
    category: "Shirts",
    size: "Large",
    selectedColor: "#4a7c59",
  },
  {
    id: 8,
    price: 145,
    originalPrice: null,
    discount: null,
    rating: 4.0,
    emoji: "/assets/66.png",
    color: "#d06a2a",
    category: "T-shirts",
    size: "Medium",
    selectedColor: "#d06a2a",
  },
  {
    id: 9,
    price: 80,
    originalPrice: null,
    discount: null,
    rating: 3.0,
    emoji: "/assets/44.png",
    color: "/assets/44.png",
    category: "Shorts",
    size: "Medium",
    selectedColor: "#7babc5",
  },
  {
    id: 10,
    price: 210,
    originalPrice: null,
    discount: null,
    rating: 4.5,
    emoji: "/assets/45.png",
    color: "#2a2a2a",
    category: "Jeans",
    size: "Large",
    selectedColor: "#2a2a2a",
  },
  {
    id: 11,
    price: 190,
    originalPrice: 220,
    discount: -14,
    rating: 4.0,
    emoji: "/assets/46.png",
    color: "#e8e8e8",
    category: "Hoodie",
    size: "Large",
    selectedColor: "#e8e8e8",
  },
  {
    id: 12,
    price: 165,
    originalPrice: null,
    discount: null,
    rating: 4.5,
    emoji: "/assets/47.png",
    color: "#5b8dd9",
    category: "Shirts",
    size: "Medium",
    selectedColor: "#5b8dd9",
  },
  {
    id: 13,
    price: 95,
    originalPrice: 120,
    discount: -21,
    rating: 3.5,
    emoji: "/assets/44.png",
    color: "#8b7355",
    category: "Shorts",
    size: "Small",
    selectedColor: "#8b7355",
  },
  {
    id: 15,
    price: 195,
    originalPrice: 230,
    discount: -15,
    rating: 4.0,
    emoji: "/assets/11.png",
    color: "#6b8cae",
    category: "Jeans",
    size: "Large",
    selectedColor: "#6b8cae",
  },
  {
    id: 16,
    price: 110,
    originalPrice: null,
    discount: null,
    rating: 4.0,
    emoji: "/assets/12.png",
    color: "#9b59b6",
    category: "T-shirts",
    size: "Medium",
    selectedColor: "#9b59b6",
  },
  {
    id: 17,
    price: 155,
    originalPrice: null,
    discount: null,
    rating: 4.5,
    emoji: "/assets/13.png",
    color: "#7daa72",
    category: "Shirts",
    size: "Medium",
    selectedColor: "#7daa72",
  },
];

const CATEGORIES = ["T-shirts", "Shorts", "Shirts", "Hoodie", "Jeans"];
const COLORS = [
  { name: "Red", hex: "#FF3B30" },
  { name: "Green", hex: "#34C759" },
  { name: "Yellow", hex: "#FFD60A" },
  { name: "Orange", hex: "#FF9500" },
  { name: "Cyan", hex: "#64D2FF" },
  { name: "Blue", hex: "#0A84FF" },
  { name: "Purple", hex: "#BF5AF2" },
  { name: "Pink", hex: "#FF2D55" },
  { name: "White", hex: "#E5E5EA" },
  { name: "Black", hex: "#1C1C1E" },
];
const SIZES = [
  "XX-Small",
  "X-Small",
  "Small",
  "Medium",
  "Large",
  "X-Large",
  "XX-Large",
  "3X-Large",
  "4X-Large",
];
const DRESS_STYLES = ["Casual", "Formal", "Party", "Gym"];
const SORT_KEYS = [
  "Most Popular",
  "Newest",
  "Price: Low to High",
  "Price: High to Low",
];
const PER_PAGE = 9;
const TOTAL_PRODUCTS = 100;

/* ─── Dual range slider ───────────────────────────────────────────── */
function PriceSlider({
  min,
  max,
  value,
  onChange,
}: {
  min: number;
  max: number;
  value: [number, number];
  onChange: (v: [number, number]) => void;
}) {
  const [lo, hi] = value;
  const loPercent = ((lo - min) / (max - min)) * 100;
  const hiPercent = ((hi - min) / (max - min)) * 100;
  return (
    <div className="px-1">
      <div className="relative h-6 flex items-center">
        <div className="absolute w-full h-1 rounded-full bg-secondary" />
        <div
          className="absolute h-1 rounded-full bg-foreground"
          style={{ left: `${loPercent}%`, width: `${hiPercent - loPercent}%` }}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={5}
          value={lo}
          onChange={(e) => onChange([Math.min(+e.target.value, hi - 10), hi])}
          className="absolute w-full h-full opacity-0 cursor-pointer"
          style={{ zIndex: lo > max - 20 ? 5 : 3 }}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={5}
          value={hi}
          onChange={(e) => onChange([lo, Math.max(+e.target.value, lo + 10)])}
          className="absolute w-full h-full opacity-0 cursor-pointer"
          style={{ zIndex: 4 }}
        />
        <div
          className="absolute w-5 h-5 rounded-full bg-foreground border-2 border-background shadow pointer-events-none"
          style={{ left: `calc(${loPercent}% - 10px)` }}
        />
        <div
          className="absolute w-5 h-5 rounded-full bg-foreground border-2 border-background shadow pointer-events-none"
          style={{ left: `calc(${hiPercent}% - 10px)` }}
        />
      </div>
      <div className="flex justify-between text-sm font-medium text-foreground mt-1">
        <span>${lo}</span>
        <span>${hi}</span>
      </div>
    </div>
  );
}

/* ─── Filter section wrapper ──────────────────────────────────────── */
function FilterSection({
  title,
  open,
  onToggle,
  children,
}: {
  title: string;
  open: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="border-t border-border py-4">
      <button
        onClick={onToggle}
        className="flex items-center justify-between w-full text-base font-semibold text-foreground"
      >
        {title}
        {open ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </button>
      {open && <div className="mt-3">{children}</div>}
    </div>
  );
}

/* ─── Filters panel ───────────────────────────────────────────────── */
type TC = ReturnType<typeof useApp>["t"]["casual"];

function FiltersPanel({
  priceRange,
  setPriceRange,
  selectedColors,
  toggleColor,
  selectedSizes,
  toggleSize,
  selectedCategory,
  setSelectedCategory,
  selectedStyle,
  setSelectedStyle,
  onApply,
  tc,
}: {
  priceRange: [number, number];
  setPriceRange: (v: [number, number]) => void;
  selectedColors: string[];
  toggleColor: (n: string) => void;
  selectedSizes: string[];
  toggleSize: (s: string) => void;
  selectedCategory: string;
  setSelectedCategory: (c: string) => void;
  selectedStyle: string;
  setSelectedStyle: (s: string) => void;
  onApply: () => void;
  tc: TC;
}) {
  const [open, setOpen] = useState({
    categories: true,
    price: true,
    colors: true,
    size: true,
    dressStyle: true,
  });
  const tog = (k: keyof typeof open) => setOpen((p) => ({ ...p, [k]: !p[k] }));

  return (
    <div className="border border-border rounded-2xl px-5 py-4 bg-card">
      <div className="flex items-center justify-between pb-3 border-b border-border">
        <span className="text-lg font-bold text-foreground">{tc.filters}</span>
        <SlidersHorizontal size={20} className="text-muted-foreground" />
      </div>

      <FilterSection
        title={tc.categories}
        open={open.categories}
        onToggle={() => tog("categories")}
      >
        <ul className="flex flex-col gap-2">
          {CATEGORIES.map((cat) => (
            <li key={cat}>
              <button
                onClick={() =>
                  setSelectedCategory(cat === selectedCategory ? "" : cat)
                }
                className={`flex items-center justify-between w-full text-sm py-0.5 transition-colors ${
                  cat === selectedCategory
                    ? "text-foreground font-semibold"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {cat}
                <ChevronRight size={16} className="text-muted-foreground" />
              </button>
            </li>
          ))}
        </ul>
      </FilterSection>

      <FilterSection
        title={tc.price}
        open={open.price}
        onToggle={() => tog("price")}
      >
        <PriceSlider
          min={0}
          max={500}
          value={priceRange}
          onChange={setPriceRange}
        />
      </FilterSection>

      <FilterSection
        title={tc.colors}
        open={open.colors}
        onToggle={() => tog("colors")}
      >
        <div className="grid grid-cols-5 gap-2">
          {COLORS.map((c) => {
            const active = selectedColors.includes(c.name);
            return (
              <button
                key={c.name}
                onClick={() => toggleColor(c.name)}
                title={c.name}
                className="relative w-8 h-8 rounded-full border-2 transition-all"
                style={{
                  backgroundColor: c.hex,
                  borderColor: active ? "var(--foreground)" : "transparent",
                  outline: active ? "2px solid var(--border)" : "none",
                  outlineOffset: "2px",
                }}
              >
                {active && (
                  <span className="absolute inset-0 flex items-center justify-center">
                    <Check
                      size={14}
                      className={
                        ["White", "Yellow", "Cyan"].includes(c.name)
                          ? "text-black"
                          : "text-white"
                      }
                      strokeWidth={3}
                    />
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </FilterSection>

      <FilterSection
        title={tc.size}
        open={open.size}
        onToggle={() => tog("size")}
      >
        <div className="flex flex-wrap gap-2">
          {SIZES.map((s) => {
            const active = selectedSizes.includes(s);
            return (
              <button
                key={s}
                onClick={() => toggleSize(s)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all border ${
                  active
                    ? "bg-foreground text-background border-foreground"
                    : "bg-secondary text-foreground border-transparent hover:border-border"
                }`}
              >
                {s}
              </button>
            );
          })}
        </div>
      </FilterSection>

      <FilterSection
        title={tc.dressStyle}
        open={open.dressStyle}
        onToggle={() => tog("dressStyle")}
      >
        <ul className="flex flex-col gap-2">
          {DRESS_STYLES.map((style) => (
            <li key={style}>
              <button
                onClick={() =>
                  setSelectedStyle(style === selectedStyle ? "" : style)
                }
                className={`flex items-center justify-between w-full text-sm py-0.5 transition-colors ${
                  style === selectedStyle
                    ? "text-foreground font-semibold"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {style}
                <ChevronRight size={16} className="text-muted-foreground" />
              </button>
            </li>
          ))}
        </ul>
      </FilterSection>

      <button
        onClick={onApply}
        className="mt-4 w-full bg-foreground text-background font-semibold text-sm py-3 rounded-full hover:opacity-90 active:scale-95 transition-all"
      >
        {tc.applyFilter}
      </button>
    </div>
  );
}

/* ─── Product card with Add to Cart ──────────────────────────────── */
function ShopProductCard({
  product,
  name,
}: {
  product: (typeof ALL_PRODUCTS)[number];
  name: string;
}) {
  const router = useRouter();
  const { addToCart } = useApp();
  const [added, setAdded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart({
      id: product.id,
      name,
      price: product.price,
      originalPrice: product.originalPrice,
      discount: product.discount,
      emoji: product.emoji,
      color: product.color,
      size: product.size,
      selectedColor: product.selectedColor,
      quantity: 1,
    });
    setAdded(true);
  };

  return (
    <div className="group cursor-pointer relative">
      <div className="bg-[#f0eeed] dark:bg-secondary rounded-2xl overflow-hidden aspect-[3/4] flex items-center justify-center mb-3 relative">
        <Link
          href={`/product/${product.id}`}
          className="group cursor-pointer block"
        >
          {" "}
          {""}
          <div
            className="w-5/5 h-4/5 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform duration-300"
            style={{ backgroundColor: product.color }}
          >
            <Image
              src={product.emoji}
              alt={name}
              width={1000}
              height={1000}
              className="object-cover"
            />
          </div>
        </Link>
        {product.discount && (
          <span className="absolute top-3 end-3 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
            {product.discount}%
          </span>
        )}

        <div className="absolute inset-0 flex items-end justify-center pb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <div className="flex items-center gap-2">
            {/* Go to product */}
            <Link
              href={`/product/${product.id}`}
              className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold shadow-lg bg-secondary text-foreground hover:bg-secondary/80 transition"
            >
              View
            </Link>

            {/* Add to cart */}
            <span
              onClick={handleAddToCart}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold shadow-lg transition-all cursor-pointer ${
                added
                  ? "bg-green-600 text-white"
                  : "bg-foreground text-background"
              }`}
            >
              <ShoppingCart size={13} />
              {added ? "Added!" : "Cart"}
            </span>
          </div>
        </div>
      </div>

      <div className="px-0.5">
        <h3 className="font-semibold text-sm text-foreground leading-snug mb-1 group-hover:underline underline-offset-2">
          {name}
        </h3>
        <div className="flex items-center gap-1 mb-1.5">
          <StarRating rating={product.rating} />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-base font-bold text-foreground">
            ${product.price}
          </span>
          {product.originalPrice && (
            <>
              <span className="text-sm text-muted-foreground line-through">
                ${product.originalPrice}
              </span>
              <span className="text-[10px] font-bold text-red-500 bg-red-500/10 px-1.5 py-0.5 rounded-full">
                {product.discount}%
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── Pagination ──────────────────────────────────────────────────── */
function Pagination({
  current,
  total,
  perPage,
  onChange,
  prevLabel,
  nextLabel,
}: {
  current: number;
  total: number;
  perPage: number;
  onChange: (p: number) => void;
  prevLabel: string;
  nextLabel: string;
}) {
  const totalPages = Math.ceil(total / perPage);
  const pages: (number | "…")[] = [];
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else {
    pages.push(1, 2, 3);
    if (current > 4) pages.push("…");
    if (current > 3 && current < totalPages - 2) pages.push(current);
    if (current < totalPages - 3) pages.push("…");
    pages.push(totalPages - 2, totalPages - 1, totalPages);
  }
  const PageBtn = ({ p }: { p: number | "…" }) =>
    p === "…" ? (
      <span className="w-8 h-8 flex items-center justify-center text-sm text-muted-foreground">
        …
      </span>
    ) : (
      <button
        onClick={() => onChange(p as number)}
        className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
          p === current
            ? "bg-foreground text-background"
            : "text-foreground hover:bg-secondary"
        }`}
      >
        {p}
      </button>
    );
  return (
    <div className="flex items-center justify-between mt-10 border-t border-border pt-6">
      <button
        onClick={() => onChange(Math.max(1, current - 1))}
        disabled={current === 1}
        className="flex items-center gap-1.5 px-4 py-2 rounded-lg border border-border text-sm font-medium text-foreground hover:bg-secondary disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        <ChevronLeft size={16} />
        {prevLabel}
      </button>
      <div className="flex items-center gap-1">
        {pages.map((p, i) => (
          <PageBtn key={i} p={p} />
        ))}
      </div>
      <button
        onClick={() => onChange(Math.min(totalPages, current + 1))}
        disabled={current === totalPages}
        className="flex items-center gap-1.5 px-4 py-2 rounded-lg border border-border text-sm font-medium text-foreground hover:bg-secondary disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        {nextLabel}
        <ChevronRight size={16} />
      </button>
    </div>
  );
}

/* ─── Main page ───────────────────────────────────────────────────── */
export default function CasualPage() {
  const { t, toggleLang } = useApp();
  const tc = t.casual;

  const [priceRange, setPriceRange] = useState<[number, number]>([50, 200]);
  const [selectedColors, setSelectedColors] = useState<string[]>(["Purple"]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>(["Large"]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedStyle, setSelectedStyle] = useState("Casual");
  const [sortBy, setSortBy] = useState("Most Popular");
  const [currentPage, setCurrentPage] = useState(1);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const [applied, setApplied] = useState({
    priceRange: [50, 200] as [number, number],
    colors: ["Purple"],
    sizes: ["Large"],
    category: "",
    style: "Casual",
  });

  const toggleColor = (n: string) =>
    setSelectedColors((p) =>
      p.includes(n) ? p.filter((c) => c !== n) : [...p, n],
    );
  const toggleSize = (s: string) =>
    setSelectedSizes((p) =>
      p.includes(s) ? p.filter((x) => x !== s) : [...p, s],
    );

  const applyFilters = () => {
    setApplied({
      priceRange,
      colors: selectedColors,
      sizes: selectedSizes,
      category: selectedCategory,
      style: selectedStyle,
    });
    setCurrentPage(1);
    setMobileFiltersOpen(false);
  };

  const filtered = useMemo(
    () =>
      ALL_PRODUCTS.filter((p) => {
        if (p.price < applied.priceRange[0] || p.price > applied.priceRange[1])
          return false;
        if (applied.category && p.category !== applied.category) return false;
        return true;
      }),
    [applied],
  );

  const sorted = useMemo(() => {
    const arr = [...filtered];
    if (sortBy === "Price: Low to High") arr.sort((a, b) => a.price - b.price);
    if (sortBy === "Price: High to Low") arr.sort((a, b) => b.price - a.price);
    if (sortBy === "Newest") arr.sort((a, b) => b.id - a.id);
    return arr;
  }, [filtered, sortBy]);

  const totalFiltered = TOTAL_PRODUCTS;
  const pageProducts = sorted.slice(0, PER_PAGE);
  const startItem = (currentPage - 1) * PER_PAGE + 1;
  const endItem = Math.min(currentPage * PER_PAGE, totalFiltered);

  const filtersProps = {
    priceRange,
    setPriceRange,
    selectedColors,
    toggleColor,
    selectedSizes,
    toggleSize,
    selectedCategory,
    setSelectedCategory,
    selectedStyle,
    setSelectedStyle,
    onApply: applyFilters,
    tc,
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <AnnouncementBar />
      <Navbar />

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-sm text-muted-foreground mb-6">
          <Link href="/" className="hover:text-foreground transition-colors">
            {tc.home}
          </Link>
          <ChevronRight size={14} />
          <span className="text-foreground font-medium">{tc.title}</span>
        </nav>

        <div className="flex gap-6 lg:gap-8 items-start">
          {/* Desktop sidebar */}
          <aside className="w-[260px] shrink-0 hidden lg:block">
            <FiltersPanel {...filtersProps} />
          </aside>

          {/* Product area */}
          <div className="flex-1 min-w-0">
            {/* Header row */}
            <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
              <div className="flex items-center gap-3 flex-wrap">
                <button
                  onClick={() => setMobileFiltersOpen(true)}
                  className="lg:hidden flex items-center gap-1.5 px-3 py-2 border border-border rounded-xl text-sm font-medium text-foreground hover:bg-secondary transition-colors"
                >
                  <SlidersHorizontal size={16} />
                  {tc.filters}
                </button>
                <h1 className="text-2xl font-bold text-foreground">
                  {tc.title}
                </h1>
              </div>

              <div className="flex items-center gap-3 flex-wrap">
                <span className="text-sm text-muted-foreground">
                  {tc.showing} {startItem}–{endItem} {tc.of} {totalFiltered}{" "}
                  {tc.products}
                </span>

                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => {
                      setSortBy(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="appearance-none pl-3 pr-8 py-2 border border-border rounded-xl text-sm font-medium text-foreground bg-background hover:bg-secondary transition-colors cursor-pointer outline-none"
                  >
                    {SORT_KEYS.map((key) => (
                      <option key={key} value={key}>
                        {tc.sortOptions[key]}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    size={14}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
                  />
                </div>
              </div>
            </div>

            {/* Product grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-5">
              {pageProducts.map((product) => (
                <ShopProductCard
                  key={product.id}
                  product={product}
                  name={tc.productNames[product.id] ?? ""}
                />
              ))}
            </div>

            {/* Pagination */}
            <Pagination
              current={currentPage}
              total={totalFiltered}
              perPage={PER_PAGE}
              onChange={(p) => {
                setCurrentPage(p);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              prevLabel={tc.previous}
              nextLabel={tc.next}
            />
          </div>
        </div>
      </main>

      {/* Mobile filter drawer */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setMobileFiltersOpen(false)}
          />
          <div className="absolute bottom-0 left-0 right-0 max-h-[85vh] overflow-y-auto bg-background rounded-t-3xl px-4 pt-4 pb-8 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <span className="text-lg font-bold text-foreground">
                {tc.filters}
              </span>
              <button
                onClick={() => setMobileFiltersOpen(false)}
                className="p-1.5 rounded-full hover:bg-secondary transition"
              >
                <X size={20} />
              </button>
            </div>
            <FiltersPanel {...filtersProps} />
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
