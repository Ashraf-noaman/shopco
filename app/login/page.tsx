"use client";
import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Eye, EyeOff, LogIn, CheckCircle } from "lucide-react";
import { useApp } from "@/contexts/AppContext";
import Link from "next/link";

const loginSchema = (errors: Record<string, string>) =>
  z.object({
    email: z.string().email(errors.emailInvalid),
    password: z
      .string()
      .min(8, errors.passwordMin)
      .regex(/[a-zA-Z]/, errors.passwordLetter)
      .regex(/[0-9]/, errors.passwordNumber),
  });

type LoginFields = { email: string; password: string };

// Built-in demo account
const DEMO_USER = { email: "demo@shop.co", password: "password1", name: "Demo User" };

function LoginForm() {
  const { t, login } = useApp();
  const a = t.auth;
  const router = useRouter();
  const searchParams = useSearchParams();
  const justRegistered = searchParams.get("registered") === "1";

  const [showPw, setShowPw] = useState(false);
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFields>({
    resolver: zodResolver(loginSchema(a.errors)),
  });

  const onSubmit = async (data: LoginFields) => {
    setServerError("");
    await new Promise((r) => setTimeout(r, 600));

    // 1. Check demo account
    if (data.email === DEMO_USER.email && data.password === DEMO_USER.password) {
      login({ name: DEMO_USER.name, email: DEMO_USER.email });
      router.push("/");
      return;
    }

    // 2. Check registered users saved during signup
    const registered: { name: string; email: string; password: string }[] = JSON.parse(
      localStorage.getItem("shopco_registered_users") || "[]"
    );
    const match = registered.find(
      (u) => u.email === data.email && u.password === data.password
    );

    if (match) {
      login({ name: match.name, email: match.email });
      router.push("/");
    } else {
      setServerError(a.errors.loginFailed);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md bg-secondary rounded-2xl shadow-lg p-8">
        {/* Logo */}
        <Link
          href="/"
          className="block text-center text-2xl font-black tracking-tight text-foreground mb-6"
          style={{ fontFamily: "'Integral CF', sans-serif" }}
        >
          SHOP.<span>CO</span>
        </Link>

        <h1 className="text-xl font-bold text-foreground text-center mb-1">{a.login}</h1>
        <p className="text-sm text-muted-foreground text-center mb-6">
          {a.noAccount}{" "}
          <Link href="/signup" className="text-foreground font-semibold hover:underline">
            {a.signup}
          </Link>
        </p>

        {/* Success banner after signup */}
        {justRegistered && (
          <div className="flex items-center gap-2 bg-green-500/10 border border-green-500/30 text-green-500 rounded-lg px-4 py-3 mb-4 text-sm">
            <CheckCircle size={16} className="shrink-0" />
            <span>{a.registeredSuccess}</span>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4">
          {/* Email */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-foreground">{a.emailLabel}</label>
            <input
              type="email"
              autoComplete="email"
              placeholder={a.emailPlaceholder}
              {...register("email")}
              className="rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-foreground/20 transition"
            />
            {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-foreground">{a.passwordLabel}</label>
            <div className="relative">
              <input
                type={showPw ? "text" : "password"}
                autoComplete="current-password"
                placeholder={a.passwordPlaceholder}
                {...register("password")}
                className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-foreground/20 transition pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPw((v) => !v)}
                className="absolute inset-y-0 end-3 flex items-center text-muted-foreground hover:text-foreground transition"
                aria-label="Toggle password visibility"
              >
                {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {errors.password && <p className="text-xs text-red-500">{errors.password.message}</p>}
          </div>

          {/* Server error */}
          {serverError && (
            <p className="text-xs text-red-500 bg-red-500/10 rounded-lg px-3 py-2">{serverError}</p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center justify-center gap-2 bg-foreground text-background font-semibold rounded-full py-3 text-sm hover:opacity-90 active:scale-[0.98] transition disabled:opacity-50 mt-1"
          >
            <LogIn size={16} />
            {isSubmitting ? "..." : a.loginCta}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
