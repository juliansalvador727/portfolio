import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

// components
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

import { Raleway } from "next/font/google";

const raleway = Raleway({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-raleway",
});
// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "Julian Salvador",
  description: "either building or playing piano",
  openGraph: {
    title: "Julian Salvador | CE at UWaterloo",
    description: "either building or playing piano",
    url: "https://juliansalvador.com", // replace with your actual domain
    siteName: "Julian Salvador",
    images: [
      {
        url: "/jsicon.svg", // your logo
        width: 512,
        height: 512,
        alt: "Julian Salvador Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={raleway.className}>
      <head>
        <link rel="icon" type="image/svg+xml" href="/jsicon.svg"></link>
      </head>
      <body className={`${raleway.variable} font-sans antialiased p-3`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <main className="mx-auto max-w-xl py-4">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
