"use client";

import { useState } from "react";
import Link from "next/link";
import { Store, User, Mail, Phone, Lock, ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/i18n/languageContext";

export default function CreateWebsitePage() {
  const { t } = useLanguage();
  const [storeName, setStoreName] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!storeName.trim()) {
      newErrors.storeName = t("auth.validation.storeNameRequired");
    }

    if (!name.trim()) {
      newErrors.name = t("auth.validation.nameRequired");
    }

    if (!email.trim()) {
      newErrors.email = t("auth.validation.emailRequired");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = t("auth.validation.emailInvalid");
    }

    if (!phone.trim()) {
      newErrors.phone = t("auth.validation.phoneRequired");
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
      <div className="w-full max-w-lg rounded-3xl border border-border/70 bg-card p-8 shadow-sm backdrop-blur dark:border-white/10 dark:bg-card/60">
        <div className="text-center">
          <h1 className="font-heading text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            {t("auth.createWebsiteTitle")}
          </h1>
          <p className="mt-2 text-xs text-muted-foreground sm:text-sm">
            {t("auth.createWebsiteSubtitle")}
          </p>
        </div>

        {submitted ? (
          <div className="mt-8 rounded-2xl border border-primary/30 bg-primary/10 p-6 text-center text-primary">
            <CheckCircle2 className="mx-auto size-10" />
            <p className="mt-3 font-semibold">{t("auth.validation.successCreate")}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 space-y-4" noValidate>
            <div>
              <label
                htmlFor="storeName"
                className="block text-xs font-medium text-foreground sm:text-sm"
              >
                {t("auth.fields.storeName")}
              </label>
              <div className="relative mt-1">
                <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">
                  <Store className="size-4" />
                </span>
                <input
                  id="storeName"
                  type="text"
                  value={storeName}
                  onChange={(e) => setStoreName(e.target.value)}
                  placeholder={t("auth.fields.storeNamePlaceholder")}
                  className="w-full rounded-xl border border-input bg-background py-2.5 pl-10 pr-4 text-xs text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:text-sm"
                />
              </div>
              {errors.storeName && (
                <p className="mt-1 text-xs text-destructive">{errors.storeName}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="name"
                className="block text-xs font-medium text-foreground sm:text-sm"
              >
                {t("auth.fields.name")}
              </label>
              <div className="relative mt-1">
                <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">
                  <User className="size-4" />
                </span>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={t("auth.fields.namePlaceholder")}
                  className="w-full rounded-xl border border-input bg-background py-2.5 pl-10 pr-4 text-xs text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:text-sm"
                />
              </div>
              {errors.name && (
                <p className="mt-1 text-xs text-destructive">{errors.name}</p>
              )}
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="email"
                  className="block text-xs font-medium text-foreground sm:text-sm"
                >
                  {t("auth.fields.email")}
                </label>
                <div className="relative mt-1">
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
                  <p className="mt-1 text-xs text-destructive">{errors.email}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-xs font-medium text-foreground sm:text-sm"
                >
                  {t("auth.fields.phone")}
                </label>
                <div className="relative mt-1">
                  <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">
                    <Phone className="size-4" />
                  </span>
                  <input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder={t("auth.fields.phonePlaceholder")}
                    className="w-full rounded-xl border border-input bg-background py-2.5 pl-10 pr-4 text-xs text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:text-sm"
                  />
                </div>
                {errors.phone && (
                  <p className="mt-1 text-xs text-destructive">{errors.phone}</p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-xs font-medium text-foreground sm:text-sm"
              >
                {t("auth.fields.password")}
              </label>
              <div className="relative mt-1">
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
                <p className="mt-1 text-xs text-destructive">{errors.password}</p>
              )}
            </div>

            <Button
              type="submit"
              size="lg"
              className="mt-2 w-full rounded-xl bg-primary text-white shadow-md transition-all hover:brightness-105"
            >
              {t("auth.buttons.createWebsite")}
              <ArrowRight className="size-4" />
            </Button>

            <div className="text-center text-xs text-muted-foreground">
              {t("auth.buttons.haveAccount")}{" "}
              <Link
                href="/login"
                className="font-medium text-primary hover:underline"
              >
                {t("auth.buttons.signInLink")}
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
