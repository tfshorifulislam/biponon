"use client";

import {
  type FormEvent,
  useState,
  useSyncExternalStore,
} from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
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
import {
  AuthRequestError,
  getGoogleSignInUrl,
  signInWithEmail,
} from "@/lib/auth/client";
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

function validateFields(email: string, password: string): FieldErrors {
  const errors: FieldErrors = {};

  if (!email.trim()) {
    errors.email = "Email address is required.";
  } else if (!EMAIL_PATTERN.test(email.trim())) {
    errors.email = "Please enter a valid email address.";
  }

  if (!password) {
    errors.password = "Password is required.";
  } else if (password.length < 6) {
    errors.password = "Password must be at least 6 characters.";
  }

  return errors;
}

function AuthBrand() {
  return (
    <Link
      href="/"
      aria-label="Biponon home"
      className="group inline-flex items-center gap-2.5 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      <span className="brand-gradient relative grid size-10 place-items-center overflow-hidden rounded-2xl shadow-[0_10px_24px_-12px_rgba(0,151,107,0.85)] transition-transform duration-200 group-hover:scale-[1.03]">
        <span className="font-heading relative z-10 text-[1.6rem] leading-none font-black tracking-tighter text-white">
          b
        </span>
        <span
          aria-hidden
          className="absolute -right-3 -bottom-3 size-8 rounded-full bg-white/30 blur-lg"
        />
      </span>
      <span className="flex flex-col">
        <span className="font-heading text-[1.35rem] leading-none font-extrabold tracking-tight text-foreground">
          biponon
        </span>
        <span className="mt-1 text-[9px] font-semibold tracking-[0.2em] text-muted-foreground uppercase">
          Merchant portal
        </span>
      </span>
    </Link>
  );
}

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="size-4">
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
  const router = useRouter();
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
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const clearFormError = () => {
    if (formError) setFormError(null);
  };

  const handleEmailChange = (value: string) => {
    setEmailInput(value);
    clearFormError();
    if (fieldErrors.email) {
      setFieldErrors((current) => ({ ...current, email: undefined }));
    }
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    clearFormError();
    if (fieldErrors.password) {
      setFieldErrors((current) => ({ ...current, password: undefined }));
    }
  };

  const focusInvalidField = (errors: FieldErrors) => {
    if (typeof document === "undefined") return;
    if (errors.email) {
      document.getElementById("email")?.focus();
    } else if (errors.password) {
      document.getElementById("password")?.focus();
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSubmitting) return;

    const errors = validateFields(email, password);
    setFieldErrors(errors);

    if (Object.keys(errors).length > 0) {
      setFormError(null);
      focusInvalidField(errors);
      return;
    }

    setIsSubmitting(true);
    setFormError(null);

    try {
      const result = await signInWithEmail({
        email: email.trim(),
        password,
        remember,
      });

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

      router.push(result.redirectTo);
      router.refresh();
    } catch (error) {
      setFormError(
        error instanceof AuthRequestError
          ? error.message
          : "Something went wrong while signing in. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignIn = async () => {
    if (isSubmitting || isGoogleLoading) return;

    setIsGoogleLoading(true);
    setFormError(null);

    try {
      const url = await getGoogleSignInUrl();
      window.location.assign(url);
    } catch (error) {
      setFormError(
        error instanceof AuthRequestError
          ? error.message
          : "Google sign-in is unavailable right now."
      );
      setIsGoogleLoading(false);
    }
  };

  return (
    <div className="mx-auto flex w-full max-w-sm flex-col">
      <AuthBrand />

      <div className="mt-10">
        <span className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/10 px-3 py-1 text-[10px] font-semibold tracking-[0.12em] text-primary uppercase dark:border-primary/25 dark:bg-primary/15">
          <span className="size-1.5 rounded-full bg-brand-secondary" />
          Secure merchant access
        </span>

        <h1 className="font-heading mt-5 text-3xl font-extrabold tracking-tight text-foreground sm:text-[2.15rem]">
          Welcome Back
        </h1>
        <p className="mt-3 max-w-[22rem] text-sm leading-relaxed text-muted-foreground">
          Sign in to your account and continue growing your online business.
        </p>
      </div>

      {formError ? (
        <div
          id="login-error"
          role="alert"
          aria-live="polite"
          className="mt-6 flex items-start gap-2.5 rounded-xl border border-destructive/25 bg-destructive/10 p-3 text-xs leading-relaxed text-destructive dark:border-destructive/35 dark:bg-destructive/15"
        >
          <CircleAlert className="mt-0.5 size-4 shrink-0" />
          <span>{formError}</span>
        </div>
      ) : null}

      <form
        onSubmit={handleSubmit}
        noValidate
        aria-busy={isSubmitting}
        className="mt-7 flex flex-col gap-5"
      >
        <div className="space-y-2">
          <Label htmlFor="email">Email address</Label>
          <div className="relative">
            <Mail
              aria-hidden
              className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground/80"
            />
            <Input
              id="email"
              name="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={email}
              onChange={(event) => handleEmailChange(event.target.value)}
              onBlur={() => {
                const errors = validateFields(email, password);
                setFieldErrors((current) => ({
                  ...current,
                  email: errors.email,
                }));
              }}
              aria-invalid={Boolean(fieldErrors.email)}
              aria-describedby={fieldErrors.email ? "email-error" : undefined}
              disabled={isSubmitting}
              className="pl-10"
            />
          </div>
          {fieldErrors.email ? (
            <p
              id="email-error"
              role="alert"
              className="flex items-center gap-1.5 text-xs font-medium text-destructive"
            >
              <CircleAlert className="size-3" />
              {fieldErrors.email}
            </p>
          ) : null}
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Lock
              aria-hidden
              className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground/80"
            />
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              placeholder="Enter your password"
              value={password}
              onChange={(event) => handlePasswordChange(event.target.value)}
              onBlur={() => {
                const errors = validateFields(email, password);
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
              className="pr-11 pl-10"
            />
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              onClick={() => setShowPassword((current) => !current)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              aria-pressed={showPassword}
              disabled={isSubmitting}
              className="absolute top-1/2 right-1.5 -translate-y-1/2 text-muted-foreground hover:bg-muted hover:text-foreground disabled:opacity-50"
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
              <CircleAlert className="size-3" />
              {fieldErrors.password}
            </p>
          ) : null}
        </div>

        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Checkbox
              id="remember"
              name="remember"
              checked={remember}
              onCheckedChange={setRemember}
              disabled={isSubmitting}
            />
            <Label
              htmlFor="remember"
              className="cursor-pointer text-xs font-medium text-muted-foreground"
            >
              Remember me
            </Label>
          </div>

          <Link
            href="/forgot-password"
            className="text-xs font-semibold text-primary underline-offset-4 transition-colors hover:text-primary/80 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            Forgot password?
          </Link>
        </div>

        <Button
          type="submit"
          size="lg"
          disabled={isSubmitting}
          className={cn(
            "h-11 w-full rounded-xl text-sm font-semibold text-white shadow-[0_14px_30px_-14px_rgba(0,151,107,0.85)] [background-image:var(--brand-gradient)] transition-all duration-200 hover:brightness-105 hover:text-white hover:shadow-[0_18px_36px_-14px_rgba(0,151,107,0.9)] disabled:opacity-70"
          )}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Signing in...
            </>
          ) : (
            <>
              Sign In
              <ArrowRight className="size-4 transition-transform duration-200 group-hover/button:translate-x-0.5" />
            </>
          )}
        </Button>
      </form>

      <div className="my-6 flex items-center gap-3">
        <span aria-hidden className="h-px flex-1 bg-border/80" />
        <span className="text-[10px] font-semibold tracking-[0.16em] text-muted-foreground uppercase">
          OR CONTINUE WITH
        </span>
        <span aria-hidden className="h-px flex-1 bg-border/80" />
      </div>

      <Button
        type="button"
        variant="outline"
        size="lg"
        onClick={handleGoogleSignIn}
        disabled={isSubmitting || isGoogleLoading}
        className="h-11 w-full rounded-xl border-border/80 bg-background/70 text-sm font-medium text-foreground shadow-xs transition-colors hover:bg-muted dark:bg-input/20 dark:hover:bg-input/35"
      >
        {isGoogleLoading ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          <GoogleIcon />
        )}
        <span>Continue with Google</span>
      </Button>

      <p className="mt-7 text-center text-xs text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Link
          href="/signup"
          className="font-semibold text-primary underline-offset-4 transition-colors hover:text-primary/80 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          Create Account
        </Link>
      </p>

      <div className="mt-10 flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5 text-[10px] font-medium text-muted-foreground/80">
        <span className="inline-flex items-center gap-1.5">
          <ShieldCheck className="size-3 text-primary" />
          256-bit encrypted
        </span>
        <span aria-hidden className="size-1 rounded-full bg-border" />
        <span className="inline-flex items-center gap-1.5">
          <Lock className="size-3 text-primary" />
          Secure sign-in
        </span>
      </div>
    </div>
  );
}
