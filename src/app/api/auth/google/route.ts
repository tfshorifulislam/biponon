import { connection, NextResponse } from "next/server";

export async function GET() {
  await connection();

  const url = process.env.BIPONON_GOOGLE_AUTH_URL?.trim();

  if (!url) {
    return NextResponse.json(
      {
        message:
          "Google sign-in is not connected to Biponon's authentication service in this environment.",
      },
      { status: 503 }
    );
  }

  try {
    const parsed = new URL(url);
    if (parsed.protocol !== "https:" && parsed.protocol !== "http:") {
      throw new Error("Unsupported protocol");
    }
  } catch {
    return NextResponse.json(
      { message: "Google sign-in is misconfigured. Please contact support." },
      { status: 500 }
    );
  }

  return NextResponse.json({ url });
}
