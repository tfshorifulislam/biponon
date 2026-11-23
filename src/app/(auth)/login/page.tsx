import type { Metadata } from "next";

import { LoginView } from "@/components/auth/login-view";

export const metadata: Metadata = {
  title: "Sign In - Biponon",
  description:
    "Sign in to your Biponon merchant account to manage your storefront, products, orders, and business growth.",
};

export default function LoginPage() {
  return <LoginView />;
}
