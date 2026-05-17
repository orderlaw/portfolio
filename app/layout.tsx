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

const SITE_URL = "https://lawlevisay.com";
const OG_TITLE = "Law Levisay — E-commerce Automation & Systems";
const OG_DESCRIPTION =
  "I build systems that make e-commerce operations run themselves.";
const OG_IMAGE = `${SITE_URL}/og-image.png`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: OG_TITLE,
    template: "%s — Law Levisay",
  },
  description: OG_DESCRIPTION,
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: OG_TITLE,
    description: OG_DESCRIPTION,
    siteName: "Law Levisay",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Law Levisay — E-commerce Automation & Systems",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: OG_TITLE,
    description: OG_DESCRIPTION,
    images: [OG_IMAGE],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${gfsDidot.variable} ${faunaOne.variable} ${playfair.variable}`}>
      <body className="antialiased">
        <div className="fixed inset-0 pointer-events-none z-[9999]" aria-hidden style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.95' numOctaves='8' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='256' height='256' filter='url(%23noise)' opacity='0.28'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "256px 256px",
        }} />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
