import { readFile } from "@/lib/content-store";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const [postsFile, worksFile] = await Promise.all([
      readFile("content/blog/posts.json"),
      readFile("content/work/works.json"),
    ]);

    const posts = postsFile ? JSON.parse(postsFile.content) : [];
    const works = worksFile ? JSON.parse(worksFile.content) : [];

    return Response.json({ posts, works });
  } catch (err) {
    console.error(err);
    return Response.json({ error: "Failed to load content" }, { status: 500 });
  }
}
