export interface SignInCredentials {
  email: string;
  password: string;
  remember: boolean;
}

export interface SignInSuccess {
  redirectTo: string;
}

interface AuthApiResponse {
  message?: unknown;
  redirectTo?: unknown;
  url?: unknown;
}

export class AuthRequestError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "AuthRequestError";
    this.status = status;
  }
}

function getMessage(data: AuthApiResponse, fallback: string) {
  return typeof data.message === "string" && data.message.trim()
    ? data.message
    : fallback;
}

async function readJson(response: Response): Promise<AuthApiResponse> {
  try {
    const data = await response.json();
    return data && typeof data === "object" ? (data as AuthApiResponse) : {};
  } catch {
    return {};
  }
}

export async function signInWithEmail(
  credentials: SignInCredentials
): Promise<SignInSuccess> {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    credentials: "same-origin",
    body: JSON.stringify(credentials),
  });

  const data = await readJson(response);

  if (!response.ok) {
    throw new AuthRequestError(
      getMessage(data, "We couldn't sign you in. Please try again."),
      response.status
    );
  }

  return {
    redirectTo:
      typeof data.redirectTo === "string" && data.redirectTo.startsWith("/")
        ? data.redirectTo
        : "/",
  };
}

export async function getGoogleSignInUrl(): Promise<string> {
  const response = await fetch("/api/auth/google", {
    method: "GET",
    headers: { Accept: "application/json" },
    credentials: "same-origin",
  });

  const data = await readJson(response);

  if (!response.ok || typeof data.url !== "string") {
    throw new AuthRequestError(
      getMessage(data, "Google sign-in is unavailable right now."),
      response.status
    );
  }

  return data.url;
}
