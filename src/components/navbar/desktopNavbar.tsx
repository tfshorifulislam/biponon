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
                    ? "bg-brand-soft text-brand"
                    : "text-muted-foreground",
                )}
              >
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>

      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          className="h-10 px-4"
          nativeButton={false}
          render={<Link href="/login" />}
        >
          Log in
        </Button>
        <Button
          className="h-10 px-4"
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
