import worksData from "./works.json";

export interface Work {
  slug: string;
  title: string;
  description: string;
  image: string;
}

export const works = worksData as Work[];
