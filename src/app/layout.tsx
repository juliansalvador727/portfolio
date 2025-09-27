import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";
import { Navbar } from "@/components/navbar";
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
  description: "Portfolio of Julian Salvador",
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
      <body className={`${raleway.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <main className="mx-auto max-w-xl px-4 py-6">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
