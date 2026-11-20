"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

import { useSmoothScroll } from "@/components/providers/smoothScrollProvider";
import { getSectionScrollTop } from "./navScrollUtils";

interface BrandLogoProps {
  onNavigate?: () => void;
}

export function BrandLogo({ onNavigate }: BrandLogoProps) {
  const pathname = usePathname();
  const { scrollTo } = useSmoothScroll();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    onNavigate?.();

    if (pathname === "/") {
      e.preventDefault();

      const heroEl = document.getElementById("hero");
      const targetScroll = heroEl ? getSectionScrollTop(heroEl) : 0;

      scrollTo(targetScroll, { duration: 1.0 });

      if (typeof window !== "undefined" && window.location.hash) {
        window.history.pushState(null, "", "/");
      }
    }
  };

  return (
    <Link
      href="/"
      onClick={handleClick}
      aria-label="Biponon home"
      className="group flex shrink-0 items-center"
    >
      {/* Light Theme Logo */}
      <Image
        src="/logo2.png"
        alt="Biponon"
        width={140}
        height={40}
        priority
        className="block h-6 w-auto object-contain transition-transform group-hover:scale-105 sm:h-7 md:h-9 dark:hidden"
      />

      {/* Dark Theme Logo */}
      <Image
        src="/logo.png"
        alt="Biponon"
        width={140}
        height={40}
        priority
        className="hidden h-6 w-auto object-contain transition-transform group-hover:scale-105 sm:h-7 md:h-9 dark:block"
      />
    </Link>
  );
}