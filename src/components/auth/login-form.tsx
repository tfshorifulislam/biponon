"use client";

import {
  type FormEvent,
  useState,
  useSyncExternalStore,
} from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  CircleAlert,
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  ShieldCheck,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLanguage } from "@/lib/i18n/languageContext";
import { cn } from "@/lib/utils";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const REMEMBERED_EMAIL_KEY = "biponon_remembered_email";
const REMEMBERED_EMAIL_EVENT = "biponon_remembered_email_change";

function subscribeRememberedEmail(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("storage", callback);
  window.addEventListener(REMEMBERED_EMAIL_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(REMEMBERED_EMAIL_EVENT, callback);
  };
}

function getRememberedEmailSnapshot() {
  try {
    return localStorage.getItem(REMEMBERED_EMAIL_KEY) ?? "";
  } catch {
    return "";
  }
}

function getRememberedEmailServerSnapshot() {
  return "";
}

interface FieldErrors {
  email?: string;
  password?: string;
}

function AuthBrand() {
  return (
    <Link
      href="/"
      aria-label="Biponon home"
      className="group inline-flex items-center rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      <Image
        src="/logo2.png"
        alt="Biponon"
        width={130}
        height={30}
        priority
        className="block h-6.5 w-auto object-contain transition-transform duration-200 group-hover:scale-[1.02] sm:h-7 dark:hidden"
      />
      <Image
        src="/logo.png"
        alt="Biponon"
        width={130}
        height={30}
        priority
        className="hidden h-6.5 w-auto object-contain transition-transform duration-200 group-hover:scale-[1.02] sm:h-7 dark:block"
      />
    </Link>
  );
}

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="size-4 shrink-0">
      <path
        fill="#4285F4"
        d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47a5.54 5.54 0 0 1-2.4 3.63v3h3.86c2.26-2.09 3.56-5.17 3.56-8.87z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96H1.29v3.09A11.99 11.99 0 0 0 12 24z"
      />
      <path
        fill="#FBBC05"
        d="M5.27 14.29a7.2 7.2 0 0 1 0-4.58V6.62H1.29a12 12 0 0 0 0 10.76l3.98-3.09z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0A11.99 11.99 0 0 0 1.29 6.62l3.98 3.09C6.22 6.86 8.87 4.75 12 4.75z"
      />
    </svg>
  );
}

export function LoginForm() {
  const { t } = useLanguage();

  const rememberedEmail = useSyncExternalStore(
    subscribeRememberedEmail,
    getRememberedEmailSnapshot,
    getRememberedEmailServerSnapshot
  );

  const [emailInput, setEmailInput] = useState<string | null>(null);
  const email = emailInput ?? rememberedEmail;
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleEmailChange = (value: string) => {
    setEmailInput(value);
    if (fieldErrors.email) {
      setFieldErrors((current) => ({ ...current, email: undefined }));
    }
    if (isSuccess) setIsSuccess(false);
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    if (fieldErrors.password) {
      setFieldErrors((current) => ({ ...current, password: undefined }));
    }
    if (isSuccess) setIsSuccess(false);
  };

  const validate = (): FieldErrors => {
    const errors: FieldErrors = {};
    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      errors.email = t("auth.validation.emailRequired");
    } else if (!EMAIL_PATTERN.test(trimmedEmail)) {
      errors.email = t("auth.validation.emailInvalid");
    }

    if (!password) {
      errors.password = t("auth.validation.passwordRequired");
    } else if (password.length < 6) {
      errors.password = t("auth.validation.passwordMin");
    }

    return errors;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSubmitting) return;

    const errors = validate();
    setFieldErrors(errors);

    if (Object.keys(errors).length > 0) {
      if (errors.email) {
        document.getElementById("email")?.focus();
      } else if (errors.password) {
        document.getElementById("password")?.focus();
      }
      return;
    }

    setIsSubmitting(true);

    try {
      if (remember) {
        localStorage.setItem(REMEMBERED_EMAIL_KEY, email.trim());
      } else {
        localStorage.removeItem(REMEMBERED_EMAIL_KEY);
      }
      window.dispatchEvent(new Event(REMEMBERED_EMAIL_EVENT));
    } catch {
      // Storage unavailable
    }

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 600);
  };

  return (
    <div className="mx-auto flex w-full max-w-sm flex-col">
      <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2">
        <AuthBrand />
        <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-2.5 py-0.5 text-[10px] font-semibold tracking-wider text-primary uppercase dark:border-primary/30 dark:bg-primary/15">
          <span className="size-1.5 rounded-full bg-primary animate-pulse" />
          {t("auth.badge")}
        </span>
      </div>

      <div className="mt-4 sm:mt-5">
        <h1 className="font-heading text-xl font-extrabold tracking-tight text-foreground sm:text-2xl xl:text-3xl">
          {t("auth.loginTitle")}
        </h1>
        <p className="mt-1 text-xs leading-relaxed text-muted-foreground sm:text-sm">
          {t("auth.loginSubtitle")}
        </p>
      </div>

      {isSuccess ? (
        <div
          role="status"
          aria-live="polite"
          className="mt-3.5 flex items-center gap-2.5 rounded-xl border border-primary/25 bg-primary/10 p-2.5 text-xs font-medium text-primary dark:border-primary/35 dark:bg-primary/15 sm:p-3"
        >
          <CheckCircle2 className="size-4 shrink-0 text-primary" />
          <span>{t("auth.validation.successLogin")}</span>
        </div>
      ) : null}

      <form
        onSubmit={handleSubmit}
        noValidate
        aria-busy={isSubmitting}
        className="mt-4 flex flex-col gap-3.5 sm:mt-5 sm:gap-4"
      >
        <div className="space-y-1">
          <Label htmlFor="email" className="text-xs font-semibold text-foreground">
            {t("auth.fields.email")}
          </Label>
          <div className="relative">
            <Mail
              aria-hidden
              className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground/70"
            />
            <Input
              id="email"
              name="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              placeholder={t("auth.fields.emailPlaceholder")}
              value={email}
              onChange={(event) => handleEmailChange(event.target.value)}
              onBlur={() => {
                const errors = validate();
                setFieldErrors((current) => ({
                  ...current,
                  email: errors.email,
                }));
              }}
              aria-invalid={Boolean(fieldErrors.email)}
              aria-describedby={fieldErrors.email ? "email-error" : undefined}
              disabled={isSubmitting}
              className="h-10 rounded-xl border-border/80 bg-background/50 pl-10 text-xs sm:text-sm transition-all focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/25 sm:h-10.5"
            />
          </div>
          {fieldErrors.email ? (
            <p
              id="email-error"
              role="alert"
              className="flex items-center gap-1.5 text-xs font-medium text-destructive"
            >
              <CircleAlert className="size-3 shrink-0" />
              {fieldErrors.email}
            </p>
          ) : null}
        </div>

        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <Label htmlFor="password" className="text-xs font-semibold text-foreground">
              {t("auth.fields.password")}
            </Label>
            <Link
              href="/forgot-password"
              className="text-xs font-medium text-primary underline-offset-4 transition-colors hover:text-primary/80 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
            >
              {t("auth.buttons.forgotPassword")}
            </Link>
          </div>
          <div className="relative">
            <Lock
              aria-hidden
              className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground/70"
            />
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              placeholder={t("auth.fields.passwordPlaceholder")}
              value={password}
              onChange={(event) => handlePasswordChange(event.target.value)}
              onBlur={() => {
                const errors = validate();
                setFieldErrors((current) => ({
                  ...current,
                  password: errors.password,
                }));
              }}
              aria-invalid={Boolean(fieldErrors.password)}
              aria-describedby={
                fieldErrors.password ? "password-error" : undefined
              }
              disabled={isSubmitting}
              className="h-10 rounded-xl border-border/80 bg-background/50 pr-11 pl-10 text-xs sm:text-sm transition-all focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/25 sm:h-10.5"
            />
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              onClick={() => setShowPassword((current) => !current)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              aria-pressed={showPassword}
              disabled={isSubmitting}
              className="absolute top-1/2 right-1.5 -translate-y-1/2 text-muted-foreground/80 hover:bg-muted hover:text-foreground disabled:opacity-50"
            >
              {showPassword ? (
                <EyeOff className="size-4" />
              ) : (
                <Eye className="size-4" />
              )}
            </Button>
          </div>
          {fieldErrors.password ? (
            <p
              id="password-error"
              role="alert"
              className="flex items-center gap-1.5 text-xs font-medium text-destructive"
            >
              <CircleAlert className="size-3 shrink-0" />
              {fieldErrors.password}
            </p>
          ) : null}
        </div>

        <div className="flex items-center gap-2 pt-0.5">
          <Checkbox
            id="remember"
            name="remember"
            checked={remember}
            onCheckedChange={setRemember}
            disabled={isSubmitting}
            className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
          />
          <Label
            htmlFor="remember"
            className="cursor-pointer text-xs font-medium text-muted-foreground select-none"
          >
            {t("auth.fields.rememberMe")}
          </Label>
        </div>

        <Button
          type="submit"
          size="lg"
          disabled={isSubmitting}
          className={cn(
            "group/btn mt-1 h-10 w-full rounded-xl text-xs sm:text-sm font-semibold text-white shadow-[0_12px_24px_-10px_rgba(0,151,107,0.7)] [background-image:var(--brand-gradient)] transition-all duration-200 hover:brightness-105 hover:shadow-[0_16px_32px_-10px_rgba(0,151,107,0.8)] active:scale-[0.99] disabled:opacity-70 sm:h-10.5"
          )}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              {t("auth.buttons.signingIn")}
            </>
          ) : (
            <>
              {t("auth.buttons.login")}
              <ArrowRight className="size-4 transition-transform duration-200 group-hover/btn:translate-x-0.5" />
            </>
          )}
        </Button>
      </form>

      <div className="my-3.5 flex items-center gap-3 sm:my-4">
        <span aria-hidden className="h-px flex-1 bg-border/70" />
        <span className="text-[10px] font-semibold tracking-[0.14em] text-muted-foreground uppercase">
          {t("auth.buttons.orContinueWith")}
        </span>
        <span aria-hidden className="h-px flex-1 bg-border/70" />
      </div>

      <Button
        type="button"
        variant="outline"
        size="lg"
        onClick={() => {}}
        disabled={isSubmitting}
        className="h-10 w-full rounded-xl border-border/80 bg-background/60 text-xs font-semibold text-foreground shadow-xs transition-colors hover:bg-muted sm:h-10.5 dark:bg-card/40 dark:hover:bg-card/70"
      >
        <GoogleIcon />
        <span>{t("auth.buttons.continueWithGoogle")}</span>
      </Button>

      <p className="mt-4 text-center text-xs text-muted-foreground sm:mt-5">
        {t("auth.buttons.noAccount")}{" "}
        <Link
          href="/create-website"
          className="font-semibold text-primary underline-offset-4 transition-colors hover:text-primary/80 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
        >
          {t("auth.buttons.signUpLink")}
        </Link>
      </p>

      <div className="mt-5 flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5 text-[10px] font-medium text-muted-foreground/80 sm:mt-6">
        <span className="inline-flex items-center gap-1.5">
          <ShieldCheck className="size-3 text-primary" />
          {t("auth.trust.encrypted256")}
        </span>
        <span aria-hidden className="size-1 rounded-full bg-border" />
        <span className="inline-flex items-center gap-1.5">
          <Lock className="size-3 text-primary" />
          {t("auth.trust.secureSignIn")}
        </span>
      </div>
    </div>
  );
}
