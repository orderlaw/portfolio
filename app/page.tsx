import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import SelectedWorks from "@/components/SelectedWorks";
import HowItWorks from "@/components/HowItWorks";
import BlogSection from "@/components/BlogSection";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <SelectedWorks />
        <HowItWorks />
        <BlogSection />
        <Contact />
      </main>
    </>
  );
}
