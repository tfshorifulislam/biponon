import {
  getStoreUrl,
  isStoreDraftComplete,
  validateStoreDraft,
  type StoreDraft,
} from "./validation";

export interface CreateStoreSuccess {
  redirectTo?: string;
  storeUrl: string;
}

interface CreateStoreApiResponse {
  message?: unknown;
  redirectTo?: unknown;
  storeUrl?: unknown;
}

export class CreateStoreError extends Error {
  status: number;
  fieldErrors: Record<string, string> | null;

  constructor(
    message: string,
    status: number,
    fieldErrors: Record<string, string> | null = null
  ) {
    super(message);
    this.name = "CreateStoreError";
    this.status = status;
    this.fieldErrors = fieldErrors;
  }
}

function getMessage(data: CreateStoreApiResponse, fallback: string) {
  return typeof data.message === "string" && data.message.trim()
    ? data.message
    : fallback;
}

function getRedirectTarget(value: unknown) {
  if (typeof value !== "string" || !value.trim()) return undefined;

  if (value.startsWith("/")) return value;

  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:"
      ? url.toString()
      : undefined;
  } catch {
    return undefined;
  }
}

function getFieldErrors(value: unknown) {
  if (!value || typeof value !== "object") return null;

  const entries = Object.entries(value as Record<string, unknown>).filter(
    (entry): entry is [string, string] => typeof entry[1] === "string"
  );

  return entries.length > 0 ? Object.fromEntries(entries) : null;
}

export async function createStore(
  draft: StoreDraft
): Promise<CreateStoreSuccess> {
  if (!isStoreDraftComplete(draft)) {
    const errors = validateStoreDraft(draft);
    throw new CreateStoreError(
      "Please complete the highlighted fields before creating your store.",
      400,
      Object.fromEntries(
        Object.entries(errors).filter(
          (entry): entry is [string, string] => Boolean(entry[1])
        )
      )
    );
  }

  const response = await fetch("/api/create-website", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    credentials: "same-origin",
    body: JSON.stringify({
      storeName: draft.storeName.trim(),
      category: draft.category,
      description: draft.description.trim(),
      logoDataUrl: draft.logoDataUrl,
      logoFileName: draft.logoFileName,
      brandColor: draft.brandColor.toLowerCase(),
      subdomain: draft.subdomain.trim().toLowerCase(),
      storeUrl: getStoreUrl(draft.subdomain),
    }),
  });

  let data: CreateStoreApiResponse = {};

  try {
    const parsed = await response.json();
    if (parsed && typeof parsed === "object") {
      data = parsed as CreateStoreApiResponse;
    }
  } catch {
    data = {};
  }

  if (!response.ok) {
    throw new CreateStoreError(
      getMessage(data, "We couldn't create your store. Please try again."),
      response.status,
      getFieldErrors((data as Record<string, unknown>).fieldErrors)
    );
  }

  return {
    redirectTo: getRedirectTarget(data.redirectTo),
    storeUrl:
      typeof data.storeUrl === "string" && data.storeUrl.trim()
        ? data.storeUrl
        : getStoreUrl(draft.subdomain),
  };
}
