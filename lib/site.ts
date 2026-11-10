import type { Metadata } from "next";
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://siyaworks.in"
).replace(/\/$/, "");
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
export function metadata(
  title: string,
  description: string,
  path: string,
): Metadata {
  return {
    title,
    description,
    alternates: { canonical: siteUrl + path },
    openGraph: {
      title: title + " | Siya Works",
      description,
      url: siteUrl + path,
      siteName: "Siya Works",
      type: "website",
    },
  };
}
export const publisher = process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID || "";
export const slot = process.env.NEXT_PUBLIC_ADSENSE_SLOT_ID || "";
export const adsEnabled =
  process.env.NEXT_PUBLIC_ADS_ENABLED === "true" &&
  /^ca-pub-\d{16}$/.test(publisher) &&
  /^\d+$/.test(slot) &&
  process.env.NEXT_PUBLIC_ADS_CONSENT_READY === "true";
