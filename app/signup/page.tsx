"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Eye, EyeOff, UserPlus } from "lucide-react";
import { useApp } from "@/contexts/AppContext";
import Link from "next/link";

const signupSchema = (errors: Record<string, string>) =>
  z
    .object({
      name: z.string().min(2, errors.nameMin),
      email: z.string().email(errors.emailInvalid),
      password: z
        .string()
        .min(8, errors.passwordMin)
        .regex(/[a-zA-Z]/, errors.passwordLetter)
        .regex(/[0-9]/, errors.passwordNumber),
      confirm: z.string(),
    })
    .refine((d) => d.password === d.confirm, {
      message: errors.confirmMismatch,
      path: ["confirm"],
    });

type SignupFields = { name: string; email: string; password: string; confirm: string };

export default function SignupPage() {
  const { t } = useApp();
  const a = t.auth;
  const router = useRouter();
  const [showPw, setShowPw] = useState(false);
  const [showCf, setShowCf] = useState(false);
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFields>({
    resolver: zodResolver(signupSchema(a.errors)),
  });

  const onSubmit = async (data: SignupFields) => {
    setServerError("");
    await new Promise((r) => setTimeout(r, 600));

    // Load existing registered users
    const existing: { name: string; email: string; password: string }[] = JSON.parse(
      localStorage.getItem("shopco_registered_users") || "[]"
    );

    // Check if email already taken
    if (existing.find((u) => u.email === data.email)) {
      setServerError(a.errors.emailTaken);
      return;
    }

    // Save new user to the mock "users DB"
    existing.push({ name: data.name, email: data.email, password: data.password });
    localStorage.setItem("shopco_registered_users", JSON.stringify(existing));

    // Redirect to login — user must now authenticate
    router.push("/login?registered=1");
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

        <h1 className="text-xl font-bold text-foreground text-center mb-1">{a.signup}</h1>
        <p className="text-sm text-muted-foreground text-center mb-6">
          {a.haveAccount}{" "}
          <Link href="/login" className="text-foreground font-semibold hover:underline">
            {a.login}
          </Link>
        </p>

        <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4">
          {/* Name */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-foreground">{a.nameLabel}</label>
            <input
              type="text"
              autoComplete="name"
              placeholder={a.namePlaceholder}
              {...register("name")}
              className="rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-foreground/20 transition"
            />
            {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
          </div>

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
                autoComplete="new-password"
                placeholder={a.passwordPlaceholder}
                {...register("password")}
                className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-foreground/20 transition pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPw((v) => !v)}
                className="absolute inset-y-0 end-3 flex items-center text-muted-foreground hover:text-foreground transition"
              >
                {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {errors.password && <p className="text-xs text-red-500">{errors.password.message}</p>}
          </div>

          {/* Confirm Password */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-foreground">{a.confirmPasswordLabel}</label>
            <div className="relative">
              <input
                type={showCf ? "text" : "password"}
                autoComplete="new-password"
                placeholder={a.passwordPlaceholder}
                {...register("confirm")}
                className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-foreground/20 transition pr-10"
              />
              <button
                type="button"
                onClick={() => setShowCf((v) => !v)}
                className="absolute inset-y-0 end-3 flex items-center text-muted-foreground hover:text-foreground transition"
              >
                {showCf ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {errors.confirm && <p className="text-xs text-red-500">{errors.confirm.message}</p>}
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
            <UserPlus size={16} />
            {isSubmitting ? "..." : a.signupCta}
          </button>
        </form>
      </div>
    </div>
  );
}
