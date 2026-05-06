"use client";
import Link from "next/link";
import { useApp } from "@/contexts/AppContext";
import Image from "next/image";

const STYLE_ROUTES: Record<string, string> = {
  Casual: "/casual",
  Formal: "/casual",
  Party:  "/casual",
  Gym:    "/casual",
};

export default function DressStyle() {
  const { t } = useApp();

  return (
    <section className="py-14 sm:py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-secondary rounded-3xl px-6 sm:px-10 py-10 sm:py-14">
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-center text-foreground tracking-tight mb-8 sm:mb-12"
            style={{ fontFamily: "'Integral CF', sans-serif" }}
          >
            {t.sections.browseStyle}
          </h2>

          <div className="flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <StyleCard styleKey="Casual" label={t.dressStyles["Casual"]} flex="2" height="h-44 sm:h-52" />
              <StyleCard styleKey="Formal" label={t.dressStyles["Formal"]} flex="3" height="h-44 sm:h-52" />
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <StyleCard styleKey="Party" label={t.dressStyles["Party"]} flex="3" height="h-44 sm:h-52" />
              <StyleCard styleKey="Gym"   label={t.dressStyles["Gym"]}   flex="2" height="h-44 sm:h-52" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StyleCard({ styleKey, label, flex, height }: { styleKey: string; label: string; flex: string; height: string }) {
  const palettes: Record<string, { bg: string; accent: string }> = {
    Casual: { bg: "#e8e3da", accent: "#c9b99a" },
    Formal: { bg: "#d4dce8", accent: "#8faacb" },
    Party:  { bg: "#ead8e0", accent: "#c99ab0" },
    Gym:    { bg: "#d8e8e0", accent: "#8fc9aa" },
  };
  const p = palettes[styleKey];
  const emoji = styleKey === "Casual" ? "/assets/33.png" : styleKey === "Formal" ? "/assets/34.png" : styleKey === "Party" ? "/assets/35.png" : "/assets/36.png";
  const href = STYLE_ROUTES[styleKey] ?? "/casual";

  return (
    <Link
      href={href}
      className={`relative rounded-2xl overflow-hidden cursor-pointer group ${height} block`}
      style={{ flex, backgroundColor: p.bg }}
    >
      <div className="absolute inset-0 opacity-40" style={{ background: `radial-gradient(ellipse at 80% 50%, ${p.accent} 0%, transparent 70%)` }} />
      <Image
        src={emoji}
        alt={label}
        width={1000}
        height={1000}
        className="object-cover"
      />
      
      <div className="absolute top-5 left-5">
        <span className="text-xl sm:text-2xl font-bold text-black group-hover:underline underline-offset-2 transition-all">{label}</span>
      </div>
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-200 rounded-2xl" />
    </Link>
  );
}
