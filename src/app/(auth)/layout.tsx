import type { Metadata } from "next";

import { StandaloneTopControls } from "./standalone-controls";

export const metadata: Metadata = {
  // Page-specific metadata will override
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative isolate flex min-h-dvh w-full flex-col justify-between overflow-x-clip bg-background">
      <StandaloneTopControls />
      <main className="relative z-10 flex w-full flex-1 flex-col justify-center">
        {children}
      </main>
    </div>
  );
}
