import { DesktopNavbar } from "./desktopNavbar";
import { MobileNavbar } from "./mobileNavbar";

export function MainNavbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 supports-backdrop-filter:backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <DesktopNavbar />
        <MobileNavbar />
      </div>
    </header>
  );
}
