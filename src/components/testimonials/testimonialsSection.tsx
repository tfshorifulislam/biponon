"use client";

import React from "react";
import { useLanguage } from "@/lib/i18n/languageContext";
import { Card } from "@/components/ui/card";
import { Star } from "lucide-react";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  avatarText: string;
  review: string;
  rating: number;
}

const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: 1,
    name: "নুসরাত জাহান",
    role: "অনলাইন ফ্যাশন উদ্যোক্তা",
    avatarText: "নু",
    review:
      "আগে ফেসবুক পেজ থেকেই সব অর্ডার ম্যানেজ করতাম। এখন নিজের অনলাইন স্টোর থাকায় পুরো ব্যবসাটা অনেক সহজে পরিচালনা করতে পারছি।",
    rating: 4.5,
  },
  {
    id: 2,
    name: "মোঃ রাকিব হাসান",
    role: "ই-কমার্স শপ ওনার",
    avatarText: "রা",
    review:
      "Biponon দিয়ে খুব সহজেই নিজের স্টোর তৈরি করেছি। প্রোডাক্ট আপলোড থেকে শুরু করে অর্ডার ম্যানেজমেন্ট—সবকিছু এক জায়গায় পাচ্ছি।",
    rating: 4.5,
  },
  {
    id: 3,
    name: "ফারহানা আক্তার",
    role: "হ্যান্ডমেড ক্রাফটস ফাউন্ডার",
    avatarText: "ফা",
    review:
      "নিজের ব্র্যান্ডের মতো করে স্টোর সাজাতে পেরেছি। ডিজাইন সুন্দর এবং কাস্টমারদের কাছেও শপটি বেশ পছন্দ হয়েছে।",
    rating: 4.5,
  },
  {
    id: 4,
    name: "তানভীর আহমেদ",
    role: "হোম ডেকর মার্চেন্ট",
    avatarText: "তা",
    review:
      "আগে অর্ডার ট্র্যাক করতে অনেক সময় লাগত। এখন ড্যাশবোর্ড থেকেই অর্ডার ও ব্যবসার আপডেট সহজে দেখতে পারি।",
    rating: 4.5,
  },
  {
    id: 5,
    name: "সুমাইয়া ইসলাম",
    role: "বিউটি ও স্কিনকেয়ার শপ",
    avatarText: "সু",
    review:
      "কোনো টেকনিক্যাল অভিজ্ঞতা ছাড়াই নিজের অনলাইন স্টোর চালু করতে পেরেছি। ব্যবহার করাও অনেক সহজ।",
    rating: 4.5,
  },
  {
    id: 6,
    name: "ইমরান হোসেন",
    role: "লেদার মার্চেন্ট ও সাপ্লায়ার",
    avatarText: "ই",
    review:
      "কুরিয়ার ইন্টিগ্রেশন এবং অর্ডার ম্যানেজমেন্টের সুবিধায় প্রতিদিনের কাজ অনেক গোছানো হয়েছে।",
    rating: 4.5,
  },
  {
    id: 7,
    name: "মেহেদী হাসান",
    role: "অ্যাপারেল ও ফুটওয়্যার ওনার",
    avatarText: "মে",
    review:
      "নিজের ডোমেইনে স্টোর চালু করার পর ব্যবসার আলাদা একটা পরিচিতি তৈরি হয়েছে। পুরো অভিজ্ঞতাটা ভালো।",
    rating: 4.5,
  },
  {
    id: 8,
    name: "সাদিয়া রহমান",
    role: "অর্গানিক ফুড স্টোর ফাউন্ডার",
    avatarText: "সা",
    review:
      "এক জায়গা থেকে প্রোডাক্ট, অর্ডার এবং কাস্টমার ম্যানেজ করতে পারছি। সময় বাঁচছে এবং কাজও সহজ হচ্ছে।",
    rating: 4.5,
  },
];

// Row 1: Testimonials 1-4 repeated
const ROW_1_ITEMS = [
  ...TESTIMONIALS_DATA.slice(0, 4),
  ...TESTIMONIALS_DATA.slice(0, 4),
];

// Row 2: Testimonials 5-8 repeated
const ROW_2_ITEMS = [
  ...TESTIMONIALS_DATA.slice(4, 8),
  ...TESTIMONIALS_DATA.slice(4, 8),
];

/**
 * 4.5 / 5 Visual Rating Component using Lucide Star icons.
 * Shows 4 full brand-green stars and 1 half-filled brand-green star.
 */
function RatingStars({ rating = 4.5 }: { rating?: number }) {
  return (
    <div
      className="flex items-center gap-2"
      aria-label={`Rating: ${rating} out of 5 stars`}
    >
      <div className="flex items-center gap-0.5" aria-hidden="true">
        {[1, 2, 3, 4].map((starIndex) => (
          <Star
            key={starIndex}
            className="size-3.5 sm:size-4 fill-primary text-primary"
          />
        ))}
        {/* Fifth star: 50% filled for 4.5 rating */}
        <div className="relative size-3.5 sm:size-4">
          <Star className="size-3.5 sm:size-4 text-muted-foreground/30" />
          <div className="absolute inset-0 w-1/2 overflow-hidden">
            <Star className="size-3.5 sm:size-4 fill-primary text-primary" />
          </div>
        </div>
      </div>
      <span className="text-[11px] sm:text-xs font-bold text-foreground">
        4.5 <span className="font-normal text-muted-foreground">/ 5</span>
      </span>
    </div>
  );
}

/**
 * Single Testimonial Card built with shadcn/ui Card.
 */
function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <Card className="flex h-auto min-h-[175px] sm:min-h-[185px] w-[310px] sm:w-[380px] lg:w-[420px] shrink-0 flex-col justify-between rounded-2xl border border-border/70 bg-card/75 p-5 shadow-xs backdrop-blur-sm transition-all duration-300 hover:border-primary/50 hover:shadow-[0_12px_28px_-10px_rgba(0,151,107,0.18)] dark:border-white/10 dark:bg-card/50 dark:hover:border-primary/50 dark:hover:shadow-[0_12px_28px_-10px_rgba(0,151,107,0.25)]">
      <div className="flex flex-col gap-3">
        {/* Rating row */}
        <div className="flex items-center justify-between">
          <RatingStars rating={testimonial.rating} />
        </div>

        {/* Review Quote in Bangla */}
        <p className="font-bangla text-xs sm:text-sm leading-relaxed text-foreground/90 font-medium">
          &ldquo;{testimonial.review}&rdquo;
        </p>
      </div>

      {/* Customer Attribution */}
      <div className="mt-4 flex items-center gap-3 border-t border-border/50 pt-3 dark:border-white/5">
        <div className="flex size-8 sm:size-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-xs ring-1 ring-primary/20 dark:bg-primary/15 dark:ring-primary/30">
          {testimonial.avatarText}
        </div>
        <div className="min-w-0 flex-1">
          <h4 className="font-heading font-bangla text-xs sm:text-sm font-semibold tracking-tight text-foreground truncate">
            {testimonial.name}
          </h4>
          <p className="font-bangla text-[10px] sm:text-xs text-muted-foreground truncate">
            {testimonial.role}
          </p>
        </div>
      </div>
    </Card>
  );
}

export function TestimonialsSection() {
  const { t, language } = useLanguage();
  const isBn = language === "bn";

  return (
    <section
      id="testimonials"
      aria-label="Customer testimonials and merchant reviews"
      className="relative isolate w-full px-4 pt-20 pb-0 sm:px-6 lg:px-8"
    >
      <div className="mx-auto w-full max-w-7xl">
        {/* Section Header - Exact Features Section Design System */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-primary shadow-xs backdrop-blur-sm dark:border-primary/25 dark:bg-primary/15">
            <span className="size-1.5 shrink-0 rounded-full bg-brand-secondary animate-pulse" />
            {t("testimonials.badge") || "TESTIMONIALS"}
          </span>

          <h2 className="font-heading mt-5 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            <span className="block">
              {t("testimonials.headingLine1") || "Trusted by Businesses"}
            </span>
            <span className="brand-gradient-text inline">
              {t("testimonials.headingGradient") || "Growing with Biponon"}
            </span>
          </h2>

          <p
            className={`mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg sm:leading-relaxed ${
              isBn ? "font-bangla" : ""
            }`}
          >
            {t("testimonials.subtitle") ||
              "Hear how entrepreneurs across Bangladesh are scaling their online businesses with Biponon."}
          </p>
        </div>

        {/* Continuous Two-Row Horizontal Marquee Animation */}
        <div className="relative mt-12 sm:mt-16 w-full overflow-hidden">
          {/* Subtle Left & Right Edge Fade Gradients */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 sm:w-24 md:w-32 bg-gradient-to-r from-background to-transparent"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 sm:w-24 md:w-32 bg-gradient-to-l from-background to-transparent"
          />

          <div className="flex flex-col gap-4 sm:gap-6 py-2">
            {/* ROW 1: Right-to-Left Continuous Marquee */}
            <div
              className="group relative flex w-full overflow-hidden select-none"
              aria-label="Testimonials row 1"
            >
              <div className="flex w-max shrink-0 animate-marquee-left group-hover:[animation-play-state:paused] group-focus-within:[animation-play-state:paused] active:[animation-play-state:paused] motion-reduce:animate-none">
                {/* Track A */}
                <div className="flex shrink-0 items-center gap-4 sm:gap-6 pr-4 sm:pr-6">
                  {ROW_1_ITEMS.map((testimonial, idx) => (
                    <TestimonialCard
                      key={`r1-a-${testimonial.id}-${idx}`}
                      testimonial={testimonial}
                    />
                  ))}
                </div>
                {/* Track B: Exact Duplicate for Gapless Infinite Loop */}
                <div
                  className="flex shrink-0 items-center gap-4 sm:gap-6 pr-4 sm:pr-6"
                  aria-hidden="true"
                >
                  {ROW_1_ITEMS.map((testimonial, idx) => (
                    <TestimonialCard
                      key={`r1-b-${testimonial.id}-${idx}`}
                      testimonial={testimonial}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* ROW 2: Left-to-Right Continuous Marquee (Opposite Direction & Varied Speed) */}
            <div
              className="group relative flex w-full overflow-hidden select-none"
              aria-label="Testimonials row 2"
            >
              <div className="flex w-max shrink-0 animate-marquee-right group-hover:[animation-play-state:paused] group-focus-within:[animation-play-state:paused] active:[animation-play-state:paused] motion-reduce:animate-none">
                {/* Track A */}
                <div className="flex shrink-0 items-center gap-4 sm:gap-6 pr-4 sm:pr-6">
                  {ROW_2_ITEMS.map((testimonial, idx) => (
                    <TestimonialCard
                      key={`r2-a-${testimonial.id}-${idx}`}
                      testimonial={testimonial}
                    />
                  ))}
                </div>
                {/* Track B: Exact Duplicate for Gapless Infinite Loop */}
                <div
                  className="flex shrink-0 items-center gap-4 sm:gap-6 pr-4 sm:pr-6"
                  aria-hidden="true"
                >
                  {ROW_2_ITEMS.map((testimonial, idx) => (
                    <TestimonialCard
                      key={`r2-b-${testimonial.id}-${idx}`}
                      testimonial={testimonial}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Illustrative Sample Reviews Note */}
        <div className="mt-6 text-center">
          <p
            className={`text-xs text-muted-foreground/70 ${
              isBn ? "font-bangla" : ""
            }`}
          >
            {t("testimonials.sampleNote") || "Illustrative sample reviews"}
          </p>
        </div>
      </div>
    </section>
  );
}
