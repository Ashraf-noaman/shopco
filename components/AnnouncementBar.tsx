"use client";
import { useState } from "react";
import { X } from "lucide-react";
import { useApp } from "@/contexts/AppContext";

export default function AnnouncementBar() {
  const [visible, setVisible] = useState(true);
  const { t } = useApp();
  if (!visible) return null;

  return (
    <div className="bg-black text-white text-xs sm:text-sm py-2.5 px-4 flex items-center justify-center relative">
      <p className="text-center">
        {t.announcement.text}{" "}
        <a href="#" className="font-semibold underline underline-offset-2 hover:opacity-80 transition-opacity">
          {t.announcement.cta}
        </a>
      </p>
      <button
        onClick={() => setVisible(false)}
        className="absolute right-4 top-1/2 -translate-y-1/2 hover:opacity-70 transition-opacity"
        aria-label="Close announcement"
      >
        <X size={14} />
      </button>
    </div>
  );
}
