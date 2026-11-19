"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/i18n/languageContext";
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
import { LanguageSwitcher } from "./languageSwitcher";
import { navLinks } from "./navLinks";

function isActiveRoute(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export function MobileNavbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { t } = useLanguage();

  return (
    <div className="flex w-full items-center justify-between lg:hidden">
      <BrandLogo />

      <div className="flex items-center gap-2">
        <LanguageSwitcher />

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger
            render={
              <Button
                variant="ghost"
                size="icon-lg"
                aria-label={t("nav.openMenu")}
              />
            }
          >
            <Menu className="size-5" />
          </SheetTrigger>

          <SheetContent side="right" className="w-[85%] max-w-sm p-0">
            <SheetHeader className="border-b p-5">
              <SheetTitle className="sr-only">{t("nav.menuTitle")}</SheetTitle>
              <SheetDescription className="sr-only">
                {t("nav.menuDescription")}
              </SheetDescription>
              <BrandLogo />
            </SheetHeader>

            <nav
              aria-label="Mobile navigation"
              className="flex-1 overflow-y-auto p-3"
            >
              <ul className="flex flex-col gap-1">
                {navLinks.map((link) => {
                  const active = isActiveRoute(pathname, link.href);

                  return (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        onClick={() => setOpen(false)}
                        aria-current={active ? "page" : undefined}
                        className={cn(
                          "flex items-center justify-between rounded-lg px-3 py-2.5 text-base font-medium transition-colors hover:bg-muted hover:text-brand",
                          active
                            ? "bg-[#00976B] text-white dark:text-black"
                            : "text-foreground",
                        )}
                      >
                        {t(link.key)}
                        <ArrowRight
                          className={cn(
                            "size-4",
                            active
                              ? "text-white dark:text-black"
                              : "text-muted-foreground",
                          )}
                        />
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <SheetFooter className="border-t p-5 flex flex-col gap-3">
              <div className="flex items-center justify-between px-1 py-1">
                <span className="text-sm font-medium text-muted-foreground">
                  {t("nav.languageLabel")}
                </span>
                <LanguageSwitcher />
              </div>

              <Button
                variant="outline"
                size="lg"
                className="h-11 w-full"
                nativeButton={false}
                render={
                  <Link href="/login" onClick={() => setOpen(false)} />
                }
              >
                {t("nav.login")}
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
                {t("nav.createWebsite")}
                <ArrowRight className="size-4" />
              </Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}
