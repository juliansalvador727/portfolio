import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";

import { ThemeProvider } from "@/components/theme-provider";
import { SiteHeader, MobileNav } from "@/components/porto/site-header";
import { SiteFooter } from "@/components/porto/site-footer";
import { PortoBackdrop } from "@/components/porto/backdrop";
import { FirebaseAnalytics } from "@/components/firebase-analytics";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://juliansalvador.com"),
  title: "Julian Salvador",
  description: "computer engineering at uwaterloo",
  openGraph: {
    title: "Julian Salvador",
    description: "computer engineering at uwaterloo",
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
    title: "Julian Salvador",
    description: "computer engineering at uwaterloo",
    images: ["/jsicon.svg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geist.variable} ${geistMono.variable} ${instrument.variable}`}
    >
      <head>
        <link rel="icon" type="image/svg+xml" href="/jsicon.svg"></link>
      </head>
      <body className="font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <FirebaseAnalytics />
          <PortoBackdrop />
          <div className="porto-paper z-10">
            <div className="mx-auto flex min-h-dvh max-w-2xl flex-col px-4 sm:px-6">
              <SiteHeader />
              <MobileNav />
              <main className="flex-1">{children}</main>
              <SiteFooter />
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
