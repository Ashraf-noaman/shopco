import Link from "next/link";
import StarRating from "./StarRating";
import Image from "next/image";

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice: number | null;
  discount: number | null;
  rating: number;
  emoji?: string;
  color: string;
}

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/product/${product.id}`}
      className="group cursor-pointer block"
    >
      <div className="bg-secondary rounded-2xl overflow-hidden aspect-[3/4] flex items-center justify-center mb-3 relative">
        <div
          className="w-4/5 h-4/5 rounded-lg flex items-center justify-center opacity-90 group-hover:scale-105 transition-transform duration-300"
          style={{ backgroundColor: product.color }}
        >
          
          {product.emoji ? (
            <Image
              src={product.emoji}
              alt={product.name}
              width={1000}
              height={1000}
              className="object-cover"
            />
          ) : (
            <span className="text-white/30 text-5xl">👕</span>
          )}{""}
        </div>
        {product.discount && (
          <span className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            {product.discount}%
          </span>
        )}
      </div>
      <div className="px-1">
        <h3 className="font-semibold text-sm sm:text-base text-foreground leading-snug mb-1.5 group-hover:underline underline-offset-2 transition-all">
          {product.name}
        </h3>
        <StarRating rating={product.rating} />
        <div className="flex items-center gap-2 mt-1.5">
          <span className="text-base sm:text-lg font-bold text-foreground">
            ${product.price}
          </span>
          {product.originalPrice && (
            <>
              <span className="text-sm text-muted-foreground line-through font-medium">
                ${product.originalPrice}
              </span>
              <span className="text-xs text-red-500 font-bold bg-red-500/10 px-1.5 py-0.5 rounded-full">
                {product.discount}%
              </span>
            </>
          )}
        </div>
      </div>
    </Link>
  );
}
