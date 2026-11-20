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
  Globe,
  LayoutTemplate,
  Loader2,
  Lock,
  Palette,
  ShieldCheck,
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
import {
  CreateStoreError,
  createStore,
  type CreateStoreSuccess,
} from "@/lib/website/client";
import {
  LOGO_MAX_BYTES,
  STORE_CATEGORIES,
  STORE_DESCRIPTION_MAX,
  STORE_NAME_MAX,
  SUBDOMAIN_MAX,
  getCategoryLabel,
  getStoreUrl,
  slugify,
  validateBrandColor,
  validateDescription,
  validateStepOne,
  validateStepTwo,
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

const STEPS = [
  {
    number: "01",
    title: "Store Information",
    shortTitle: "Store Info",
    description: "Tell us the basics about your new store.",
    icon: Store,
  },
  {
    number: "02",
    title: "Store Identity",
    shortTitle: "Identity",
    description: "Add your logo, brand color, and store URL.",
    icon: Palette,
  },
  {
    number: "03",
    title: "Review & Create",
    shortTitle: "Review",
    description: "Review your details before we create your store.",
    icon: LayoutTemplate,
  },
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

function WizardBrand() {
  return (
    <Link
      href="/"
      aria-label="Biponon home"
      className="group inline-flex w-fit items-center rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      <Image
        src="/logo2.png"
        alt="Biponon"
        width={150}
        height={35}
        priority
        className="block h-8 w-auto object-contain transition-transform duration-200 group-hover:scale-[1.02] dark:hidden"
      />
      <Image
        src="/logo.png"
        alt="Biponon"
        width={150}
        height={35}
        priority
        className="hidden h-8 w-auto object-contain transition-transform duration-200 group-hover:scale-[1.02] dark:block"
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

function StepIndicator({
  activeStep,
  maxVisitedStep,
  onSelect,
}: {
  activeStep: number;
  maxVisitedStep: number;
  onSelect: (index: number) => void;
}) {
  return (
    <div className="flex items-start gap-1.5" aria-label="Store setup progress">
      {STEPS.map((step, index) => {
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
                "group flex min-w-0 flex-1 flex-col items-center gap-2 rounded-xl px-1 py-1 text-center transition-colors focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:outline-none",
                isAvailable ? "cursor-pointer" : "cursor-default"
              )}
            >
              <span
                className={cn(
                  "grid size-9 place-items-center rounded-full border text-[11px] font-bold transition-all duration-300",
                  isActive &&
                    "border-transparent bg-primary text-primary-foreground shadow-[0_8px_20px_-10px_rgba(0,151,107,0.9)]",
                  isCompleted &&
                    "border-primary/25 bg-primary/10 text-primary group-hover:bg-primary/15",
                  !isActive &&
                    !isCompleted &&
                    "border-border bg-muted/40 text-muted-foreground"
                )}
              >
                {isCompleted ? (
                  <Check className="size-4" strokeWidth={3} />
                ) : (
                  step.number
                )}
              </span>
              <span
                className={cn(
                  "block w-full truncate text-[10px] font-semibold tracking-wide transition-colors",
                  isActive && "text-primary",
                  isCompleted && "text-foreground",
                  !isActive && !isCompleted && "text-muted-foreground"
                )}
              >
                {step.shortTitle}
              </span>
            </button>
            {index < STEPS.length - 1 ? (
              <span
                aria-hidden
                className={cn(
                  "mt-[18px] h-px w-4 shrink-0 rounded-full transition-colors duration-300 sm:w-7",
                  index < activeStep ? "bg-primary/60" : "bg-border"
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
    <div className="grid gap-1 py-2.5 sm:grid-cols-[8.5rem_minmax(0,1fr)] sm:items-start sm:gap-3">
      <dt className="text-xs font-medium text-muted-foreground">{label}</dt>
      <dd className="min-w-0 text-sm leading-relaxed break-words text-foreground">
        {children}
      </dd>
    </div>
  );
}

function SummarySection({
  title,
  onEdit,
  children,
}: {
  title: string;
  onEdit: () => void;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-border/70 bg-background/60 p-4">
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-[10px] font-semibold tracking-[0.14em] text-muted-foreground uppercase">
          {title}
        </h3>
        <button
          type="button"
          onClick={onEdit}
          className="rounded-md text-xs font-semibold text-primary underline-offset-4 transition-colors hover:text-primary/80 hover:underline focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:outline-none"
        >
          Edit
        </button>
      </div>
      <dl className="mt-1 divide-y divide-border/60">{children}</dl>
    </section>
  );
}

export function CreateWebsiteWizard() {
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
  const [success, setSuccess] = useState<CreateStoreSuccess | null>(null);

  const storeUrl = useMemo(
    () => getStoreUrl(draft.subdomain),
    [draft.subdomain]
  );
  const safeBrandColor = HEX_COLOR_PATTERN.test(draft.brandColor)
    ? draft.brandColor
    : "#00976B";
  const activeStep = STEPS[stepIndex];

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
        logo: "Upload a PNG, JPG, WebP, or SVG image.",
      }));
      return;
    }

    if (file.size > LOGO_MAX_BYTES) {
      setErrors((current) => ({
        ...current,
        logo: "Logo must be 1 MB or smaller.",
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
        logo: "We couldn't read that image. Please choose another file.",
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

  const validateCurrentStep = () => {
    const stepErrors =
      stepIndex === 0 ? validateStepOne(draft) : validateStepTwo(draft);
    setErrors(stepErrors);
    return Object.values(stepErrors).every((error) => !error);
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

    const next = Math.min(stepIndex + 1, STEPS.length - 1);
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

  const handleCreateStore = async () => {
    const allErrors = validateStoreDraft(draft);
    setErrors(allErrors);

    if (Object.values(allErrors).some(Boolean)) {
      if (allErrors.storeName || allErrors.category || allErrors.description) {
        setStepIndex(0);
        setMaxVisitedStep((current) => Math.max(current, 1));
      } else {
        setStepIndex(1);
      }
      setFormError(
        "Please complete the highlighted fields before creating your store."
      );
      return;
    }

    setIsSubmitting(true);
    setFormError(null);

    try {
      const result = await createStore(draft);
      setSuccess(result);
      setMaxVisitedStep(2);
    } catch (error) {
      if (error instanceof CreateStoreError) {
        setFormError(error.message);

        if (error.fieldErrors) {
          const nextErrors: StoreFieldErrors = {};

          for (const [key, message] of Object.entries(error.fieldErrors)) {
            if (
              key === "storeName" ||
              key === "category" ||
              key === "description" ||
              key === "logo" ||
              key === "brandColor" ||
              key === "subdomain"
            ) {
              nextErrors[key] = message;
            }
          }

          setErrors((current) => ({ ...current, ...nextErrors }));
        }
      } else {
        setFormError(
          "Something went wrong while creating your store. Please try again."
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSubmitting) return;
    if (stepIndex < STEPS.length - 1) {
      goNext();
      return;
    }

    void handleCreateStore();
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

  if (success) {
    const destination = success.redirectTo
      ? success.redirectTo
      : /^https?:\/\//i.test(success.storeUrl)
        ? success.storeUrl
        : `https://${success.storeUrl}`;
    const isExternal = /^https?:\/\//i.test(destination);

    return (
      <div className="mx-auto flex w-full max-w-md flex-col">
        <WizardBrand />

        <div
          role="status"
          aria-live="polite"
          className="mt-10 rounded-2xl border border-primary/20 bg-primary/[0.06] p-5 sm:p-6"
        >
          <span className="brand-gradient grid size-12 place-items-center rounded-2xl text-white shadow-[0_16px_32px_-16px_rgba(0,151,107,0.9)]">
            <Check className="size-6" strokeWidth={3} />
          </span>

          <h1 className="font-heading mt-5 text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
            Your store is ready
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            <span className="font-semibold text-foreground">
              {draft.storeName.trim()}
            </span>{" "}
            has been created. Your storefront is ready for products and orders.
          </p>

          <div className="mt-5 rounded-xl border border-border/70 bg-background/80 px-3.5 py-3">
            <p className="text-[10px] font-semibold tracking-[0.14em] text-muted-foreground uppercase">
              Store address
            </p>
            <p className="mt-1 flex items-center gap-2 text-sm font-semibold break-all text-foreground">
              <Globe className="size-4 shrink-0 text-primary" />
              {success.storeUrl}
            </p>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <span
                className="size-2.5 rounded-full ring-2 ring-background"
                style={{ backgroundColor: draft.brandColor }}
              />
              {draft.brandColor.toUpperCase()}
            </span>
            <span>{getCategoryLabel(draft.category)}</span>
          </div>

          <div className="mt-6 flex flex-col gap-2">
            <Button
              render={
                <a
                  href={destination}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noreferrer" : undefined}
                />
              }
              size="lg"
              className="h-11 w-full rounded-xl text-sm font-semibold text-white shadow-[0_14px_30px_-14px_rgba(0,151,107,0.85)] [background-image:var(--brand-gradient)] transition-all duration-200 hover:brightness-105 hover:text-white"
            >
              {success.redirectTo ? "Continue to Dashboard" : "Visit Your Store"}
              <ArrowRight className="size-4" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="lg"
              onClick={resetWizard}
              className="h-10 w-full rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              Create another store
            </Button>
          </div>
        </div>

        <p className="mt-7 text-center text-xs text-muted-foreground">
          Need to manage an existing store?{" "}
          <Link
            href="/login"
            className="font-semibold text-primary underline-offset-4 transition-colors hover:text-primary/80 hover:underline focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:outline-none"
          >
            Sign in
          </Link>
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto flex w-full max-w-md flex-col">
      <div className="flex items-center justify-between gap-3">
        <WizardBrand />
        <span className="inline-flex shrink-0 items-center gap-2 rounded-full border border-primary/15 bg-primary/10 px-2.5 py-1 text-[9px] font-semibold tracking-[0.12em] whitespace-nowrap text-primary uppercase dark:border-primary/25 dark:bg-primary/15">
          <span className="size-1.5 rounded-full bg-brand-secondary" />
          Store setup
        </span>
      </div>

      <div className="mt-8">
        <h1 className="font-heading text-3xl font-extrabold tracking-tight text-foreground sm:text-[2.15rem]">
          Create Your Online Store
        </h1>
        <p className="mt-3 max-w-[24rem] text-sm leading-relaxed text-muted-foreground">
          Set up your online store in just a few simple steps.
        </p>
      </div>

      <div className="mt-6">
        <StepIndicator
          activeStep={stepIndex}
          maxVisitedStep={maxVisitedStep}
          onSelect={goToStep}
        />
      </div>

      <div className="mt-6 border-t border-border/60 pt-6">
        <p className="text-[10px] font-semibold tracking-[0.16em] text-primary uppercase">
          Step {activeStep.number} of 03
        </p>
        <h2 className="font-heading mt-2 text-lg font-bold tracking-tight text-foreground">
          {activeStep.title}
        </h2>
        <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
          {activeStep.description}
        </p>
      </div>

      {formError ? (
        <div
          id="create-store-error"
          role="alert"
          aria-live="polite"
          className="mt-5 flex items-start gap-2.5 rounded-xl border border-destructive/25 bg-destructive/10 p-3 text-xs leading-relaxed text-destructive dark:border-destructive/35 dark:bg-destructive/15"
        >
          <CircleAlert className="mt-0.5 size-4 shrink-0" />
          <span>{formError}</span>
        </div>
      ) : null}

      <form
        onSubmit={handleSubmit}
        noValidate
        aria-busy={isSubmitting}
        className="mt-6 flex flex-col gap-5"
      >
        {stepIndex === 0 ? (
          <>
            <div className="space-y-2">
              <Label htmlFor="storeName">
                Store Name
                <span aria-hidden className="text-destructive">
                  *
                </span>
              </Label>
              <div className="relative">
                <Store
                  aria-hidden
                  className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground/80"
                />
                <Input
                  id="storeName"
                  name="storeName"
                  autoComplete="organization"
                  placeholder="e.g. Nokshi Studio"
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
                  className="pl-10"
                />
              </div>
              <FieldError id="storeName-error" message={errors.storeName} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">
                Store Category
                <span aria-hidden className="text-destructive">
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
                >
                  <SelectValue placeholder="Choose a category" />
                </SelectTrigger>
                <SelectContent>
                  {STORE_CATEGORIES.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FieldError id="category-error" message={errors.category} />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between gap-3">
                <Label htmlFor="description">
                  Store Description
                  <span className="text-[10px] font-normal text-muted-foreground">
                    Optional
                  </span>
                </Label>
                <span className="text-[10px] tabular-nums text-muted-foreground/80">
                  {draft.description.length}/{STORE_DESCRIPTION_MAX}
                </span>
              </div>
              <Textarea
                id="description"
                name="description"
                placeholder="Tell customers what makes your store special."
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
                className="min-h-20"
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
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-3">
                <Label htmlFor="logo">Store Logo</Label>
                <span className="text-[10px] text-muted-foreground">
                  Optional
                </span>
              </div>

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
                <div className="flex items-center gap-3 rounded-xl border border-border/70 bg-background/60 p-3">
                  <div className="grid size-14 shrink-0 place-items-center overflow-hidden rounded-xl border border-border/60 bg-muted/50 p-1.5">
                    <Image
                      src={draft.logoDataUrl}
                      alt="Store logo preview"
                      width={96}
                      height={96}
                      unoptimized
                      className="max-h-full w-auto object-contain"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs font-semibold text-foreground">
                      {draft.logoFileName}
                    </p>
                    <p className="mt-0.5 text-[10px] text-muted-foreground">
                      Logo ready to upload
                    </p>
                    <div className="mt-1.5 flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => logoInputRef.current?.click()}
                        className="text-[11px] font-semibold text-primary underline-offset-4 hover:underline"
                      >
                        Replace
                      </button>
                      <button
                        type="button"
                        onClick={removeLogo}
                        className="inline-flex items-center gap-1 text-[11px] font-semibold text-muted-foreground transition-colors hover:text-destructive"
                      >
                        <Trash2 className="size-3" />
                        Remove
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
                    "flex w-full flex-col items-center justify-center gap-2 rounded-xl border border-dashed px-4 py-6 text-center transition-colors focus-visible:ring-3 focus-visible:ring-ring/20 focus-visible:outline-none",
                    isDraggingLogo
                      ? "border-primary bg-primary/10"
                      : "border-border/90 bg-background/50 hover:border-primary/40 hover:bg-primary/[0.04]"
                  )}
                >
                  <span className="grid size-9 place-items-center rounded-xl bg-primary/10 text-primary">
                    <UploadCloud className="size-4" />
                  </span>
                  <span className="text-xs font-semibold text-foreground">
                    Click to upload or drag and drop
                  </span>
                  <span
                    id="logo-hint"
                    className="text-[10px] text-muted-foreground"
                  >
                    PNG, JPG, WebP or SVG · up to 1 MB
                  </span>
                </button>
              )}
              <FieldError id="logo-error" message={errors.logo} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="brandColorHex">
                <Palette className="size-3.5 text-primary" />
                Brand Primary Color
                <span aria-hidden className="text-destructive">
                  *
                </span>
              </Label>
              <div className="flex items-center gap-2">
                <label
                  className="relative size-11 shrink-0 cursor-pointer overflow-hidden rounded-xl border border-input shadow-xs ring-offset-background focus-within:ring-3 focus-within:ring-ring/20"
                  title="Choose a custom color"
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
                    aria-label="Pick a custom brand color"
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
                  className="font-mono text-xs tracking-wide uppercase"
                />
              </div>

              <div className="flex flex-wrap items-center gap-1.5 pt-1 sm:gap-2">
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
                        "size-6 rounded-full border border-black/5 shadow-xs transition-transform hover:scale-110 focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:outline-none sm:size-7 dark:border-white/10",
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

            <div className="space-y-2">
              <Label htmlFor="subdomain">
                Store URL / Subdomain
                <span aria-hidden className="text-destructive">
                  *
                </span>
              </Label>
              <div
                className={cn(
                  "flex h-11 items-center rounded-xl border border-input bg-background/70 shadow-xs transition-[border-color,box-shadow] focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/20 dark:bg-input/25",
                  errors.subdomain &&
                    "border-destructive focus-within:border-destructive focus-within:ring-destructive/15"
                )}
              >
                <span
                  aria-hidden
                  className="pl-3.5 font-mono text-[11px] text-muted-foreground/70"
                >
                  https://
                </span>
                <Input
                  id="subdomain"
                  name="subdomain"
                  autoComplete="off"
                  autoCapitalize="none"
                  spellCheck={false}
                  placeholder="yourstore"
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
                  className="h-full rounded-none border-0 bg-transparent px-1 font-mono text-xs shadow-none focus-visible:border-transparent focus-visible:ring-0 dark:bg-transparent"
                />
                <span
                  aria-hidden
                  className="shrink-0 pr-3.5 font-mono text-[11px] text-muted-foreground/70"
                >
                  .biponon.com
                </span>
              </div>
              <div
                id="subdomain-hint"
                className="flex items-start gap-1.5 rounded-lg bg-muted/50 px-2.5 py-2 text-[10px] leading-relaxed text-muted-foreground"
              >
                <Globe className="mt-0.5 size-3 shrink-0 text-primary" />
                <span className="min-w-0">
                  Your store will be available at{" "}
                  <span className="font-semibold break-all text-foreground">
                    https://{storeUrl}
                  </span>
                  . Availability is confirmed when you create your store.
                </span>
              </div>
              <FieldError id="subdomain-error" message={errors.subdomain} />
            </div>
          </>
        ) : null}

        {stepIndex === 2 ? (
          <div className="space-y-3">
            <SummarySection title="Store details" onEdit={() => goToStep(0)}>
              <SummaryRow label="Store name">
                {draft.storeName.trim() || "Not provided"}
              </SummaryRow>
              <SummaryRow label="Category">
                {getCategoryLabel(draft.category) || "Not selected"}
              </SummaryRow>
              <SummaryRow label="Description">
                {draft.description.trim() ? (
                  <span className="whitespace-pre-wrap">
                    {draft.description.trim()}
                  </span>
                ) : (
                  <span className="text-muted-foreground">
                    No description added.
                  </span>
                )}
              </SummaryRow>
            </SummarySection>

            <SummarySection
              title="Brand & store URL"
              onEdit={() => goToStep(1)}
            >
              <SummaryRow label="Logo">
                {draft.logoDataUrl ? (
                  <span className="inline-flex items-center gap-2.5">
                    <span className="grid size-9 place-items-center overflow-hidden rounded-lg border border-border/60 bg-muted/50 p-1">
                      <Image
                        src={draft.logoDataUrl}
                        alt="Store logo preview"
                        width={64}
                        height={64}
                        unoptimized
                        className="max-h-full w-auto object-contain"
                      />
                    </span>
                    <span className="truncate text-xs text-muted-foreground">
                      {draft.logoFileName}
                    </span>
                  </span>
                ) : (
                  <span className="text-muted-foreground">Not uploaded</span>
                )}
              </SummaryRow>
              <SummaryRow label="Brand color">
                <span className="inline-flex items-center gap-2">
                  <span
                    className="size-4 rounded-full border border-black/10 shadow-xs dark:border-white/15"
                    style={{ backgroundColor: draft.brandColor }}
                  />
                  <span className="font-mono text-xs">
                    {draft.brandColor.toUpperCase()}
                  </span>
                </span>
              </SummaryRow>
              <SummaryRow label="Store URL">
                <span className="inline-flex items-start gap-1.5 font-mono text-xs break-all">
                  <Globe className="mt-0.5 size-3.5 shrink-0 text-primary" />
                  https://{storeUrl}
                </span>
              </SummaryRow>
            </SummarySection>
          </div>
        ) : null}

        {stepIndex < STEPS.length - 1 ? (
          <div className="flex items-center gap-2.5 pt-1">
            {stepIndex > 0 ? (
              <Button
                type="button"
                variant="outline"
                size="lg"
                onClick={goBack}
                disabled={isSubmitting}
                className="h-11 flex-1 rounded-xl border-border/80 bg-background/70 text-sm font-medium shadow-xs"
              >
                <ArrowLeft className="size-4" />
                Back
              </Button>
            ) : null}
            <Button
              type="submit"
              size="lg"
              disabled={isSubmitting}
              className="h-11 flex-[1.4] rounded-xl text-sm font-semibold text-white shadow-[0_14px_30px_-14px_rgba(0,151,107,0.85)] [background-image:var(--brand-gradient)] transition-all duration-200 hover:brightness-105 hover:text-white"
            >
              Continue
              <ArrowRight className="size-4 transition-transform duration-200 group-hover/button:translate-x-0.5" />
            </Button>
          </div>
        ) : (
          <div className="flex flex-col-reverse gap-2.5 pt-1 sm:flex-row">
            <Button
              type="button"
              variant="outline"
              size="lg"
              onClick={goBack}
              disabled={isSubmitting}
              className="h-11 rounded-xl border-border/80 bg-background/70 text-sm font-medium shadow-xs sm:flex-1"
            >
              <ArrowLeft className="size-4" />
              Back
            </Button>
            <Button
              type="button"
              size="lg"
              onClick={() => void handleCreateStore()}
              disabled={isSubmitting}
              className="h-11 rounded-xl text-sm font-semibold text-white shadow-[0_14px_30px_-14px_rgba(0,151,107,0.85)] [background-image:var(--brand-gradient)] transition-all duration-200 hover:brightness-105 hover:text-white sm:flex-[1.35]"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Creating your store...
                </>
              ) : (
                <>
                  Create My Store
                  <ArrowRight className="size-4" />
                </>
              )}
            </Button>
          </div>
        )}
      </form>

      <p className="mt-6 text-center text-xs text-muted-foreground">
        Already have a store?{" "}
        <Link
          href="/login"
          className="font-semibold text-primary underline-offset-4 transition-colors hover:text-primary/80 hover:underline focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:outline-none"
        >
          Sign in
        </Link>
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[10px] font-medium text-muted-foreground/80">
        <span className="inline-flex items-center gap-1.5">
          <ShieldCheck className="size-3 text-primary" />
          Your details stay encrypted
        </span>
        <span aria-hidden className="size-1 rounded-full bg-border" />
        <span className="inline-flex items-center gap-1.5">
          <Lock className="size-3 text-primary" />
          Secure store setup
        </span>
      </div>
    </div>
  );
}
