import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { BrandLogo } from "./brandLogo";
import { navLinks } from "./navLinks";

export function DesktopNavbar() {
  return (
    <nav
      aria-label="Main navigation"
      className="hidden w-full items-center justify-between gap-8 lg:flex"
    >
      <BrandLogo />

      <ul className="flex items-center gap-1">
        {navLinks.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              {link.label}
            </Link>
          </li>
        ))}
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
