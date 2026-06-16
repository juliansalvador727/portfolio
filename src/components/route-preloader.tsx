"use client";

import type { StaticImageData } from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import Delta from "@/components/icons/Delta.png";
import DLR from "@/components/icons/DLR.jpg";
import GojoLogo from "@/components/icons/GojoLogo.png";
import MidSun from "@/components/icons/MidSun.png";
import OrbitalLogo from "@/components/icons/Orbital.png";
import SFULogo from "@/components/icons/SFULogo.png";
import UWLogo from "@/components/icons/UWLogo.png";
import VayaLogo from "@/components/icons/VayaLogo.png";

const ROUTES_TO_PRELOAD = [
  "/",
  "/about",
  "/projects",
  "/experience",
  "/writing",
  "/writing/semester-two",
  "/writing/before-germany",
  "/writing/semester-one",
  "/contact",
  "/resume",
];

const STATIC_IMAGES_TO_PRELOAD: StaticImageData[] = [
  DLR,
  UWLogo,
  OrbitalLogo,
  MidSun,
  VayaLogo,
  SFULogo,
  GojoLogo,
  Delta,
];

const PUBLIC_ASSETS_TO_PREFETCH = [
  "/about-photo.jpg",
  "/p3r/caustics.png",
  "/p3r/loading-gradient.png",
  "/p3r/hoversoundeffect.wav",
  "/p3r/onclick.wav",
  "/p3r/goback.wav",
];

const warmedImages = new Set<string>();
const warmedAssets = new Set<string>();

function warmImage(src: string) {
  if (warmedImages.has(src)) return;
  warmedImages.add(src);

  const image = new Image();
  image.decoding = "async";
  image.src = src;
}

function prefetchAsset(href: string) {
  if (warmedAssets.has(href)) return;
  warmedAssets.add(href);

  const link = document.createElement("link");
  link.rel = "prefetch";
  link.href = href;
  document.head.appendChild(link);
}

function isMobileViewport() {
  return window.matchMedia("(max-width: 640px)").matches;
}

function getSaveDataPreference() {
  const connection = (
    navigator as Navigator & {
      connection?: { saveData?: boolean };
    }
  ).connection;

  return Boolean(connection?.saveData);
}

export function RoutePreloader() {
  const router = useRouter();

  useEffect(() => {
    const timers: number[] = [];
    const mobile = isMobileViewport();
    const saveData = getSaveDataPreference();
    const routeDelay = mobile || saveData ? 900 : 250;
    const routeSpacing = mobile || saveData ? 140 : 45;

    ROUTES_TO_PRELOAD.forEach((route, index) => {
      timers.push(
        window.setTimeout(() => {
          router.prefetch(route);
        }, routeDelay + index * routeSpacing)
      );
    });

    timers.push(
      window.setTimeout(() => {
        STATIC_IMAGES_TO_PRELOAD.forEach((image) => warmImage(image.src));
        PUBLIC_ASSETS_TO_PREFETCH.forEach(prefetchAsset);
      }, mobile || saveData ? 1600 : 700)
    );

    if (!mobile && !saveData) {
      timers.push(
        window.setTimeout(() => {
          void import("@/components/food-map");
        }, 1100)
      );
    }

    return () => {
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, [router]);

  return null;
}
