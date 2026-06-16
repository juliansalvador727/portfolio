import type { Metadata } from "next";
import "./globals.css";

import { P3RBackground } from "@/components/p3r/background";
import { P3RHud } from "@/components/p3r/hud";
import { SoundProvider } from "@/components/p3r/sound";
import { RoutePreloader } from "@/components/route-preloader";
import { FirebaseAnalytics } from "@/components/firebase-analytics";

import localFont from "next/font/local";

const rodin = localFont({
  src: [
    { path: "./fonts/Rodin-Pro-M.otf", weight: "400", style: "normal" },
    { path: "./fonts/Rodin-Pro-B.otf", weight: "700", style: "normal" },
    { path: "./fonts/NewRodin-Pro-EB.otf", weight: "800", style: "normal" },
    { path: "./fonts/NewRodin-Pro-UB.otf", weight: "900", style: "normal" },
  ],
  variable: "--font-rodin",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://juliansalvador.com"),
  title: "Julian Salvador",
  description: "either building or playing piano",
  openGraph: {
    title: "Julian Salvador | CE at UWaterloo",
    description: "either building or playing piano",
    url: "https://juliansalvador.com",
    siteName: "Julian Salvador",
    images: [
      {
        url: "/jsicon.svg",
        width: 512,
        height: 512,
        alt: "Julian Salvador Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Julian Salvador | CE at UWaterloo",
    description: "either building or playing piano",
    images: ["/jsicon.svg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={rodin.className}>
      <head>
        <link rel="icon" type="image/svg+xml" href="/jsicon.svg"></link>
      </head>
      <body className={`${rodin.variable} font-sans antialiased`}>
        <SoundProvider>
          <P3RBackground />
          <P3RHud />
          <RoutePreloader />
          <FirebaseAnalytics />
          <main className="min-h-dvh overflow-x-clip">{children}</main>
        </SoundProvider>
      </body>
    </html>
  );
}
