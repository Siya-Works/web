"use client";
import { useEffect, useRef } from "react";
import { adsEnabled, publisher, slot } from "@/lib/site";
declare global {
  interface Window {
    adsbygoogle: Record<string, unknown>[];
  }
}
export function AdSlot() {
  const ref = useRef<HTMLModElement>(null);
  useEffect(() => {
    if (!adsEnabled || !ref.current || ref.current.dataset.adRequested) return;
    ref.current.dataset.adRequested = "true";
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {}
  }, []);
  return adsEnabled ? (
    <aside className="ad-slot" aria-label="Advertisement">
      <small>Advertisement</small>
      <ins
        ref={ref}
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={publisher}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </aside>
  ) : null;
}
