"use client";

import React from "react";
import { useLanguage } from "@/lib/i18n/languageContext";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

interface FaqItemConfig {
  id: string;
  key: "q1" | "q2" | "q3" | "q4" | "q5" | "q6" | "q7" | "q8" | "q9" | "q10";
  number: string;
  defaultQuestion: string;
  defaultAnswer: string;
}

const FAQ_ITEMS: FaqItemConfig[] = [
  {
    id: "q1",
    key: "q1",
    number: "01",
    defaultQuestion: "What is Biponon?",
    defaultAnswer:
      "Biponon is an e-commerce platform that helps you create, customize, and manage your own online store without needing technical knowledge.",
  },
  {
    id: "q2",
    key: "q2",
    number: "02",
    defaultQuestion: "Do I need coding skills to create my online store?",
    defaultAnswer:
      "No. You can build and customize your online store using Biponon's easy-to-use tools without writing any code.",
  },
  {
    id: "q3",
    key: "q3",
    number: "03",
    defaultQuestion: "Can I use my own custom domain?",
    defaultAnswer:
      "Yes. Biponon supports custom domains, allowing you to build your store under your own brand identity.",
  },
  {
    id: "q4",
    key: "q4",
    number: "04",
    defaultQuestion: "Can I manage products and orders from one place?",
    defaultAnswer:
      "Yes. You can manage products, track orders, and handle your store operations from a single dashboard.",
  },
  {
    id: "q5",
    key: "q5",
    number: "05",
    defaultQuestion: "Does Biponon support Cash on Delivery and online payments?",
    defaultAnswer:
      "Yes. Biponon supports Cash on Delivery (COD) and available payment gateway integrations to help you accept payments from customers.",
  },
  {
    id: "q6",
    key: "q6",
    number: "06",
    defaultQuestion: "Can I integrate courier services with my store?",
    defaultAnswer:
      "Yes. Biponon provides courier integration features to simplify delivery management and order fulfillment.",
  },
  {
    id: "q7",
    key: "q7",
    number: "07",
    defaultQuestion: "Is there a free trial available?",
    defaultAnswer:
      "Yes. You can start with a 3-day free trial and explore the platform before choosing a subscription plan.",
  },
  {
    id: "q8",
    key: "q8",
    number: "08",
    defaultQuestion: "Can I customize my online store's design?",
    defaultAnswer:
      "Yes. You can choose from available templates and customize your storefront to match your brand identity.",
  },
  {
    id: "q9",
    key: "q9",
    number: "09",
    defaultQuestion: "Can I track my store's performance?",
    defaultAnswer:
      "Yes. Biponon provides an analytics dashboard to help you monitor your store's performance and understand your business activity.",
  },
  {
    id: "q10",
    key: "q10",
    number: "10",
    defaultQuestion: "What happens after my free trial ends?",
    defaultAnswer:
      "After your 3-day free trial, you can choose a subscription plan that suits your business needs to continue using the platform.",
  },
];

// Split into two equal 5-item columns for desktop
const COLUMN_1 = FAQ_ITEMS.slice(0, 5);
const COLUMN_2 = FAQ_ITEMS.slice(5, 10);

export function FaqSection() {
  const { t, language } = useLanguage();

  return (
    <section
      id="faq"
      aria-label="Frequently Asked Questions"
      className="relative isolate w-full px-4 pt-0 pb-16 sm:px-6 sm:pb-20 lg:px-8 lg:pb-24"
    >
      <div className="mx-auto w-full max-w-7xl">
        {/* Section Heading - Exact Features Section Design System */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-primary shadow-xs backdrop-blur-sm dark:border-primary/25 dark:bg-primary/15">
            <span className="size-1.5 shrink-0 rounded-full bg-brand-secondary animate-pulse" />
            {t("faq.badge") || "FREQUENTLY ASKED QUESTIONS"}
          </span>

          <h2 className="font-heading mt-5 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            <span className="block">
              {t("faq.headingLine1") || "Frequently Asked"}
            </span>
            <span className="brand-gradient-text inline">
              {t("faq.headingGradient") || "Questions"}
            </span>
          </h2>

          <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg sm:leading-relaxed">
            {t("faq.description") ||
              "Everything you need to know about Biponon, store setup, features, and managing your business."}
          </p>
        </div>

        {/* 10 FAQs in 2-Column Desktop Grid / 1-Column Tablet & Mobile Layout */}
        <div className="mt-12 sm:mt-16 w-full">
          <Accordion
            multiple
            defaultValue={["q1"]}
            className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 lg:gap-6 items-start w-full"
          >
            {/* Column 1: Items 1 - 5 */}
            <div className="flex flex-col gap-4 sm:gap-5 w-full">
              {COLUMN_1.map((item) => {
                const question =
                  t(`faq.items.${item.key}.question`) || item.defaultQuestion;
                const answer =
                  t(`faq.items.${item.key}.answer`) || item.defaultAnswer;

                return (
                  <AccordionItem key={item.id} value={item.id}>
                    <AccordionTrigger className="gap-3 sm:gap-4">
                      <div className="flex items-center gap-2.5 sm:gap-3 text-left">
                        <span className="shrink-0 text-xs font-mono font-bold text-primary/80">
                          {item.number}
                        </span>
                        <span
                          className={`font-heading text-sm sm:text-base font-semibold text-foreground ${
                            language === "bn" ? "font-bangla" : ""
                          }`}
                        >
                          {question}
                        </span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <p
                        className={`leading-relaxed text-muted-foreground ${
                          language === "bn" ? "font-bangla" : ""
                        }`}
                      >
                        {answer}
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </div>

            {/* Column 2: Items 6 - 10 */}
            <div className="flex flex-col gap-4 sm:gap-5 w-full">
              {COLUMN_2.map((item) => {
                const question =
                  t(`faq.items.${item.key}.question`) || item.defaultQuestion;
                const answer =
                  t(`faq.items.${item.key}.answer`) || item.defaultAnswer;

                return (
                  <AccordionItem key={item.id} value={item.id}>
                    <AccordionTrigger className="gap-3 sm:gap-4">
                      <div className="flex items-center gap-2.5 sm:gap-3 text-left">
                        <span className="shrink-0 text-xs font-mono font-bold text-primary/80">
                          {item.number}
                        </span>
                        <span
                          className={`font-heading text-sm sm:text-base font-semibold text-foreground ${
                            language === "bn" ? "font-bangla" : ""
                          }`}
                        >
                          {question}
                        </span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <p
                        className={`leading-relaxed text-muted-foreground ${
                          language === "bn" ? "font-bangla" : ""
                        }`}
                      >
                        {answer}
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </div>
          </Accordion>
        </div>

        {/* Bottom Help / Support Prompt */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-muted/40 px-4 py-2 text-xs sm:text-sm text-muted-foreground shadow-2xs backdrop-blur-sm dark:border-white/10 dark:bg-card/50">
            <HelpCircle className="size-4 text-primary shrink-0" />
            <span className={language === "bn" ? "font-bangla" : ""}>
              {language === "bn"
                ? "আরও কোনো প্রশ্ন আছে? আমাদের সাপোর্ট টিম ২৪/৭ সহায়তার জন্য প্রস্তুত।"
                : "Still have questions? Our support team is ready to assist you 24/7."}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
