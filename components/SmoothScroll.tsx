"use client";

import { useEffect } from "react";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    let lenis: import("lenis").default | null = null;

    const init = async () => {
      const Lenis = (await import("lenis")).default;
      const gsap = (await import("gsap")).default;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      lenis = new Lenis({ lerp: 0.08, smoothWheel: true });

      lenis.on("scroll", ScrollTrigger.update);

      gsap.ticker.add((time) => {
        lenis!.raf(time * 1000);
      });
      gsap.ticker.lagSmoothing(0);
    };

    init();

    return () => {
      lenis?.destroy();
    };
  }, []);

  return <>{children}</>;
}
