import type { StaticImageData } from "next/image";
import DLR from "@/components/icons/DLR.jpg";
import UWHPC from "@/components/icons/UWHPC.png";

export type ExperienceEntry = {
  role: string;
  org: string;
  href: string;
  dates: string;
  current: boolean;
  logo?: StaticImageData;
  detail?: string;
};

// Newest first.
export const EXPERIENCE: ExperienceEntry[] = [
  {
    role: "software engineer",
    org: "dlr",
    href: "https://www.dlr.de/en/fk",
    dates: "may 2026 – aug 2026",
    current: false,
    logo: DLR,
    detail: "german aerospace center.",
  },
  {
    role: "hpc engineer",
    org: "uwhpc",
    href: "https://github.com/UWHPC",
    dates: "jan 2026 – present",
    current: true,
    logo: UWHPC,
  },
];
