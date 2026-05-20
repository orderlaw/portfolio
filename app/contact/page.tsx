import Nav from "@/components/Nav";
import Contact from "@/components/Contact";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Book a call or send a message. Let's talk about what you're trying to automate.",
  alternates: { canonical: "https://lawlevisay.com/contact" },
  openGraph: {
    title: "Contact — Law Levisay",
    description: "Book a call or send a message. Let's talk about what you're trying to automate.",
    url: "https://lawlevisay.com/contact",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact — Law Levisay",
    description: "Book a call or send a message. Let's talk about what you're trying to automate.",
  },
};

export default function ContactPage() {
  return (
    <>
      <Nav />
      <main className="pt-14">
        <Contact />
      </main>
    </>
  );
}
