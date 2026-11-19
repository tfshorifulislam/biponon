"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { BrandLogo } from "./brandLogo";
import { navLinks } from "./navLinks";

function isActiveRoute(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export function DesktopNavbar() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Main navigation"
      className="hidden w-full items-center justify-between gap-8 lg:flex"
    >
      <BrandLogo />

      <ul className="flex items-center gap-1">
        {navLinks.map((link) => {
          const active = isActiveRoute(pathname, link.href);

          return (
            <li key={link.href}>
              <Link
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground",
                  active
                    ? "bg-[#00976B] text-white dark:text-black"
                    : "text-muted-foreground",
                )}
              >
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>

      <div
        role="group"
        aria-label="Account actions"
        className="flex items-center gap-1 rounded-full border border-border/60 bg-muted/50 p-1 dark:border-white/10 dark:bg-white/5"
      >
        <Button
          variant="ghost"
          className="h-10 rounded-full px-4 text-muted-foreground transition-all hover:bg-background/70 hover:text-foreground dark:hover:bg-white/10"
          nativeButton={false}
          render={<Link href="/login" />}
        >
          Log in
        </Button>
        <Button
          className="h-10 rounded-full bg-primary px-4 text-white shadow-[0_6px_16px_-8px_rgba(0,151,107,0.6)] transition-all [background-image:var(--brand-gradient)] hover:text-white hover:shadow-[0_8px_20px_-8px_rgba(0,151,107,0.7)] hover:brightness-[1.03]"
          nativeButton={false}
          render={<Link href="/create-website" />}
        >
          Create your website
          <ArrowUpRight className="size-4" />
        </Button>
      </div>
    </nav>
  );
}
