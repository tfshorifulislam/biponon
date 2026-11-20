"use client";

import React from "react";
import {
  CheckCircle2,
  Info,
  Lightbulb,
  Mail,
  MapPin,
  Clock,
  ShieldCheck,
  Building,
} from "lucide-react";
import { PrivacyPolicyData } from "@/lib/privacy/privacyData";

interface PrivacyContentProps {
  data: PrivacyPolicyData;
  isBn: boolean;
}

export function PrivacyContent({ data, isBn }: PrivacyContentProps) {
  return (
    <article className="flex-1 min-w-0 space-y-14 lg:space-y-16 pb-20">
      {data.sections.map((section) => (
        <section
          key={section.id}
          id={section.id}
          className="relative scroll-mt-24 sm:scroll-mt-28"
          aria-labelledby={`heading-${section.id}`}
        >
          {/* Section Header */}
          <div className="flex items-center gap-3">
            <span className="grid size-7 place-items-center rounded-lg bg-primary/10 text-xs font-mono font-bold text-primary dark:bg-primary/20">
              {section.number}
            </span>
            <h2
              id={`heading-${section.id}`}
              className={`font-heading text-xl sm:text-2xl font-bold tracking-tight text-foreground ${
                isBn ? "font-bangla" : ""
              }`}
            >
              {section.title}
            </h2>
          </div>

          {/* Section Summary Box */}
          <div className="mt-3.5 rounded-xl border border-primary/20 bg-primary/5 p-3.5 sm:p-4 text-xs sm:text-sm font-medium text-foreground/90 dark:border-primary/25 dark:bg-primary/10">
            <p className={isBn ? "font-bangla leading-relaxed" : "leading-relaxed"}>
              {section.summary}
            </p>
          </div>

          {/* Paragraphs */}
          <div className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground sm:text-base sm:leading-relaxed">
            {section.paragraphs.map((p, idx) => (
              <p key={idx} className={isBn ? "font-bangla" : ""}>
                {p}
              </p>
            ))}
          </div>

          {/* Bullet Points Grid (if any) */}
          {section.bulletPoints && section.bulletPoints.length > 0 && (
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {section.bulletPoints.map((item, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-border/70 bg-card/70 p-4 shadow-2xs backdrop-blur-xs transition-colors hover:border-primary/40 dark:border-white/10 dark:bg-card/40"
                >
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="size-4 text-primary shrink-0 mt-0.5" />
                    <div className="min-w-0">
                      <h3
                        className={`text-sm font-semibold text-foreground ${
                          isBn ? "font-bangla" : ""
                        }`}
                      >
                        {item.title}
                      </h3>
                      <p
                        className={`mt-1 text-xs sm:text-sm leading-relaxed text-muted-foreground ${
                          isBn ? "font-bangla" : ""
                        }`}
                      >
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Advisory / Notice Callout Box (if any) */}
          {section.notice && (
            <div
              className={`mt-6 flex items-start gap-3 rounded-xl border p-4 text-xs sm:text-sm ${
                section.notice.type === "tip"
                  ? "border-amber-500/30 bg-amber-500/10 text-amber-950 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-200"
                  : "border-blue-500/30 bg-blue-500/10 text-blue-950 dark:border-blue-500/30 dark:bg-blue-500/10 dark:text-blue-200"
              }`}
            >
              {section.notice.type === "tip" ? (
                <Lightbulb className="size-4 shrink-0 text-amber-600 dark:text-amber-400 mt-0.5" />
              ) : (
                <Info className="size-4 shrink-0 text-blue-600 dark:text-blue-400 mt-0.5" />
              )}
              <div className="min-w-0">
                <span className="font-bold uppercase tracking-wider text-[10px] block mb-1">
                  {section.notice.type === "tip" ? "Notice & Advice" : "Important Legal Role"}
                </span>
                <p className={isBn ? "font-bangla leading-relaxed" : "leading-relaxed"}>
                  {section.notice.text}
                </p>
              </div>
            </div>
          )}

          {/* Section 16 Special: Verified Contact Card */}
          {section.id === "contact-us" && (
            <div className="mt-8 rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/10 via-card to-background p-5 sm:p-6 shadow-sm dark:border-primary/20 dark:from-primary/15 dark:to-card/50">
              <div className="flex items-center gap-2.5 text-primary font-bold text-sm sm:text-base">
                <Building className="size-5" />
                <h3 className={isBn ? "font-bangla" : ""}>{data.contactCard.title}</h3>
              </div>
              <p
                className={`mt-2 text-xs sm:text-sm text-muted-foreground ${
                  isBn ? "font-bangla" : ""
                }`}
              >
                {data.contactCard.description}
              </p>

              <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
                <a
                  href={`mailto:${data.contactCard.privacyEmail}`}
                  className="flex items-center gap-3 rounded-xl border border-border/80 bg-background/80 p-3 transition-colors hover:border-primary/50 hover:bg-muted/40 dark:border-white/10 dark:bg-card/70"
                >
                  <div className="grid size-8 place-items-center rounded-lg bg-primary/10 text-primary shrink-0">
                    <Mail className="size-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] text-muted-foreground">
                      {data.contactCard.privacyEmailLabel}
                    </p>
                    <p className="font-semibold text-foreground truncate">
                      {data.contactCard.privacyEmail}
                    </p>
                  </div>
                </a>

                <a
                  href={`mailto:${data.contactCard.supportEmail}`}
                  className="flex items-center gap-3 rounded-xl border border-border/80 bg-background/80 p-3 transition-colors hover:border-primary/50 hover:bg-muted/40 dark:border-white/10 dark:bg-card/70"
                >
                  <div className="grid size-8 place-items-center rounded-lg bg-primary/10 text-primary shrink-0">
                    <ShieldCheck className="size-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] text-muted-foreground">
                      {data.contactCard.supportEmailLabel}
                    </p>
                    <p className="font-semibold text-foreground truncate">
                      {data.contactCard.supportEmail}
                    </p>
                  </div>
                </a>

                <div className="flex items-center gap-3 rounded-xl border border-border/80 bg-background/80 p-3 dark:border-white/10 dark:bg-card/70">
                  <div className="grid size-8 place-items-center rounded-lg bg-primary/10 text-primary shrink-0">
                    <MapPin className="size-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] text-muted-foreground">
                      {data.contactCard.locationLabel}
                    </p>
                    <p className={`font-semibold text-foreground truncate ${isBn ? "font-bangla" : ""}`}>
                      {data.contactCard.location}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-xl border border-border/80 bg-background/80 p-3 dark:border-white/10 dark:bg-card/70">
                  <div className="grid size-8 place-items-center rounded-lg bg-primary/10 text-primary shrink-0">
                    <Clock className="size-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] text-muted-foreground">
                      {data.contactCard.slaLabel}
                    </p>
                    <p className={`font-semibold text-foreground truncate ${isBn ? "font-bangla" : ""}`}>
                      {data.contactCard.sla}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Section Divider */}
          <div className="mt-12 sm:mt-14 border-b border-border/50 dark:border-white/10" />
        </section>
      ))}
    </article>
  );
}
