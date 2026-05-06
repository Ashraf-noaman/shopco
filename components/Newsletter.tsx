"use client";
import { useState } from "react";
import { Mail } from "lucide-react";
import { useApp } from "@/contexts/AppContext";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const { t } = useApp();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
      setEmail("");
    }
  };

  return (
    <section className="py-10 sm:py-14 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-foreground rounded-3xl px-6 sm:px-12 lg:px-16 py-10 sm:py-14 flex flex-col lg:flex-row items-center justify-between gap-8">
          <h2
            className="text-background text-3xl sm:text-4xl lg:text-5xl font-black leading-tight max-w-md"
            style={{ fontFamily: "'Integral CF', sans-serif" }}
          >
            {t.newsletter.title}
          </h2>

          <div className="w-full max-w-sm flex flex-col gap-3">
            {submitted ? (
              <p className="text-background font-semibold text-center py-4">
                {t.newsletter.subscribed}
              </p>
            ) : (
              <>
                <form onSubmit={handleSubmit} className="flex items-center bg-background rounded-full px-4 py-3 gap-3">
                  <Mail size={18} className="text-muted-foreground shrink-0" />
                  <input
                    type="email"
                    required
                    placeholder={t.newsletter.emailPlaceholder}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground text-foreground"
                  />
                </form>
                <button
                  onClick={handleSubmit}
                  type="button"
                  className="w-full bg-background text-foreground font-semibold text-sm py-3 rounded-full hover:opacity-90 active:scale-95 transition-all duration-150"
                >
                  {t.newsletter.subscribe}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
