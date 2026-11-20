"use client";

import * as React from "react";
import { Accordion as AccordionPrimitive } from "@base-ui/react/accordion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

function Accordion({
  className,
  ...props
}: AccordionPrimitive.Root.Props) {
  return (
    <AccordionPrimitive.Root
      data-slot="accordion"
      className={cn("flex flex-col gap-3 sm:gap-4", className)}
      {...props}
    />
  );
}

function AccordionItem({
  className,
  ...props
}: AccordionPrimitive.Item.Props) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn(
        "group/item rounded-2xl border border-border/70 bg-card/70 backdrop-blur-sm transition-all duration-200 hover:border-primary/40 dark:border-white/10 dark:bg-card/40 dark:hover:border-primary/40 data-open:border-primary/40 data-open:shadow-[0_8px_24px_-12px_rgba(0,151,107,0.12)] dark:data-open:shadow-[0_8px_24px_-12px_rgba(0,151,107,0.2)]",
        className
      )}
      {...props}
    />
  );
}

function AccordionTrigger({
  className,
  children,
  ...props
}: AccordionPrimitive.Trigger.Props) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "group/trigger flex flex-1 items-center justify-between gap-4 px-5 py-4 text-left font-medium text-foreground transition-all outline-none select-none hover:text-primary focus-visible:ring-2 focus-visible:ring-ring rounded-2xl cursor-pointer",
          className
        )}
        {...props}
      >
        <span className="font-heading text-sm sm:text-base font-semibold leading-snug">
          {children}
        </span>
        <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary transition-transform duration-200 group-data-panel-open/trigger:rotate-180 dark:bg-primary/15">
          <ChevronDown className="size-4 shrink-0 transition-transform duration-200" />
        </div>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

function AccordionContent({
  className,
  children,
  ...props
}: AccordionPrimitive.Panel.Props) {
  return (
    <AccordionPrimitive.Panel
      data-slot="accordion-content"
      className={cn(
        "h-[var(--accordion-panel-height)] overflow-hidden text-sm text-muted-foreground transition-[height,opacity] duration-200 ease-out data-ending-style:h-0 data-ending-style:opacity-0 data-starting-style:h-0 data-starting-style:opacity-0",
        className
      )}
      {...props}
    >
      <div className="px-5 pb-5 pt-1 text-sm leading-relaxed text-muted-foreground sm:text-[15px] sm:leading-relaxed">
        {children}
      </div>
    </AccordionPrimitive.Panel>
  );
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
