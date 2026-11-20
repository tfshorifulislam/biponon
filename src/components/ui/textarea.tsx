import * as React from "react";

import { cn } from "@/lib/utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex min-h-24 w-full min-w-0 resize-y rounded-xl border border-input bg-background/70 px-3.5 py-3 text-sm text-foreground shadow-xs transition-[color,box-shadow,border-color,background-color] outline-none placeholder:text-muted-foreground/65 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 dark:bg-input/25",
        "focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/20",
        "aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/15 dark:aria-invalid:border-destructive/60 dark:aria-invalid:ring-destructive/25",
        className
      )}
      {...props}
    />
  );
}

export { Textarea };
