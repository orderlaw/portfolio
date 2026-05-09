import type { Metadata } from "next";
import { GFS_Didot, Fauna_One, Playfair_Display } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

const gfsDidot = GFS_Didot({
  subsets: ["latin"],
  variable: "--font-didot",
  weight: "400",
  display: "swap",
});

const faunaOne = Fauna_One({
  subsets: ["latin"],
  variable: "--font-fauna",
  weight: ["400"],
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "700", "900"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Law Levisay — Automation Developer",
  description:
    "Freelance automation developer specialising in n8n workflows, WooCommerce integrations, ERPNext sync, and backend automation.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${gfsDidot.variable} ${faunaOne.variable} ${playfair.variable}`}>
      <body className="antialiased">
        <div className="fixed inset-0 pointer-events-none z-[9999]" aria-hidden>
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <filter id="grain-global">
              <feTurbulence type="fractalNoise" baseFrequency="0.62" numOctaves="4" stitchTiles="stitch" />
              <feColorMatrix type="saturate" values="0" />
            </filter>
            <rect width="100%" height="100%" filter="url(#grain-global)" opacity="0.28" />
          </svg>
        </div>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
