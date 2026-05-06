"use client";
import { useState, useRef, useEffect } from "react";
import {
  Search,
  ShoppingCart,
  User,
  Menu,
  X,
  ChevronDown,
  Sun,
  Moon,
  Globe,
  LogOut,
  Package,
} from "lucide-react";
import { useApp } from "@/contexts/AppContext";
import Link from "next/link";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const accountRef = useRef<HTMLDivElement>(null);
  const { t, theme, toggleTheme, toggleLang, user, logout, cartCount, orders } =
    useApp();
  const a = t.auth;

  const NAV_LINKS = [
    { label: t.nav.shop, href: "/casual", hasDropdown: true },
    { label: t.nav.onSale, href: "#" },
    { label: t.nav.newArrivals, href: "/casual" },
    { label: t.nav.brands, href: "#" },
  ];

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (
        accountRef.current &&
        !accountRef.current.contains(e.target as Node)
      ) {
        setAccountOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleLogout = () => {
    logout();
    setAccountOpen(false);
  };

  return (
    <header className="bg-background border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-1 rounded-md hover:bg-secondary transition"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          {/* Logo */}
          <Link
            href="/"
            className="text-2xl font-black tracking-tight text-foreground shrink-0"
            style={{ fontFamily: "'Integral CF', sans-serif" }}
          >
            SHOP.<span>CO</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="flex items-center gap-0.5 text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
              >
                {link.label}
                {link.hasDropdown && (
                  <ChevronDown size={14} className="mt-0.5" />
                )}
              </Link>
            ))}
          </nav>

          {/* Right icons */}
          <div className="flex items-center gap-2 flex-1 lg:flex-none justify-end">

            {/* Search bar desktop */}
            <div className="hidden sm:flex items-center bg-secondary rounded-full px-4 py-2 gap-2 w-full max-w-xs lg:max-w-sm">
              <Search size={16} className="text-muted-foreground shrink-0" />
              <input
                type="text"
                placeholder={t.nav.searchPlaceholder}
                className="bg-transparent text-sm outline-none w-full placeholder:text-muted-foreground text-foreground"
              />
            </div>

            {/* Search icon mobile */}
            <button
              className="sm:hidden p-1 hover:bg-secondary rounded-full transition"
              aria-label="Search"
            >
              <Search size={20} />
            </button>

            {/* Cart */}
            <Link
              href={user ? "/cart" : "/login"}
              className="p-1 hover:bg-secondary rounded-full transition relative"
              aria-label="Cart"
            >
              <ShoppingCart size={20} />
              {user && cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-foreground text-background text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              )}
            </Link>

            {/* USER (DESKTOP ONLY FIXED) */}
            {user ? (
              <div className="relative" ref={accountRef}>
                <button
                  onClick={() => setAccountOpen((v) => !v)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border hover:bg-secondary transition text-sm font-medium"
                  aria-label={a.account}
                >
                  <User size={16} />
                  <span className="hidden sm:inline max-w-[96px] truncate">
                    {user.name.split(" ")[0]}
                  </span>
                  <ChevronDown
                    size={13}
                    className={`transition-transform ${accountOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {accountOpen && (
                  <div className="absolute end-0 mt-2 w-52 bg-background border border-border rounded-xl shadow-xl py-1 z-50">
                    <div className="px-4 py-2 border-b border-border">
                      <p className="text-xs text-muted-foreground">
                        {a.greeting},
                      </p>
                      <p className="text-sm font-semibold text-foreground truncate">
                        {user.name}
                      </p>
                    </div>

                    <Link
                      href="#"
                      onClick={() => setAccountOpen(false)}
                      className="flex items-center gap-2 px-4 py-2.5 text-sm text-foreground hover:bg-secondary transition"
                    >
                      <User size={15} /> {a.myAccount}
                    </Link>

                    <Link
                      href="/orders"
                      onClick={() => setAccountOpen(false)}
                      className="flex items-center justify-between px-4 py-2.5 text-sm text-foreground hover:bg-secondary transition"
                    >
                      <span className="flex items-center gap-2">
                        <Package size={15} /> {a.orders}
                      </span>
                      {orders.length > 0 && (
                        <span className="bg-foreground text-background text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                          {orders.length}
                        </span>
                      )}
                    </Link>

                    <div className="border-t border-border mt-1">
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-500 hover:bg-secondary transition"
                      >
                        <LogOut size={15} /> {a.logout}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden sm:flex items-center gap-3">
                <Link
                  href="/login"
                  className="px-4 py-2 text-sm font-medium text-foreground border border-border rounded-full hover:bg-secondary transition whitespace-nowrap"
                >
                  {a.login}
                </Link>

                <Link
                  href="/signup"
                  className="px-4 py-2 text-sm font-medium bg-foreground text-background rounded-full hover:opacity-90 transition whitespace-nowrap"
                >
                  {a.signup}
                </Link>
              </div>
            )}

            {/* USER ICON MOBILE FIX (was causing issue) */}
            {user && (
              <button
                onClick={() => setAccountOpen((v) => !v)}
                className="hidden lg:block p-1 hover:bg-secondary rounded-full transition"
                aria-label={a.account}
              >
                <User size={20} />
              </button>
            )}

            {!user && (
              <Link
                href="/login"
                className="hidden lg:block p-1 hover:bg-secondary rounded-full transition"
                aria-label={a.login}
              >
                <User size={20} />
              </Link>
            )}

            {/* Theme + Language */}
            <div className="hidden lg:flex items-center gap-2">
              <button
                onClick={toggleTheme}
                className="p-1.5 hover:bg-secondary rounded-full transition"
                aria-label={theme === "dark" ? t.nav.lightMode : t.nav.darkMode}
                title={theme === "dark" ? t.nav.lightMode : t.nav.darkMode}
              >
                {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
              </button>

              <button
                onClick={toggleLang}
                className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold border border-border hover:bg-secondary transition"
                aria-label="Switch language"
              >
                <Globe size={13} />
                {t.nav.switchLang}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-background border-t border-border px-4 py-4 flex flex-col gap-4">
          <div className="flex items-center bg-secondary rounded-full px-4 py-2 gap-2">
            <Search size={16} className="text-muted-foreground shrink-0" />
            <input
              type="text"
              placeholder={t.nav.searchPlaceholder}
              className="bg-transparent text-sm outline-none w-full placeholder:text-muted-foreground text-foreground"
            />
          </div>

          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="flex items-center justify-between text-base font-medium text-foreground hover:text-foreground/70 transition-colors py-1 border-b border-border last:border-0"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
              {link.hasDropdown && <ChevronDown size={16} />}
            </Link>
          ))}

          <Link
            href={user ? "/cart" : "/login"}
            onClick={() => setMobileOpen(false)}
            className="flex items-center justify-between text-base font-medium text-foreground hover:text-foreground/70 transition-colors py-1 border-b border-border"
          >
            <span className="flex items-center gap-2">
              <ShoppingCart size={18} /> Cart
            </span>
          </Link>
        </div>
      )}
    </header>
  );
}
