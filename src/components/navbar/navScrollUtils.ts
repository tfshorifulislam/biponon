import { HOMEPAGE_SECTION_IDS } from "./navLinks";

/**
 * Accurately determines the current sticky navbar height.
 * Desktop: 80px (pt-4 16px + h-16 64px)
 * Tablet: 72px (pt-4 16px + h-14 56px)
 * Mobile: 60px (pt-3 12px + h-12 48px)
 */
export function getNavbarHeight(): number {
  if (typeof document === "undefined") return 80;
  const header = document.querySelector("header");
  if (header) {
    const height = header.offsetHeight || header.getBoundingClientRect().height;
    if (height > 0) return Math.round(height);
  }
  if (typeof window !== "undefined") {
    if (window.innerWidth < 640) return 60;
    if (window.innerWidth < 1024) return 72;
  }
  return 80;
}

/**
 * Calculates the exact scroll destination for a section so that the
 * actual top of the target section is positioned just below the sticky navbar.
 *
 * For the "hero" section (Home), it scrolls directly to 0 (top of viewport).
 */
export function getSectionScrollTop(target: HTMLElement | string): number {
  if (typeof document === "undefined") return 0;
  const el =
    typeof target === "string"
      ? (document.querySelector(target) as HTMLElement | null)
      : target;
  if (!el) return 0;

  // Hero section is at the very top of the page
  if (el.id === "hero") return 0;

  const rect = el.getBoundingClientRect();
  const absoluteTop = rect.top + window.scrollY;
  const navbarHeight = getNavbarHeight();

  // Scroll position so that the section's top is positioned just below the sticky navbar:
  return Math.max(0, Math.round(absoluteTop - navbarHeight));
}

/**
 * Calculates the currently active homepage section based on the
 * same navbar-adjusted reference position.
 */
export function getActiveHomepageSection(): string {
  if (typeof window === "undefined") return "hero";

  // When at or near the very top of the page, hero is active
  if (window.scrollY < 80) {
    return "hero";
  }

  // When scrolled near the bottom of the page, FAQ (the last nav section) is active
  if (
    window.innerHeight + window.scrollY >=
    document.documentElement.scrollHeight - 60
  ) {
    return "faq";
  }

  const navbarHeight = getNavbarHeight();
  // Reference position uses the same navbar-adjusted offset plus a small tolerance buffer (12px)
  const referenceY = window.scrollY + navbarHeight + 12;

  // Check sections from bottom to top
  for (let i = HOMEPAGE_SECTION_IDS.length - 1; i >= 0; i--) {
    const id = HOMEPAGE_SECTION_IDS[i];
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY;
      if (referenceY >= top) {
        return id;
      }
    }
  }

  return "hero";
}
