import type { Metadata } from "next";
import { Hind_Siliguri, Inter } from "next/font/google";

import { LanguageProvider } from "@/lib/i18n/languageContext";
import { SmoothScrollProvider } from "@/components/providers/smoothScrollProvider";

import "./globals.css";

const inter = Inter({
  weight: ["400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-inter",
});

const hindSiliguri = Hind_Siliguri({
  weight: ["400", "500", "600", "700"],
  subsets: ["bengali"],
  variable: "--font-hind-siliguri",
});

export const metadata: Metadata = {
  title: "Biponon — Start Your Online Business",
  description:
    "Everything you need to create, manage, and grow your online store — all in one platform.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${hindSiliguri.variable} ${inter.className} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col">
        <LanguageProvider>
          <SmoothScrollProvider>{children}</SmoothScrollProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
