"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AnnouncementBar from "@/components/AnnouncementBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Newsletter from "@/components/Newsletter";
import StarRating from "@/components/StarRating";
import ProductCard from "@/components/ProductCard";
import { ChevronRight, Minus, Plus, Check, SlidersHorizontal, ShoppingCart } from "lucide-react";
import { useApp } from "@/contexts/AppContext";

const PRODUCT = {
  id: 9,
  name: "One Life Graphic T-shirt",
  nameAr: "تي شيرت جرافيك - حياة واحدة",
  price: 260,
  originalPrice: 300,
  discount: -40,
  rating: 4.8,
  reviewCount: 421,
  colors: ["#4a5240", "#2a2a2a", "#1e3a5f"],
  sizes: ["Small", "Medium", "Large", "X-Large"],
  description:
    "This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.",
  descriptionAr:
    "تي شيرت جرافيك مثالي لجميع المناسبات. مصنوع من قماش ناعم وقابل للتنفس، يوفر راحة وأناقة فائقة.",
  images: [
    { emoji: "👕", color: "#4a5240" },
    { emoji: "👕", color: "#3d4535" },
    { emoji: "👕", color: "#5a6250" },
  ],
  details: [
    "100% Cotton, 180 GSM",
    "Regular fit, crew neck",
    "Machine washable at 30°C",
    "Available in multiple colors and sizes",
    "Reinforced stitching for durability",
  ],
  detailsAr: [
    "قطن 100%، 180 جرام لكل متر مربع",
    "قصة عادية، طوق دائري",
    "قابل للغسل في الغسالة على 30 درجة مئوية",
    "متاح بألوان ومقاسات متعددة",
    "خياطة مقواة للمتانة",
  ],
  faqs: [
    {
      q: "What is the return policy?",
      a: "We accept returns within 30 days of purchase. Items must be unworn and in original packaging.",
      qAr: "ما هي سياسة الإرجاع؟",
      aAr: "نقبل الإرجاع خلال 30 يومًا من الشراء. يجب أن تكون المنتجات غير مستخدمة وفي عبوتها الأصلية.",
    },
    {
      q: "How long does shipping take?",
      a: "Standard shipping takes 5-7 business days. Express shipping is available at checkout.",
      qAr: "كم تستغرق مدة الشحن؟",
      aAr: "يستغرق الشحن العادي 5-7 أيام عمل. الشحن السريع متاح عند الدفع.",
    },
    {
      q: "Is this true to size?",
      a: "Yes, this item runs true to size. If you're between sizes, we recommend sizing up.",
      qAr: "هل المقاسات صحيحة؟",
      aAr: "نعم، المقاسات صحيحة. إذا كنت بين مقاسين، ننصحك باختيار المقاس الأكبر.",
    },
  ],
};

const REVIEWS = [
  { id: 1, name: "Samantha D.", rating: 4.5, verified: true, date: "August 14, 2023", text: "I absolutely love this t-shirt! The design is unique and the fabric feels so comfortable. As a fellow designer, I appreciate the attention to detail. It's become my favorite go-to shirt!" },
  { id: 2, name: "Alex M.", rating: 4, verified: true, date: "August 15, 2023", text: "The t-shirt exceeded my expectations! The colors are vibrant and the print quality is top-notch. Being a UX/UI designer myself, I am quite picky about aesthetics, and this t-shirt definitely gets a thumbs up from me." },
  { id: 3, name: "Ethan R.", rating: 3.5, verified: true, date: "August 16, 2023", text: "This t-shirt is a must-have for anyone who appreciates good design. The minimalist yet stylish pattern caught my eye and the fit is perfect. I can feel the designer's touch in every aspect of this shirt!" },
  { id: 4, name: "Olivia P.", rating: 4, verified: true, date: "August 17, 2023", text: "As a UI/UX enthusiast, I value simplicity and functionality. This t-shirt has me precisely these principles but also feels great to wear. It's evident that the designer poured their creativity into making this t-shirt stand out." },
  { id: 5, name: "Liam K.", rating: 4, verified: true, date: "August 18, 2023", text: "This t-shirt is a fusion of comfort and creativity. The fabric is soft and the design speaks volumes about the designer's skill. It's like wearing a piece of art that reflects my passion for both design and fashion." },
  { id: 6, name: "Ava H.", rating: 4, verified: true, date: "August 19, 2023", text: "I'm not just wearing a t-shirt; I'm wearing a piece of design philosophy. The intricate details and thoughtful layout of the design make the shirt a conversation starter." },
];

const YOU_MIGHT_LIKE = [
  { id: 21, name: "Polo with Contrast Trims", price: 212, originalPrice: 242, discount: -20, rating: 4.0, emoji: "🧥", color: "#1a6b9a" },
  { id: 22, name: "Gradient Graphic T-shirt", price: 145, originalPrice: null, discount: null, rating: 3.5, emoji: "🌈", color: "#f0e0c0" },
  { id: 23, name: "Polo with Tipping Details", price: 180, originalPrice: null, discount: null, rating: 4.5, emoji: "👕", color: "#c8a0a0" },
  { id: 24, name: "Black Striped T-shirt", price: 120, originalPrice: 160, discount: -30, rating: 5.0, emoji: "🖤", color: "#1a1a1a" },
];

export default function ProductPage() {
  const { t, lang, addToCart, user } = useApp();
  const router = useRouter();
  const pt = t.product;
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState(2);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("reviews");
  const [activeImage, setActiveImage] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [addedFeedback, setAddedFeedback] = useState(false);

  const productName = lang === "ar" ? PRODUCT.nameAr : PRODUCT.name;
  const productDesc = lang === "ar" ? PRODUCT.descriptionAr : PRODUCT.description;
  const productDetails = lang === "ar" ? PRODUCT.detailsAr : PRODUCT.details;

  const handleAddToCart = () => {
    if (!user) {
      router.push("/login");
      return;
    }
    addToCart({
      id: PRODUCT.id,
      name: PRODUCT.name,
      price: PRODUCT.price,
      originalPrice: PRODUCT.originalPrice,
      discount: PRODUCT.discount,
      emoji: PRODUCT.images[activeImage].emoji,
      color: PRODUCT.images[activeImage].color,
      size: PRODUCT.sizes[selectedSize],
      selectedColor: PRODUCT.colors[selectedColor],
      quantity,
    });
    setAddedFeedback(true);
    setTimeout(() => setAddedFeedback(false), 2000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <AnnouncementBar />
      <Navbar />
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1 text-sm text-muted-foreground mb-6">
          <Link href="/" className="hover:text-foreground transition-colors">{pt.home}</Link>
          <ChevronRight size={14} />
          <span>{pt.shop}</span>
          <ChevronRight size={14} />
          <span>{pt.men}</span>
          <ChevronRight size={14} />
          <span className="text-foreground font-medium">{pt.tshirts}</span>
        </nav>

        {/* Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 mb-16">
          {/* Images */}
          <div className="flex gap-4">
            <div className="flex flex-col gap-3">
              {PRODUCT.images.map((img, i) => (
                <button key={i} onClick={() => setActiveImage(i)} className={`w-16 h-20 rounded-xl overflow-hidden flex items-center justify-center border-2 transition-all ${activeImage === i ? "border-foreground" : "border-transparent"}`} style={{ backgroundColor: img.color }}>
                  <span className="text-white/30 text-2xl select-none">{img.emoji}</span>
                </button>
              ))}
            </div>
            <div className="flex-1 rounded-2xl overflow-hidden flex items-center justify-center aspect-square" style={{ backgroundColor: PRODUCT.images[activeImage].color }}>
              <span className="text-white/20 text-9xl select-none">{PRODUCT.images[activeImage].emoji}</span>
            </div>
          </div>

          {/* Info */}
          <div className="flex flex-col">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground uppercase tracking-tight mb-2">{productName}</h1>
            <div className="flex items-center gap-2 mb-3">
              <StarRating rating={PRODUCT.rating} />
              <span className="text-sm text-muted-foreground">{PRODUCT.reviewCount.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl font-bold text-foreground">${PRODUCT.price}</span>
              <span className="text-xl text-muted-foreground line-through">${PRODUCT.originalPrice}</span>
              <span className="text-sm font-bold text-red-500 bg-red-500/10 px-2.5 py-1 rounded-full">{PRODUCT.discount}%</span>
            </div>
            <p className="text-sm text-muted-foreground mb-5 leading-relaxed">{productDesc}</p>
            <div className="w-full h-px bg-border mb-5" />

            {/* Color */}
            <div className="mb-5">
              <p className="text-sm text-muted-foreground mb-2.5">{pt.selectColors}</p>
              <div className="flex gap-2">
                {PRODUCT.colors.map((color, i) => (
                  <button key={i} onClick={() => setSelectedColor(i)} className="w-9 h-9 rounded-full flex items-center justify-center border-2 transition-all" style={{ backgroundColor: color, borderColor: selectedColor === i ? "#fff" : "transparent", outline: selectedColor === i ? `2px solid ${color}` : "none" }}>
                    {selectedColor === i && <Check size={14} color="white" strokeWidth={3} />}
                  </button>
                ))}
              </div>
            </div>
            <div className="w-full h-px bg-border mb-5" />

            {/* Size */}
            <div className="mb-5">
              <p className="text-sm text-muted-foreground mb-2.5">{pt.chooseSize}</p>
              <div className="flex flex-wrap gap-2">
                {PRODUCT.sizes.map((size, i) => (
                  <button key={i} onClick={() => setSelectedSize(i)} className={`px-5 py-2 rounded-full text-sm font-medium border transition-all ${selectedSize === i ? "bg-foreground text-background border-foreground" : "bg-secondary text-foreground border-border hover:border-foreground"}`}>
                    {pt.sizes[size] ?? size}
                  </button>
                ))}
              </div>
            </div>
            <div className="w-full h-px bg-border mb-5" />

            {/* Quantity + Add to Cart */}
            <div className="flex items-center gap-4">
              <div className="flex items-center bg-secondary rounded-full px-4 py-2.5 gap-4">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="text-foreground hover:opacity-70 transition-opacity"><Minus size={16} /></button>
                <span className="text-sm font-bold w-4 text-center">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="text-foreground hover:opacity-70 transition-opacity"><Plus size={16} /></button>
              </div>
              <button
                onClick={handleAddToCart}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-full font-semibold text-sm transition-all active:scale-95 ${addedFeedback ? "bg-green-600 text-white" : "bg-foreground text-background hover:opacity-90"}`}
              >
                {addedFeedback ? <><Check size={16} /> Added!</> : <><ShoppingCart size={16} /> {pt.addToCart}</>}
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-border mb-8">
          <div className="flex gap-8">
            {["details", "reviews", "faqs"].map((tab) => (
              <button key={tab} onClick={() => setActiveTab(tab)} className={`pb-3 text-sm font-medium capitalize border-b-2 transition-all -mb-px ${activeTab === tab ? "border-foreground text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"}`}>
                {tab === "details" ? pt.productDetails : tab === "reviews" ? pt.ratingReviews : pt.faqs}
              </button>
            ))}
          </div>
        </div>

        {activeTab === "details" && (
          <div className="mb-16">
            <ul className="space-y-3">
              {productDetails.map((detail, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <Check size={16} className="text-green-500 mt-0.5 shrink-0" />{detail}
                </li>
              ))}
            </ul>
          </div>
        )}

        {activeTab === "reviews" && (
          <div className="mb-16">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-foreground">{pt.allReviews} <span className="text-muted-foreground font-normal text-base">({PRODUCT.reviewCount})</span></h2>
              <div className="flex items-center gap-2">
                <button className="p-2 rounded-full bg-secondary hover:bg-border transition-colors"><SlidersHorizontal size={16} /></button>
                <select className="text-sm border border-border bg-secondary text-foreground rounded-full px-3 py-2 outline-none">
                  <option>{pt.latest}</option>
                  <option>{pt.highestRated}</option>
                  <option>{pt.lowestRated}</option>
                </select>
                <button className="bg-foreground text-background px-5 py-2 rounded-full text-sm font-medium hover:opacity-90 transition-opacity">{pt.writeReview}</button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
              {REVIEWS.map((review) => (
                <div key={review.id} className="border border-border rounded-2xl p-5">
                  <div className="flex items-start justify-between mb-2">
                    <StarRating rating={review.rating} />
                    <button className="text-muted-foreground hover:text-foreground transition-colors">•••</button>
                  </div>
                  <div className="flex items-center gap-1.5 mb-2">
                    <span className="font-bold text-sm text-foreground">{review.name}</span>
                    {review.verified && <span className="text-green-500"><Check size={14} strokeWidth={3} /></span>}
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-2">{review.text}</p>
                  <p className="text-xs text-muted-foreground">{pt.postedOn} {review.date}</p>
                </div>
              ))}
            </div>
            <div className="flex justify-center">
              <button className="border border-border px-8 py-3 rounded-full text-sm font-medium hover:bg-secondary transition-colors">{pt.loadMoreReviews}</button>
            </div>
          </div>
        )}

        {activeTab === "faqs" && (
          <div className="mb-16 max-w-2xl">
            {PRODUCT.faqs.map((faq, i) => (
              <div key={i} className="border-b border-border py-4">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="flex items-center justify-between w-full text-left">
                  <span className="font-semibold text-sm text-foreground">{lang === "ar" ? faq.qAr : faq.q}</span>
                  <span className="text-lg text-muted-foreground">{openFaq === i ? "−" : "+"}</span>
                </button>
                {openFaq === i && <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{lang === "ar" ? faq.aAr : faq.a}</p>}
              </div>
            ))}
          </div>
        )}

        {/* You Might Also Like */}
        <section className="mb-16">
          <h2 className="text-2xl font-extrabold text-center text-foreground uppercase mb-8">{pt.youMightAlsoLike}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {YOU_MIGHT_LIKE.map((product) => (
              <Link href={`/product/${product.id}`} key={product.id}>
                <ProductCard product={product} />
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Newsletter />
      <Footer />
    </div>
  );
}
