import { NextResponse } from "next/server";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function getMessage(data: unknown, fallback: string) {
  if (!data || typeof data !== "object") return fallback;
  const message = (data as Record<string, unknown>).message;
  return typeof message === "string" && message.trim() ? message : fallback;
}

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { message: "The sign-in request was invalid. Please try again." },
      { status: 400 }
    );
  }

  const payload =
    body && typeof body === "object" ? (body as Record<string, unknown>) : {};
  const email = typeof payload.email === "string" ? payload.email.trim() : "";
  const password =
    typeof payload.password === "string" ? payload.password : "";
  const remember = payload.remember === true;

  if (!EMAIL_PATTERN.test(email)) {
    return NextResponse.json(
      { message: "Please enter a valid email address." },
      { status: 400 }
    );
  }

  if (password.length < 6) {
    return NextResponse.json(
      { message: "Password must be at least 6 characters." },
      { status: 400 }
    );
  }

  const authEndpoint = process.env.BIPONON_AUTH_ENDPOINT?.trim();

  if (!authEndpoint) {
    return NextResponse.json(
      {
        message:
          "Sign-in is not connected to Biponon's authentication service in this environment.",
      },
      { status: 503 }
    );
  }

  try {
    const upstream = await fetch(authEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ email, password, remember }),
      cache: "no-store",
    });

    const data = await upstream.json().catch(() => null);

    const response = NextResponse.json(
      upstream.ok
        ? {
            ...(data && typeof data === "object" ? data : {}),
            redirectTo:
              data &&
              typeof data === "object" &&
              typeof (data as Record<string, unknown>).redirectTo === "string" &&
              ((data as Record<string, unknown>).redirectTo as string).startsWith(
                "/"
              )
                ? (data as Record<string, unknown>).redirectTo
                : "/",
          }
        : {
            message: getMessage(
              data,
              "We couldn't sign you in. Check your details and try again."
            ),
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
          "We couldn't reach the authentication service. Please try again in a moment.",
      },
      { status: 502 }
    );
  }
}
