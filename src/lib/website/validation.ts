export const STORE_CATEGORIES = [
  { value: "fashion-apparel", label: "Fashion & Apparel" },
  { value: "electronics-gadgets", label: "Electronics & Gadgets" },
  { value: "beauty-cosmetics", label: "Beauty & Cosmetics" },
  { value: "organic-food", label: "Organic Food" },
  { value: "home-decor", label: "Home Decor" },
  { value: "other", label: "Other" },
] as const;

export type StoreCategoryValue = (typeof STORE_CATEGORIES)[number]["value"];

export interface StoreDraft {
  storeName: string;
  category: string;
  description: string;
  logoDataUrl: string | null;
  logoFileName: string | null;
  brandColor: string;
  subdomain: string;
}

export interface StoreFieldErrors {
  storeName?: string;
  category?: string;
  description?: string;
  logo?: string;
  brandColor?: string;
  subdomain?: string;
}

export const STORE_NAME_MAX = 60;
export const STORE_DESCRIPTION_MAX = 280;
export const SUBDOMAIN_MIN = 3;
export const SUBDOMAIN_MAX = 30;
export const LOGO_MAX_BYTES = 1024 * 1024;

export const RESERVED_SUBDOMAINS = new Set([
  "www",
  "api",
  "app",
  "admin",
  "mail",
  "support",
  "help",
  "status",
  "dashboard",
  "login",
  "signup",
  "checkout",
  "store",
  "shop",
  "blog",
  "docs",
  "biponon",
]);

const HEX_COLOR_PATTERN = /^#[0-9a-f]{6}$/i;
const SUBDOMAIN_PATTERN = /^[a-z0-9](?:[a-z0-9-]{1,28}[a-z0-9])$/;
const DATA_URL_PATTERN =
  /^data:image\/(?:png|jpeg|webp|svg\+xml);base64,[a-z0-9+/=\s]+$/i;

export function slugify(value: string) {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/-{2,}/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, SUBDOMAIN_MAX)
    .replace(/-+$/g, "");
}

export function sanitizeSubdomain(value: string) {
  return slugify(value);
}

export function getStoreUrl(subdomain: string) {
  const clean = subdomain.trim().toLowerCase();
  return clean ? `${clean}.biponon.com` : "yourstore.biponon.com";
}

export function getCategoryLabel(value: string) {
  return STORE_CATEGORIES.find((category) => category.value === value)?.label ?? "";
}

export function validateStoreName(value: string): string | undefined {
  const clean = value.trim();

  if (!clean) return "Store name is required.";
  if (clean.length < 2) return "Store name must be at least 2 characters.";
  if (clean.length > STORE_NAME_MAX) {
    return `Store name must be ${STORE_NAME_MAX} characters or fewer.`;
  }

  return undefined;
}

export function validateCategory(value: string): string | undefined {
  if (!value) return "Please choose a store category.";
  if (!STORE_CATEGORIES.some((category) => category.value === value)) {
    return "Please choose a valid store category.";
  }
  return undefined;
}

export function validateDescription(value: string): string | undefined {
  if (value.length > STORE_DESCRIPTION_MAX) {
    return `Description must be ${STORE_DESCRIPTION_MAX} characters or fewer.`;
  }
  return undefined;
}

export function validateBrandColor(value: string): string | undefined {
  if (!value.trim()) return "Please choose a brand color.";
  if (!HEX_COLOR_PATTERN.test(value.trim())) {
    return "Use a valid 6-digit hex color, such as #00976B.";
  }
  return undefined;
}

export function validateSubdomain(value: string): string | undefined {
  const clean = value.trim().toLowerCase();

  if (!clean) return "Store URL is required.";
  if (clean.length < SUBDOMAIN_MIN) {
    return `Store URL must be at least ${SUBDOMAIN_MIN} characters.`;
  }
  if (clean.length > SUBDOMAIN_MAX) {
    return `Store URL must be ${SUBDOMAIN_MAX} characters or fewer.`;
  }
  if (!SUBDOMAIN_PATTERN.test(clean)) {
    return "Use lowercase letters, numbers, and single hyphens only.";
  }
  if (clean.includes("--")) {
    return "Store URL cannot contain consecutive hyphens.";
  }
  if (RESERVED_SUBDOMAINS.has(clean)) {
    return "This store URL is reserved. Please choose another.";
  }

  return undefined;
}

export function validateLogo(value: string | null): string | undefined {
  if (!value) return undefined;

  if (!DATA_URL_PATTERN.test(value)) {
    return "Upload a PNG, JPG, WebP, or SVG image.";
  }
  if (value.length > LOGO_MAX_BYTES * 1.4) {
    return "Logo must be 1 MB or smaller.";
  }

  return undefined;
}

export function validateStepOne(draft: StoreDraft): StoreFieldErrors {
  return {
    storeName: validateStoreName(draft.storeName),
    category: validateCategory(draft.category),
    description: validateDescription(draft.description),
  };
}

export function validateStepTwo(draft: StoreDraft): StoreFieldErrors {
  return {
    logo: validateLogo(draft.logoDataUrl),
    brandColor: validateBrandColor(draft.brandColor),
    subdomain: validateSubdomain(draft.subdomain),
  };
}

export function validateStoreDraft(draft: StoreDraft): StoreFieldErrors {
  return {
    ...validateStepOne(draft),
    ...validateStepTwo(draft),
  };
}

export function isStoreDraftComplete(draft: StoreDraft) {
  return Object.values(validateStoreDraft(draft)).every((error) => !error);
}
