"use client";

import { useState } from "react";
import Link from "next/link";
import { Lock, Mail, ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/i18n/languageContext";

export default function LoginPage() {
  const { t } = useLanguage();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const newErrors: { email?: string; password?: string } = {};

    if (!email.trim()) {
      newErrors.email = t("auth.validation.emailRequired");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = t("auth.validation.emailInvalid");
    }

    if (!password) {
      newErrors.password = t("auth.validation.passwordRequired");
    } else if (password.length < 6) {
      newErrors.password = t("auth.validation.passwordMin");
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setSubmitted(true);
    }
  }

  return (
    <div className="flex min-h-[calc(100vh-10rem)] w-full items-center justify-center px-4 py-24 sm:px-6 lg:px-8">
      <div className="w-full max-w-md rounded-3xl border border-border/70 bg-card p-8 shadow-sm backdrop-blur dark:border-white/10 dark:bg-card/60">
        <div className="text-center">
          <h1 className="font-heading text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            {t("auth.loginTitle")}
          </h1>
          <p className="mt-2 text-xs text-muted-foreground sm:text-sm">
            {t("auth.loginSubtitle")}
          </p>
        </div>

        {submitted ? (
          <div className="mt-8 rounded-2xl border border-primary/30 bg-primary/10 p-6 text-center text-primary">
            <CheckCircle2 className="mx-auto size-10" />
            <p className="mt-3 font-semibold">{t("auth.validation.successLogin")}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 space-y-5" noValidate>
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-medium text-foreground sm:text-sm"
              >
                {t("auth.fields.email")}
              </label>
              <div className="relative mt-1.5">
                <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">
                  <Mail className="size-4" />
                </span>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t("auth.fields.emailPlaceholder")}
                  className="w-full rounded-xl border border-input bg-background py-2.5 pl-10 pr-4 text-xs text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:text-sm"
                />
              </div>
              {errors.email && (
                <p className="mt-1.5 text-xs text-destructive">{errors.email}</p>
              )}
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-xs font-medium text-foreground sm:text-sm"
                >
                  {t("auth.fields.password")}
                </label>
                <Link
                  href="/login"
                  className="text-xs text-primary hover:underline"
                >
                  {t("auth.buttons.forgotPassword")}
                </Link>
              </div>
              <div className="relative mt-1.5">
                <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">
                  <Lock className="size-4" />
                </span>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={t("auth.fields.passwordPlaceholder")}
                  className="w-full rounded-xl border border-input bg-background py-2.5 pl-10 pr-4 text-xs text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:text-sm"
                />
              </div>
              {errors.password && (
                <p className="mt-1.5 text-xs text-destructive">
                  {errors.password}
                </p>
              )}
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full rounded-xl bg-primary text-white shadow-md transition-all hover:brightness-105"
            >
              {t("auth.buttons.login")}
              <ArrowRight className="size-4" />
            </Button>

            <div className="text-center text-xs text-muted-foreground">
              {t("auth.buttons.noAccount")}{" "}
              <Link
                href="/create-website"
                className="font-medium text-primary hover:underline"
              >
                {t("auth.buttons.signUpLink")}
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
