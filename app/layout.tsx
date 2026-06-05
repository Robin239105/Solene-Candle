import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/cart/CartDrawer";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-dm-sans",
});

export const metadata: Metadata = {
  title: {
    default: "Solène Candle | Luxury Hand-Poured Candles",
    template: "%s | Solène Candle",
  },
  description:
    "Scent is a feeling. Make it yours. Premium hand-poured soy candles crafted in our London studio. Free UK shipping over £50.",
  keywords: [
    "luxury candles",
    "hand-poured candles",
    "soy candles",
    "scented candles",
    "London candles",
    "premium candles",
    "Solène Candle",
    "natural candles",
    "gift candles",
  ],
  authors: [{ name: "Solène Candle" }],
  creator: "Solène Candle",
  metadataBase: new URL("https://solenecandle.com"),
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://solenecandle.com",
    siteName: "Solène Candle",
    title: "Solène Candle | Luxury Hand-Poured Candles",
    description:
      "Scent is a feeling. Make it yours. Premium hand-poured soy candles crafted in our London studio.",
    images: [
      {
        url: "/images/hero_banner.png",
        width: 1200,
        height: 630,
        alt: "Solène Candle — Luxury Hand-Poured Candles",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Solène Candle | Luxury Hand-Poured Candles",
    description:
      "Scent is a feeling. Make it yours. Premium hand-poured soy candles crafted in our London studio.",
    images: ["/images/hero_banner.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

import { headers } from "next/headers";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = headers().get("x-pathname") || "";
  const isAdmin = pathname.startsWith("/admin");

  return (
    <html lang="en">
      <body
        className={`${cormorant.variable} ${dmSans.variable} font-body bg-cream text-charcoal antialiased min-h-screen flex flex-col`}
      >
        {!isAdmin && <AnnouncementBar />}
        {!isAdmin && <Navbar />}
        <main className="flex-grow">{children}</main>
        {!isAdmin && <Footer />}
        {!isAdmin && <CartDrawer />}
      </body>
    </html>
  );
}
