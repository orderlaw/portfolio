import type { Metadata } from "next";
import { GFS_Didot, Fauna_One, Playfair_Display } from "next/font/google";
import "./globals.css";

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
      <body className="antialiased">{children}</body>
    </html>
  );
}
