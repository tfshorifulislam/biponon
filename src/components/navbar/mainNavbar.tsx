import { DesktopNavbar } from "./desktopNavbar";
import { MobileNavbar } from "./mobileNavbar";

export function MainNavbar() {
  return (
    <header className="absolute inset-x-0 top-0 z-50 w-full px-4 pt-3 sm:px-6 sm:pt-4 lg:px-8 lg:pt-4">
      <div className="mx-auto flex h-12 w-full max-w-7xl items-center justify-between rounded-full border border-white/50 bg-white/65 px-3 shadow-[0_12px_40px_-20px_rgba(15,23,42,0.35)] backdrop-blur-xl dark:border-white/10 dark:bg-black/25 sm:h-14 sm:px-4 lg:h-16 lg:px-6">
        <DesktopNavbar />
        <MobileNavbar />
      </div>
    </header>
  );
}
