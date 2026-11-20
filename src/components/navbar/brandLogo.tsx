"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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
      className="group flex shrink-0 items-center gap-2.5"
    >
      <span className="grid size-9 place-items-center rounded-xl bg-primary text-base font-bold text-primary-foreground shadow-sm transition-transform group-hover:scale-105">
        b
      </span>
      <span className="font-heading text-xl font-bold tracking-tight text-foreground">
        biponon
      </span>
    </Link>
  );
}
