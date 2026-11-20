import type { Metadata } from "next";

import { CreateWebsiteView } from "@/components/create-website/create-website-view";

export const metadata: Metadata = {
  title: "Create Your Online Store - Biponon",
  description:
    "Create your Biponon online store in three simple steps. Add your store details, customize your brand, and launch your storefront.",
};

export default function CreateWebsitePage() {
  return <CreateWebsiteView />;
}
