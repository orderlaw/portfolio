export interface Post {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  readTime: string;
  tags: string[];
}

export const posts: Post[] = [
  {
    slug: "automating-woocommerce-with-n8n",
    title: "Automating WooCommerce Orders with n8n",
    date: "Jan 2025",
    excerpt:
      "How I built an end-to-end order sync pipeline that eliminated manual data entry for a UK e-commerce brand — and what I'd do differently next time.",
    readTime: "6 min",
    tags: ["n8n", "WooCommerce", "Automation"],
  },
  {
    slug: "erpnext-sync-patterns",
    title: "ERPNext Sync Patterns That Actually Hold Up",
    date: "Feb 2025",
    excerpt:
      "The patterns I reach for when connecting ERPNext to external systems — and the ones I've learned to avoid after they broke in production.",
    readTime: "5 min",
    tags: ["ERPNext", "Integration"],
  },
];
