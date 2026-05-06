"use client";
import { STATS } from "@/data";
import { useApp } from "@/contexts/AppContext";
import Link from "next/link";
import homeSlide from "../public/assets/1.jpg";
import Image from "next/image";


export default function Hero() {
  const { t } = useApp();

  const statLabels = [t.stats.brands, t.stats.products, t.stats.customers];

  return (
    <section className="bg-secondary relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center min-h-[480px] lg:min-h-[560px] py-12 lg:py-0 gap-8 lg:gap-0">
          {/* Left content */}
          <div className="flex-1 z-10 text-center lg:text-left">
            <div className="hidden lg:block absolute top-8 right-[38%] text-4xl select-none">✦</div>

            <h1 className="font-black text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-[1.05] tracking-tight text-foreground mb-5" style={{ fontFamily: "'Integral CF', sans-serif" }}>
              {t.hero.heading1}
              <br />
              {t.hero.heading2}
              <br />
              {t.hero.heading3}
            </h1>
            <p className="text-muted-foreground text-sm sm:text-base max-w-sm mx-auto lg:mx-0 mb-8 leading-relaxed">
              {t.hero.subtitle}
            </p>
            <Link
              href="casual"
              className="inline-block bg-foreground text-background text-sm font-semibold px-8 py-4 rounded-full hover:opacity-90 active:scale-95 transition-all duration-150"
            >
              {t.hero.cta}
            </Link>

            {/* Stats */}
            <div className="flex flex-col sm:flex-row items-center lg:items-start gap-6 sm:gap-10 mt-12 justify-center lg:justify-start">
              {STATS.map((stat, i) => (
                <div
                  key={stat.label}
                  className={`text-center lg:text-left ${
                    i !== 0 ? "sm:border-l sm:border-border sm:pl-10" : ""
                  }`}
                >
                  <p className="text-2xl sm:text-3xl font-black text-foreground">{stat.value}</p>
                  <p className="text-muted-foreground text-xs sm:text-sm mt-0.5">{statLabels[i]}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right — hero image placeholder */}
          <div className="flex-1 flex justify-center lg:justify-end items-end relative w-full max-w-sm lg:max-w-none">
            <div className="absolute bottom-16 left-4 lg:left-0 text-2xl select-none">✦</div>
            <div className="absolute top-4 right-2 text-5xl select-none font-black">✦</div>

            <div className="relative w-[280px] sm:w-[340px] lg:w-[420px] h-[340px] sm:h-[400px] lg:h-[500px]">
              {/* <div className="w-full h-full rounded-t-full bg-gradient-to-b from-muted via-muted/60 to-secondary flex items-end justify-center overflow-hidden">
                <div className="relative flex items-end justify-center w-full h-full">
                  <div className="absolute bottom-0 right-8 lg:right-12">
                    <div className="w-28 lg:w-36 h-64 lg:h-80 bg-gradient-to-b from-muted-foreground/50 to-muted-foreground/80 rounded-t-full opacity-80" />
                  </div>
                  <div className="absolute bottom-0 left-6 lg:left-8">
                    <div className="w-32 lg:w-40 h-72 lg:h-96 bg-gradient-to-b from-muted-foreground/40 to-muted-foreground/70 rounded-t-full" />
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-foreground/10 text-7xl lg:text-9xl font-black select-none">
                    </span>
                  </div>
                </div>
              </div> */}
                <Image src={homeSlide} alt="Hero Image" className="w-full h-auto object-cover" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
