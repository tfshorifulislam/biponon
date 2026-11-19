"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { BrandLogo } from "./brandLogo";
import { navLinks } from "./navLinks";

export function MobileNavbar() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex w-full items-center justify-between lg:hidden">
      <BrandLogo />

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger
          render={
            <Button
              variant="ghost"
              size="icon-lg"
              aria-label="Open navigation menu"
            />
          }
        >
          <Menu className="size-5" />
        </SheetTrigger>

        <SheetContent side="right" className="w-[85%] max-w-sm p-0">
          <SheetHeader className="border-b p-5">
            <SheetTitle className="sr-only">Navigation menu</SheetTitle>
            <SheetDescription className="sr-only">
              Browse pages and account actions
            </SheetDescription>
            <BrandLogo />
          </SheetHeader>

          <nav
            aria-label="Mobile navigation"
            className="flex-1 overflow-y-auto p-3"
          >
            <ul className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between rounded-lg px-3 py-2.5 text-base font-medium text-foreground transition-colors hover:bg-muted hover:text-brand"
                  >
                    {link.label}
                    <ArrowRight className="size-4 text-muted-foreground" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <SheetFooter className="border-t p-5">
            <Button
              variant="outline"
              size="lg"
              className="h-11 w-full"
              nativeButton={false}
              render={
                <Link href="/login" onClick={() => setOpen(false)} />
              }
            >
              Log in
            </Button>
            <Button
              size="lg"
              className="h-11 w-full"
              nativeButton={false}
              render={
                <Link
                  href="/create-website"
                  onClick={() => setOpen(false)}
                />
              }
            >
              Create your website
              <ArrowRight className="size-4" />
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}
