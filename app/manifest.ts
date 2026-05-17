import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Law Levisay — E-commerce Automation & Systems",
    short_name: "Law Levisay",
    description: "I build systems that make e-commerce operations run themselves.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#2a2822",
    icons: [
      {
        src: "/icon",
        sizes: "32x32",
        type: "image/png",
      },
      {
        src: "/apple-icon",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
