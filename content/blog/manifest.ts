import postsData from "./posts.json";

export interface Post {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  readTime: string;
  tags: string[];
}

export const posts = postsData as Post[];
