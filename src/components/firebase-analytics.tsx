"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import {
  getAnalytics,
  isSupported,
  logEvent,
  type Analytics,
} from "firebase/analytics";

import { getFirebaseApp } from "@/lib/firebase/client";

/**
 * Initializes Firebase Analytics in the browser and logs a `page_view` on every
 * App Router navigation (client-side route changes don't reload the page, so
 * GA4's automatic page_view won't fire on its own). Safe no-op when Analytics
 * is unsupported (e.g. SSR, unsupported browsers) or measurementId is unset.
 */
export function FirebaseAnalytics() {
  const pathname = usePathname();
  const analyticsRef = useRef<Analytics | null>(null);

  useEffect(() => {
    let cancelled = false;

    if (!process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID) return;

    isSupported()
      .then((supported) => {
        if (!supported || cancelled) return;
        analyticsRef.current = getAnalytics(getFirebaseApp());
      })
      .catch(() => {
        /* Analytics is best-effort; ignore init failures. */
      });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!analyticsRef.current) return;
    logEvent(analyticsRef.current, "page_view", {
      page_path: pathname,
      page_location: window.location.href,
    });
  }, [pathname]);

  return null;
}
