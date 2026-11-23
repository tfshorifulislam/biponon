"use client";

import {
  Fragment,
  useId,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
  type DragEvent,
  type FormEvent,
} from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CircleAlert,
  Edit2,
  Globe,
  Loader2,
  Lock,
  Palette,
  ShieldCheck,
  Sparkles,
  Store,
  Trash2,
  UploadCloud,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useLanguage } from "@/lib/i18n/languageContext";
import {
  LOGO_MAX_BYTES,
  STORE_CATEGORIES,
  STORE_DESCRIPTION_MAX,
  STORE_NAME_MAX,
  SUBDOMAIN_MAX,
  getStoreUrl,
  slugify,
  validateBrandColor,
  validateCategory,
  validateDescription,
  validateStoreDraft,
  validateStoreName,
  validateSubdomain,
  type StoreDraft,
  type StoreFieldErrors,
} from "@/lib/website/validation";
import { cn } from "@/lib/utils";

const BRAND_COLOR_PRESETS = [
  "#00976B",
  "#00BB7D",
  "#0F766E",
  "#2563EB",
  "#7C3AED",
  "#E11D48",
  "#F59E0B",
  "#0F172A",
];

const INITIAL_DRAFT: StoreDraft = {
  storeName: "",
  category: "",
  description: "",
  logoDataUrl: null,
  logoFileName: null,
  brandColor: "#00976B",
  subdomain: "",
};

const HEX_COLOR_PATTERN = /^#[0-9a-f]{6}$/i;
const LOGO_TYPES = new Set([
  "image/png",
  "image/jpeg",
  "image/webp",
  "image/svg+xml",
]);

interface CreatedStoreSuccess {
  storeUrl: string;
  storeName: string;
}

function WizardBrand() {
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

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;

  return (
    <p
      id={id}
      role="alert"
      className="flex items-center gap-1.5 text-xs font-medium text-destructive"
    >
      <CircleAlert className="size-3 shrink-0" />
      {message}
    </p>
  );
}

interface StepItem {
  number: string;
  title: string;
  shortTitle: string;
  description: string;
}

function StepIndicator({
  steps,
  activeStep,
  maxVisitedStep,
  onSelect,
}: {
  steps: StepItem[];
  activeStep: number;
  maxVisitedStep: number;
  onSelect: (index: number) => void;
}) {
  return (
    <div className="flex items-center gap-2" aria-label="Store setup progress">
      {steps.map((step, index) => {
        const isActive = index === activeStep;
        const isCompleted = index < activeStep;
        const isAvailable = index <= maxVisitedStep;

        return (
          <Fragment key={step.number}>
            <button
              type="button"
              onClick={() => onSelect(index)}
              disabled={!isAvailable}
              aria-current={isActive ? "step" : undefined}
              aria-label={`Step ${step.number}: ${step.title}${
                isCompleted ? " (completed)" : ""
              }`}
              className={cn(
                "group flex min-w-0 flex-1 flex-col items-center gap-1.5 rounded-xl px-1 py-1 text-center transition-colors focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:outline-none",
                isAvailable ? "cursor-pointer" : "cursor-default opacity-60"
              )}
            >
              <span
                className={cn(
                  "grid size-8 place-items-center rounded-full border text-xs font-bold transition-all duration-300 sm:size-8.5",
                  isActive &&
                    "border-transparent bg-primary text-primary-foreground shadow-[0_8px_20px_-8px_rgba(0,151,107,0.9)] ring-2 ring-primary/25",
                  isCompleted &&
                    "border-primary/30 bg-primary/10 text-primary group-hover:bg-primary/20",
                  !isActive &&
                    !isCompleted &&
                    "border-border bg-muted/40 text-muted-foreground"
                )}
              >
                {isCompleted ? (
                  <Check className="size-3.5" strokeWidth={3} />
                ) : (
                  step.number
                )}
              </span>
              <span
                className={cn(
                  "block w-full truncate text-[11px] font-semibold tracking-tight transition-colors",
                  isActive && "text-primary",
                  isCompleted && "text-foreground",
                  !isActive && !isCompleted && "text-muted-foreground"
                )}
              >
                {step.shortTitle}
              </span>
            </button>
            {index < steps.length - 1 ? (
              <span
                aria-hidden
                className={cn(
                  "mb-4 h-0.5 w-4 shrink-0 rounded-full transition-colors duration-300 sm:w-6",
                  index < activeStep ? "bg-primary" : "bg-border/80"
                )}
              />
            ) : null}
          </Fragment>
        );
      })}
    </div>
  );
}

function SummaryRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-1 py-1.5 sm:grid-cols-[7.5rem_minmax(0,1fr)] sm:items-start sm:gap-3 sm:py-2">
      <dt className="text-xs font-medium text-muted-foreground">{label}</dt>
      <dd className="min-w-0 text-xs font-medium leading-relaxed break-words text-foreground sm:text-sm">
        {children}
      </dd>
    </div>
  );
}

function SummarySection({
  title,
  editText,
  onEdit,
  children,
}: {
  title: string;
  editText: string;
  onEdit: () => void;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-xl border border-border/75 bg-background/60 p-3 shadow-xs sm:p-3.5">
      <div className="flex items-center justify-between gap-3 border-b border-border/50 pb-1.5">
        <h3 className="text-[10px] font-bold tracking-wider text-muted-foreground uppercase">
          {title}
        </h3>
        <button
          type="button"
          onClick={onEdit}
          className="inline-flex items-center gap-1 rounded-md text-xs font-semibold text-primary underline-offset-4 transition-colors hover:text-primary/80 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
        >
          <Edit2 className="size-3" />
          <span>{editText}</span>
        </button>
      </div>
      <dl className="mt-1 divide-y divide-border/40">{children}</dl>
    </section>
  );
}

export function CreateWebsiteWizard() {
  const { t } = useLanguage();
  const logoInputId = useId();
  const logoInputRef = useRef<HTMLInputElement>(null);

  const [stepIndex, setStepIndex] = useState(0);
  const [maxVisitedStep, setMaxVisitedStep] = useState(0);
  const [draft, setDraft] = useState<StoreDraft>(INITIAL_DRAFT);
  const [errors, setErrors] = useState<StoreFieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [subdomainTouched, setSubdomainTouched] = useState(false);
  const [isDraggingLogo, setIsDraggingLogo] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState<CreatedStoreSuccess | null>(null);

  const steps: StepItem[] = useMemo(
    () => [
      {
        number: t("createWebsite.steps.step1.number"),
        title: t("createWebsite.steps.step1.title"),
        shortTitle: t("createWebsite.steps.step1.shortTitle"),
        description: t("createWebsite.steps.step1.description"),
      },
      {
        number: t("createWebsite.steps.step2.number"),
        title: t("createWebsite.steps.step2.title"),
        shortTitle: t("createWebsite.steps.step2.shortTitle"),
        description: t("createWebsite.steps.step2.description"),
      },
      {
        number: t("createWebsite.steps.step3.number"),
        title: t("createWebsite.steps.step3.title"),
        shortTitle: t("createWebsite.steps.step3.shortTitle"),
        description: t("createWebsite.steps.step3.description"),
      },
    ],
    [t]
  );

  const storeUrl = useMemo(
    () => getStoreUrl(draft.subdomain),
    [draft.subdomain]
  );

  const safeBrandColor = HEX_COLOR_PATTERN.test(draft.brandColor)
    ? draft.brandColor
    : "#00976B";

  const activeStep = steps[stepIndex];

  const clearError = (key: keyof StoreFieldErrors) => {
    setErrors((current) =>
      current[key] ? { ...current, [key]: undefined } : current
    );
    setFormError(null);
  };

  const handleStoreNameChange = (value: string) => {
    setDraft((current) => ({
      ...current,
      storeName: value,
      subdomain: subdomainTouched ? current.subdomain : slugify(value),
    }));
    clearError("storeName");
    if (!subdomainTouched) clearError("subdomain");
  };

  const handleCategoryChange = (value: string | null) => {
    setDraft((current) => ({ ...current, category: value ?? "" }));
    clearError("category");
  };

  const handleDescriptionChange = (value: string) => {
    setDraft((current) => ({ ...current, description: value }));
    clearError("description");
  };

  const handleSubdomainChange = (value: string) => {
    const next = value
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "")
      .slice(0, SUBDOMAIN_MAX);

    setSubdomainTouched(true);
    setDraft((current) => ({ ...current, subdomain: next }));
    clearError("subdomain");
  };

  const handleBrandColorChange = (value: string) => {
    setDraft((current) => ({ ...current, brandColor: value }));
    clearError("brandColor");
  };

  const processLogoFile = (file: File) => {
    if (!LOGO_TYPES.has(file.type)) {
      setErrors((current) => ({
        ...current,
        logo: t("createWebsite.validation.logoFormat"),
      }));
      return;
    }

    if (file.size > LOGO_MAX_BYTES) {
      setErrors((current) => ({
        ...current,
        logo: t("createWebsite.validation.logoSize"),
      }));
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result !== "string") return;

      setDraft((current) => ({
        ...current,
        logoDataUrl: reader.result as string,
        logoFileName: file.name,
      }));
      setErrors((current) => ({ ...current, logo: undefined }));
      setFormError(null);
    };

    reader.onerror = () => {
      setErrors((current) => ({
        ...current,
        logo: t("createWebsite.validation.logoFormat"),
      }));
    };

    reader.readAsDataURL(file);
  };

  const handleLogoInput = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) processLogoFile(file);
    event.target.value = "";
  };

  const handleLogoDrop = (event: DragEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIsDraggingLogo(false);
    const file = event.dataTransfer.files?.[0];
    if (file) processLogoFile(file);
  };

  const removeLogo = () => {
    setDraft((current) => ({
      ...current,
      logoDataUrl: null,
      logoFileName: null,
    }));
    setErrors((current) => ({ ...current, logo: undefined }));
    setFormError(null);
  };

  const validateCurrentStep = (): boolean => {
    if (stepIndex === 0) {
      const stepErrors: StoreFieldErrors = {};
      const nameErr = validateStoreName(draft.storeName);
      if (nameErr) {
        stepErrors.storeName =
          draft.storeName.trim().length === 0
            ? t("createWebsite.validation.storeNameRequired")
            : t("createWebsite.validation.storeNameMin");
      }
      const catErr = validateCategory(draft.category);
      if (catErr) {
        stepErrors.category = t("createWebsite.validation.categoryRequired");
      }
      const descErr = validateDescription(draft.description);
      if (descErr) {
        stepErrors.description = descErr;
      }
      setErrors(stepErrors);
      return !stepErrors.storeName && !stepErrors.category && !stepErrors.description;
    }

    if (stepIndex === 1) {
      const stepErrors: StoreFieldErrors = {};
      const subErr = validateSubdomain(draft.subdomain);
      if (subErr) {
        stepErrors.subdomain =
          draft.subdomain.trim().length === 0
            ? t("createWebsite.validation.subdomainRequired")
            : draft.subdomain.trim().length < 3
            ? t("createWebsite.validation.subdomainMin")
            : t("createWebsite.validation.subdomainFormat");
      }
      const colErr = validateBrandColor(draft.brandColor);
      if (colErr) {
        stepErrors.brandColor = t("createWebsite.validation.colorInvalid");
      }
      setErrors(stepErrors);
      return !stepErrors.subdomain && !stepErrors.brandColor;
    }

    return true;
  };

  const goToStep = (index: number) => {
    if (isSubmitting || success) return;
    if (index === stepIndex) return;

    if (index > maxVisitedStep) {
      if (!validateCurrentStep()) return;
      setMaxVisitedStep(index);
    }

    setStepIndex(index);
    setFormError(null);
  };

  const goNext = () => {
    if (!validateCurrentStep()) return;

    const next = Math.min(stepIndex + 1, steps.length - 1);
    setStepIndex(next);
    setMaxVisitedStep((current) => Math.max(current, next));
    setFormError(null);
  };

  const goBack = () => {
    if (isSubmitting) return;
    setStepIndex((current) => Math.max(0, current - 1));
    setFormError(null);
    setErrors({});
  };

  const handleCreateStore = () => {
    const allErrors = validateStoreDraft(draft);
    if (Object.values(allErrors).some(Boolean)) {
      if (allErrors.storeName || allErrors.category || allErrors.description) {
        setStepIndex(0);
        setMaxVisitedStep((current) => Math.max(current, 1));
      } else {
        setStepIndex(1);
      }
      setErrors(allErrors);
      return;
    }

    setIsSubmitting(true);
    setFormError(null);

    setTimeout(() => {
      setIsSubmitting(false);
      setSuccess({
        storeUrl: getStoreUrl(draft.subdomain),
        storeName: draft.storeName.trim() || "Biponon Store",
      });
      setMaxVisitedStep(2);
    }, 800);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSubmitting) return;
    if (stepIndex < steps.length - 1) {
      goNext();
      return;
    }

    handleCreateStore();
  };

  const resetWizard = () => {
    setDraft(INITIAL_DRAFT);
    setErrors({});
    setFormError(null);
    setSuccess(null);
    setStepIndex(0);
    setMaxVisitedStep(0);
    setSubdomainTouched(false);
    setIsDraggingLogo(false);
  };

  const getCategoryDisplay = (catValue: string) => {
    if (!catValue) return "";
    const matched = STORE_CATEGORIES.find((c) => c.value === catValue);
    if (!matched) return catValue;
    const keyMap: Record<string, string> = {
      "fashion-apparel": "fashion",
      "electronics-gadgets": "electronics",
      "beauty-cosmetics": "beauty",
      "organic-food": "food",
      "home-decor": "home",
      other: "other",
    };
    const key = keyMap[catValue];
    return key ? t(`createWebsite.fields.categories.${key}`) : matched.label;
  };

  if (success) {
    return (
      <div className="mx-auto flex w-full max-w-sm flex-col">
        <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2">
          <WizardBrand />
          <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-2.5 py-0.5 text-[10px] font-semibold tracking-wider text-primary uppercase dark:border-primary/30 dark:bg-primary/15">
            <span className="size-1.5 rounded-full bg-primary" />
            {t("createWebsite.success.badge")}
          </span>
        </div>

        <div
          role="status"
          aria-live="polite"
          className="mt-6 rounded-2xl border border-primary/25 bg-primary/[0.06] p-5 shadow-sm sm:mt-7 sm:p-6 dark:border-primary/35 dark:bg-primary/10"
        >
          <span className="brand-gradient grid size-12 place-items-center rounded-2xl text-white shadow-[0_16px_32px_-14px_rgba(0,151,107,0.85)]">
            <Check className="size-6" strokeWidth={3} />
          </span>

          <h1 className="font-heading mt-4 text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
            {t("createWebsite.success.title")}
          </h1>
          <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground sm:text-sm">
            {t("createWebsite.success.description")}
          </p>

          <div className="mt-5 rounded-xl border border-border/70 bg-background/90 p-3.5 shadow-xs">
            <p className="text-[10px] font-bold tracking-wider text-muted-foreground uppercase">
              {t("createWebsite.review.storeUrl")}
            </p>
            <p className="mt-1 flex items-center gap-2 font-mono text-xs font-semibold break-all text-primary sm:text-sm">
              <Globe className="size-4 shrink-0 text-primary" />
              https://{success.storeUrl}
            </p>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-x-3.5 gap-y-1.5 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1.5 font-medium text-foreground">
              <span
                className="size-2.5 rounded-full ring-2 ring-background"
                style={{ backgroundColor: draft.brandColor }}
              />
              {draft.brandColor.toUpperCase()}
            </span>
            <span aria-hidden className="size-1 rounded-full bg-border" />
            <span className="font-medium text-foreground">
              {getCategoryDisplay(draft.category)}
            </span>
          </div>

          <div className="mt-6 flex flex-col gap-2.5">
            <Link
              href="/login"
              className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-xl text-xs font-semibold text-white shadow-[0_12px_24px_-10px_rgba(0,151,107,0.7)] [background-image:var(--brand-gradient)] transition-all duration-200 hover:brightness-105 active:scale-[0.99] sm:h-11 sm:text-sm"
            >
              <span>{t("createWebsite.success.goToDashboard")}</span>
              <ArrowRight className="size-4" />
            </Link>
            <Button
              type="button"
              variant="outline"
              size="lg"
              onClick={resetWizard}
              className="h-10 w-full rounded-xl border-border/80 bg-background/60 text-xs font-medium text-muted-foreground hover:text-foreground"
            >
              Create another store
            </Button>
          </div>
        </div>

        <p className="mt-5 text-center text-xs text-muted-foreground sm:mt-6">
          {t("createWebsite.buttons.haveAccount")}{" "}
          <Link
            href="/login"
            className="font-semibold text-primary underline-offset-4 transition-colors hover:text-primary/80 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
          >
            {t("createWebsite.buttons.signIn")}
          </Link>
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto flex w-full max-w-sm flex-col">
      <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2">
        <WizardBrand />
        <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-2.5 py-0.5 text-[10px] font-semibold tracking-wider text-primary uppercase dark:border-primary/30 dark:bg-primary/15">
          <Sparkles className="size-3 text-primary" />
          {t("createWebsite.badge")}
        </span>
      </div>

      <div className="mt-5 sm:mt-6">
        <h1 className="font-heading text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
          {t("createWebsite.title")}
        </h1>
        <p className="mt-1 text-xs leading-relaxed text-muted-foreground sm:text-sm">
          {t("createWebsite.subtitle")}
        </p>
      </div>

      <div className="mt-4 sm:mt-5">
        <StepIndicator
          steps={steps}
          activeStep={stepIndex}
          maxVisitedStep={maxVisitedStep}
          onSelect={goToStep}
        />
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-border/50 pt-2.5">
        <div>
          <span className="text-[10px] font-bold tracking-wider text-primary uppercase">
            Step {activeStep.number} / 03 · {activeStep.shortTitle}
          </span>
          <h2 className="font-heading text-sm font-bold tracking-tight text-foreground">
            {activeStep.title}
          </h2>
        </div>
        <span className="rounded-full bg-muted/60 px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
          {stepIndex + 1}/3
        </span>
      </div>

      {formError ? (
        <div
          id="create-store-error"
          role="alert"
          aria-live="polite"
          className="mt-3 flex items-start gap-2 rounded-xl border border-destructive/25 bg-destructive/10 p-2.5 text-xs text-destructive dark:border-destructive/35 dark:bg-destructive/15"
        >
          <CircleAlert className="mt-0.5 size-3.5 shrink-0" />
          <span>{formError}</span>
        </div>
      ) : null}

      <form
        onSubmit={handleSubmit}
        noValidate
        aria-busy={isSubmitting}
        className="mt-4 flex flex-col gap-4"
      >
        {stepIndex === 0 ? (
          <>
            <div className="space-y-1.5">
              <Label htmlFor="storeName" className="text-xs font-semibold text-foreground">
                {t("createWebsite.fields.storeName")}
                <span aria-hidden className="ml-1 text-destructive">
                  *
                </span>
              </Label>
              <div className="relative">
                <Store
                  aria-hidden
                  className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground/70"
                />
                <Input
                  id="storeName"
                  name="storeName"
                  autoComplete="organization"
                  placeholder={t("createWebsite.fields.storeNamePlaceholder")}
                  value={draft.storeName}
                  onChange={(event) =>
                    handleStoreNameChange(event.target.value)
                  }
                  onBlur={() =>
                    setErrors((current) => ({
                      ...current,
                      storeName: validateStoreName(draft.storeName),
                    }))
                  }
                  maxLength={STORE_NAME_MAX}
                  required
                  aria-required="true"
                  aria-invalid={Boolean(errors.storeName)}
                  aria-describedby={
                    errors.storeName ? "storeName-error" : undefined
                  }
                  className="h-10 rounded-xl border-border/80 bg-background/50 pl-10 text-sm transition-all focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/25 sm:h-11"
                />
              </div>
              <FieldError id="storeName-error" message={errors.storeName} />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="category" className="text-xs font-semibold text-foreground">
                {t("createWebsite.fields.category")}
                <span aria-hidden className="ml-1 text-destructive">
                  *
                </span>
              </Label>
              <Select
                name="category"
                items={STORE_CATEGORIES}
                value={draft.category || null}
                onValueChange={handleCategoryChange}
                required
              >
                <SelectTrigger
                  id="category"
                  aria-required="true"
                  aria-invalid={Boolean(errors.category)}
                  aria-describedby={
                    errors.category ? "category-error" : undefined
                  }
                  className="h-10 rounded-xl border-border/80 bg-background/50 text-sm transition-all focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/25 sm:h-11"
                >
                  <SelectValue placeholder={t("createWebsite.fields.categoryPlaceholder")} />
                </SelectTrigger>
                <SelectContent>
                  {STORE_CATEGORIES.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {getCategoryDisplay(category.value)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FieldError id="category-error" message={errors.category} />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between gap-3">
                <Label htmlFor="description" className="text-xs font-semibold text-foreground">
                  {t("createWebsite.fields.description")}
                </Label>
                <span className="text-[10px] tabular-nums text-muted-foreground/80">
                  {draft.description.length}/{STORE_DESCRIPTION_MAX}
                </span>
              </div>
              <Textarea
                id="description"
                name="description"
                placeholder={t("createWebsite.fields.descriptionPlaceholder")}
                value={draft.description}
                onChange={(event) =>
                  handleDescriptionChange(event.target.value)
                }
                onBlur={() =>
                  setErrors((current) => ({
                    ...current,
                    description: validateDescription(draft.description),
                  }))
                }
                maxLength={STORE_DESCRIPTION_MAX}
                aria-invalid={Boolean(errors.description)}
                aria-describedby={
                  errors.description ? "description-error" : undefined
                }
                className="min-h-16 rounded-xl border-border/80 bg-background/50 text-xs leading-relaxed transition-all focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/25 sm:min-h-20"
              />
              <FieldError
                id="description-error"
                message={errors.description}
              />
            </div>
          </>
        ) : null}

        {stepIndex === 1 ? (
          <>
            <div className="space-y-1.5">
              <Label htmlFor="logo" className="text-xs font-semibold text-foreground">
                {t("createWebsite.fields.logo")}
              </Label>

              <input
                ref={logoInputRef}
                id={logoInputId}
                type="file"
                accept="image/png,image/jpeg,image/webp,image/svg+xml"
                onChange={handleLogoInput}
                className="sr-only"
                tabIndex={-1}
              />

              {draft.logoDataUrl ? (
                <div className="flex items-center gap-3 rounded-xl border border-border/75 bg-background/60 p-2.5">
                  <div className="grid size-11 shrink-0 place-items-center overflow-hidden rounded-lg border border-border/60 bg-muted/40 p-1">
                    <Image
                      src={draft.logoDataUrl}
                      alt="Store logo preview"
                      width={80}
                      height={80}
                      unoptimized
                      className="max-h-full w-auto object-contain"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs font-semibold text-foreground">
                      {draft.logoFileName}
                    </p>
                    <div className="mt-1 flex items-center gap-2.5">
                      <button
                        type="button"
                        onClick={() => logoInputRef.current?.click()}
                        className="text-[11px] font-semibold text-primary underline-offset-4 hover:underline"
                      >
                        {t("createWebsite.fields.changeLogo")}
                      </button>
                      <button
                        type="button"
                        onClick={removeLogo}
                        className="inline-flex items-center gap-1 text-[11px] font-semibold text-muted-foreground transition-colors hover:text-destructive"
                      >
                        <Trash2 className="size-3" />
                        {t("createWebsite.fields.removeLogo")}
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => logoInputRef.current?.click()}
                  onDragOver={(event) => {
                    event.preventDefault();
                    setIsDraggingLogo(true);
                  }}
                  onDragLeave={() => setIsDraggingLogo(false)}
                  onDrop={handleLogoDrop}
                  aria-describedby="logo-hint"
                  className={cn(
                    "flex w-full flex-col items-center justify-center gap-1 rounded-xl border border-dashed px-3 py-3.5 text-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 sm:py-4",
                    isDraggingLogo
                      ? "border-primary bg-primary/10"
                      : "border-border/80 bg-background/40 hover:border-primary/40 hover:bg-primary/[0.03]"
                  )}
                >
                  <span className="grid size-7 place-items-center rounded-lg bg-primary/10 text-primary">
                    <UploadCloud className="size-3.5" />
                  </span>
                  <span className="text-xs font-semibold text-foreground">
                    {t("createWebsite.fields.logoUploadHint")}
                  </span>
                  <span
                    id="logo-hint"
                    className="text-[10px] text-muted-foreground"
                  >
                    {t("createWebsite.fields.logoUploadFormats")}
                  </span>
                </button>
              )}
              <FieldError id="logo-error" message={errors.logo} />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="brandColorHex" className="flex items-center gap-1.5 text-xs font-semibold text-foreground">
                <Palette className="size-3.5 text-primary" />
                <span>{t("createWebsite.fields.brandColor")}</span>
                <span aria-hidden className="text-destructive">
                  *
                </span>
              </Label>
              <div className="flex items-center gap-2">
                <label
                  className="relative size-9.5 shrink-0 cursor-pointer overflow-hidden rounded-xl border border-input shadow-xs ring-offset-background focus-within:ring-2 focus-within:ring-primary/30 sm:size-10"
                  title="Choose custom color"
                >
                  <span
                    aria-hidden
                    className="absolute inset-0"
                    style={{ backgroundColor: safeBrandColor }}
                  />
                  <input
                    type="color"
                    value={safeBrandColor.toLowerCase()}
                    onChange={(event) =>
                      handleBrandColorChange(event.target.value)
                    }
                    aria-label="Pick custom brand color"
                    className="absolute inset-0 size-full cursor-pointer opacity-0"
                  />
                </label>
                <Input
                  id="brandColorHex"
                  value={draft.brandColor.toUpperCase()}
                  onChange={(event) =>
                    handleBrandColorChange(event.target.value)
                  }
                  onBlur={() =>
                    setErrors((current) => ({
                      ...current,
                      brandColor: validateBrandColor(draft.brandColor),
                    }))
                  }
                  maxLength={7}
                  autoComplete="off"
                  spellCheck={false}
                  required
                  aria-required="true"
                  aria-invalid={Boolean(errors.brandColor)}
                  aria-describedby={
                    errors.brandColor ? "brandColor-error" : undefined
                  }
                  className="h-9.5 rounded-xl border-border/80 bg-background/50 font-mono text-xs tracking-wider uppercase transition-all focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/25 sm:h-10"
                />
              </div>

              <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
                {BRAND_COLOR_PRESETS.map((color) => {
                  const isSelected =
                    color.toLowerCase() === draft.brandColor.toLowerCase();

                  return (
                    <button
                      key={color}
                      type="button"
                      onClick={() => handleBrandColorChange(color)}
                      aria-label={`Use brand color ${color}`}
                      aria-pressed={isSelected}
                      className={cn(
                        "size-5.5 rounded-full border border-black/10 shadow-xs transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 sm:size-6 dark:border-white/10",
                        isSelected &&
                          "ring-2 ring-primary ring-offset-2 ring-offset-background"
                      )}
                      style={{ backgroundColor: color }}
                    />
                  );
                })}
              </div>
              <FieldError
                id="brandColor-error"
                message={errors.brandColor}
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="subdomain" className="text-xs font-semibold text-foreground">
                {t("createWebsite.fields.storeUrl")}
                <span aria-hidden className="ml-1 text-destructive">
                  *
                </span>
              </Label>
              <div
                className={cn(
                  "flex h-10 items-center rounded-xl border border-border/80 bg-background/50 shadow-xs transition-all focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/25 sm:h-11",
                  errors.subdomain &&
                    "border-destructive focus-within:border-destructive focus-within:ring-destructive/20"
                )}
              >
                <span
                  aria-hidden
                  className="pl-3 font-mono text-[11px] text-muted-foreground/70 select-none"
                >
                  https://
                </span>
                <Input
                  id="subdomain"
                  name="subdomain"
                  autoComplete="off"
                  autoCapitalize="none"
                  spellCheck={false}
                  placeholder={t("createWebsite.fields.subdomainPlaceholder")}
                  value={draft.subdomain}
                  onChange={(event) =>
                    handleSubdomainChange(event.target.value)
                  }
                  onBlur={() =>
                    setErrors((current) => ({
                      ...current,
                      subdomain: validateSubdomain(draft.subdomain),
                    }))
                  }
                  required
                  aria-required="true"
                  aria-invalid={Boolean(errors.subdomain)}
                  aria-describedby={
                    errors.subdomain ? "subdomain-error" : "subdomain-hint"
                  }
                  className="h-full flex-1 rounded-none border-0 bg-transparent px-1 font-mono text-xs shadow-none focus-visible:border-transparent focus-visible:ring-0 dark:bg-transparent"
                />
                <span
                  aria-hidden
                  className="shrink-0 pr-3 font-mono text-[11px] text-muted-foreground/70 select-none"
                >
                  .biponon.com
                </span>
              </div>
              <div
                id="subdomain-hint"
                className="flex items-center gap-1.5 rounded-lg bg-muted/30 px-2.5 py-1.5 text-[10px] text-muted-foreground"
              >
                <Globe className="size-3 shrink-0 text-primary" />
                <span className="truncate">
                  {t("createWebsite.fields.urlPreviewNotice")}{" "}
                  <strong className="text-foreground">{storeUrl}</strong>
                </span>
              </div>
              <FieldError id="subdomain-error" message={errors.subdomain} />
            </div>
          </>
        ) : null}

        {stepIndex === 2 ? (
          <div className="space-y-2.5">
            <div className="rounded-xl border border-primary/20 bg-primary/[0.05] p-2.5 text-xs dark:border-primary/30 dark:bg-primary/10">
              <div className="flex items-center gap-1.5 font-semibold text-primary">
                <Sparkles className="size-3.5" />
                <span>{t("createWebsite.review.readyBannerTitle")}</span>
              </div>
              <p className="mt-0.5 text-[11px] text-muted-foreground">
                {t("createWebsite.review.readyBannerDesc")}
              </p>
            </div>

            <SummarySection
              title={t("createWebsite.steps.step1.title")}
              editText={t("createWebsite.review.edit")}
              onEdit={() => goToStep(0)}
            >
              <SummaryRow label={t("createWebsite.review.storeName")}>
                {draft.storeName.trim() || t("createWebsite.review.noDescription")}
              </SummaryRow>
              <SummaryRow label={t("createWebsite.review.category")}>
                {getCategoryDisplay(draft.category) || "—"}
              </SummaryRow>
              <SummaryRow label={t("createWebsite.review.description")}>
                {draft.description.trim() ? (
                  <span className="whitespace-pre-wrap">
                    {draft.description.trim()}
                  </span>
                ) : (
                  <span className="text-muted-foreground">
                    {t("createWebsite.review.noDescription")}
                  </span>
                )}
              </SummaryRow>
            </SummarySection>

            <SummarySection
              title={t("createWebsite.steps.step2.title")}
              editText={t("createWebsite.review.edit")}
              onEdit={() => goToStep(1)}
            >
              <SummaryRow label={t("createWebsite.review.logo")}>
                {draft.logoDataUrl ? (
                  <span className="inline-flex items-center gap-2">
                    <span className="grid size-6 place-items-center overflow-hidden rounded-md border border-border/60 bg-muted/40 p-0.5">
                      <Image
                        src={draft.logoDataUrl}
                        alt="Store logo preview"
                        width={48}
                        height={48}
                        unoptimized
                        className="max-h-full w-auto object-contain"
                      />
                    </span>
                    <span className="truncate text-xs text-muted-foreground">
                      {draft.logoFileName}
                    </span>
                  </span>
                ) : (
                  <span className="text-muted-foreground">
                    {t("createWebsite.review.noLogo")}
                  </span>
                )}
              </SummaryRow>
              <SummaryRow label={t("createWebsite.review.brandColor")}>
                <span className="inline-flex items-center gap-1.5">
                  <span
                    className="size-3.5 rounded-full border border-black/10 shadow-xs dark:border-white/15"
                    style={{ backgroundColor: draft.brandColor }}
                  />
                  <span className="font-mono text-xs">
                    {draft.brandColor.toUpperCase()}
                  </span>
                </span>
              </SummaryRow>
              <SummaryRow label={t("createWebsite.review.storeUrl")}>
                <span className="inline-flex items-center gap-1 font-mono text-xs text-primary break-all">
                  <Globe className="size-3 shrink-0" />
                  https://{storeUrl}
                </span>
              </SummaryRow>
            </SummarySection>
          </div>
        ) : null}

        {stepIndex < steps.length - 1 ? (
          <div className="flex items-center gap-2.5 pt-1">
            {stepIndex > 0 ? (
              <Button
                type="button"
                variant="outline"
                size="lg"
                onClick={goBack}
                disabled={isSubmitting}
                className="h-10 flex-1 rounded-xl border-border/80 bg-background/60 text-xs font-semibold shadow-xs sm:h-11"
              >
                <ArrowLeft className="size-3.5" />
                <span>{t("createWebsite.buttons.back")}</span>
              </Button>
            ) : null}
            <Button
              type="submit"
              size="lg"
              disabled={isSubmitting}
              className="h-10 flex-[1.4] rounded-xl text-xs font-semibold text-white shadow-[0_12px_24px_-10px_rgba(0,151,107,0.7)] [background-image:var(--brand-gradient)] transition-all duration-200 hover:brightness-105 active:scale-[0.99] sm:h-11 sm:text-sm"
            >
              <span>{t("createWebsite.buttons.next")}</span>
              <ArrowRight className="size-4" />
            </Button>
          </div>
        ) : (
          <div className="flex items-center gap-2.5 pt-1">
            <Button
              type="button"
              variant="outline"
              size="lg"
              onClick={goBack}
              disabled={isSubmitting}
              className="h-10 flex-1 rounded-xl border-border/80 bg-background/60 text-xs font-semibold shadow-xs sm:h-11 sm:text-sm"
            >
              <ArrowLeft className="size-4" />
              <span>{t("createWebsite.buttons.back")}</span>
            </Button>
            <Button
              type="button"
              size="lg"
              onClick={handleCreateStore}
              disabled={isSubmitting}
              className="h-10 flex-[1.6] rounded-xl text-xs font-semibold text-white shadow-[0_12px_24px_-10px_rgba(0,151,107,0.7)] [background-image:var(--brand-gradient)] transition-all duration-200 hover:brightness-105 active:scale-[0.99] sm:h-11 sm:text-sm"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  <span>{t("createWebsite.buttons.creatingStore")}</span>
                </>
              ) : (
                <>
                  <span>{t("createWebsite.buttons.createStore")}</span>
                  <ArrowRight className="size-4" />
                </>
              )}
            </Button>
          </div>
        )}
      </form>

      <p className="mt-4 text-center text-xs text-muted-foreground sm:mt-5">
        {t("createWebsite.buttons.haveAccount")}{" "}
        <Link
          href="/login"
          className="font-semibold text-primary underline-offset-4 transition-colors hover:text-primary/80 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
        >
          {t("createWebsite.buttons.signIn")}
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
