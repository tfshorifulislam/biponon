import { NextResponse } from "next/server";

import {
  getStoreUrl,
  validateStoreDraft,
  type StoreDraft,
} from "@/lib/website/validation";

function getMessage(data: unknown, fallback: string) {
  if (!data || typeof data !== "object") return fallback;
  const message = (data as Record<string, unknown>).message;
  return typeof message === "string" && message.trim() ? message : fallback;
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

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { message: "The store details were invalid. Please try again." },
      { status: 400 }
    );
  }

  const payload =
    body && typeof body === "object" ? (body as Record<string, unknown>) : {};

  const draft: StoreDraft = {
    storeName:
      typeof payload.storeName === "string" ? payload.storeName.trim() : "",
    category:
      typeof payload.category === "string" ? payload.category.trim() : "",
    description:
      typeof payload.description === "string"
        ? payload.description.trim()
        : "",
    logoDataUrl:
      typeof payload.logoDataUrl === "string" && payload.logoDataUrl.trim()
        ? payload.logoDataUrl
        : null,
    logoFileName:
      typeof payload.logoFileName === "string" && payload.logoFileName.trim()
        ? payload.logoFileName.trim()
        : null,
    brandColor:
      typeof payload.brandColor === "string"
        ? payload.brandColor.trim().toLowerCase()
        : "",
    subdomain:
      typeof payload.subdomain === "string"
        ? payload.subdomain.trim().toLowerCase()
        : "",
  };

  const errors = validateStoreDraft(draft);
  const fieldErrors = Object.fromEntries(
    Object.entries(errors).filter(
      (entry): entry is [string, string] => Boolean(entry[1])
    )
  );

  if (Object.keys(fieldErrors).length > 0) {
    return NextResponse.json(
      {
        message: "Please complete the highlighted fields before creating your store.",
        fieldErrors,
      },
      { status: 400 }
    );
  }

  const storeEndpoint = process.env.BIPONON_CREATE_STORE_ENDPOINT?.trim();

  if (!storeEndpoint) {
    return NextResponse.json(
      {
        message:
          "Store creation is not connected to Biponon's store service in this environment.",
      },
      { status: 503 }
    );
  }

  try {
    const upstream = await fetch(storeEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        ...draft,
        storeUrl: getStoreUrl(draft.subdomain),
      }),
      cache: "no-store",
    });

    const data = await upstream.json().catch(() => null);
    const upstreamObject =
      data && typeof data === "object"
        ? (data as Record<string, unknown>)
        : {};

    const response = NextResponse.json(
      upstream.ok
        ? {
            ...upstreamObject,
            redirectTo: getRedirectTarget(upstreamObject.redirectTo),
            storeUrl:
              typeof upstreamObject.storeUrl === "string" &&
              upstreamObject.storeUrl.trim()
                ? upstreamObject.storeUrl
                : getStoreUrl(draft.subdomain),
          }
        : {
            message: getMessage(
              data,
              "We couldn't create your store. Please try again."
            ),
            fieldErrors:
              upstreamObject.fieldErrors &&
              typeof upstreamObject.fieldErrors === "object"
                ? upstreamObject.fieldErrors
                : undefined,
          },
      { status: upstream.status }
    );

    const headersWithCookies = upstream.headers as Headers & {
      getSetCookie?: () => string[];
    };

    for (const cookie of headersWithCookies.getSetCookie?.() ?? []) {
      response.headers.append("set-cookie", cookie);
    }

    return response;
  } catch {
    return NextResponse.json(
      {
        message:
          "We couldn't reach the store service. Please try again in a moment.",
      },
      { status: 502 }
    );
  }
}
