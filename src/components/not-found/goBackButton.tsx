"use client";

import { useRouter } from "next/navigation";
import { RotateCcw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/i18n/languageContext";

export function GoBackButton() {
  const router = useRouter();
  const { t } = useLanguage();

  function handleGoBack() {
    if (window.history.length > 1) {
      router.back();
      return;
    }

    router.push("/");
  }

  return (
    <Button
      variant="outline"
      size="lg"
      onClick={handleGoBack}
      className="h-11 w-full bg-background/80 px-6 backdrop-blur transition-colors hover:bg-muted sm:h-12 sm:w-auto"
    >
      <RotateCcw className="size-4" />
      {t("notFound.goBack")}
    </Button>
  );
}
