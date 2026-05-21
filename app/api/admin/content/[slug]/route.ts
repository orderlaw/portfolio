import { readFile, writeFile, writeFileSha } from "@/lib/content-store";
import { getFile } from "@/lib/github";
import type { NextRequest } from "next/server";

export const dynamic = "force-dynamic";

const IS_DEV = process.env.NODE_ENV === "development";

// GET /api/admin/content/[slug]?type=blog|work
export async function GET(
  _req: NextRequest,
  ctx: { params: Promise<{ slug: string }> }
) {
  const { slug } = await ctx.params;
  const type = _req.nextUrl.searchParams.get("type") ?? "blog";

  try {
    const mdxPath =
      type === "blog"
        ? `content/blog/${slug}/index.mdx`
        : `content/${slug}.mdx`;

    const mdxFile = await readFile(mdxPath);

    let metadata: Record<string, unknown> = { slug };
    let body = mdxFile?.content ?? "";

    if (type === "blog") {
      const manifestFile = await readFile("content/blog/posts.json");
      if (manifestFile) {
        const posts: Record<string, unknown>[] = JSON.parse(manifestFile.content);
        const entry = posts.find((p) => p.slug === slug);
        if (entry) metadata = { ...entry, slug };
      }
    } else {
      // Strip the export const metadata header from body
      const metaMatch = body.match(/^export const metadata = \{[\s\S]*?\};\n*/);
      if (metaMatch) body = body.slice(metaMatch[0].length);

      // Read metadata from works.json (source of truth, same pattern as blog)
      const manifestFile = await readFile("content/work/works.json");
      if (manifestFile) {
        const works: Record<string, unknown>[] = JSON.parse(manifestFile.content);
        const entry = works.find((w) => w.slug === slug);
        if (entry) metadata = { ...entry, slug };
      }
    }

    return Response.json({ slug, type, metadata, body });
  } catch (err) {
    console.error(err);
    return Response.json({ error: "Failed to load content" }, { status: 500 });
  }
}

// PUT /api/admin/content/[slug]?type=blog|work
export async function PUT(
  req: NextRequest,
  ctx: { params: Promise<{ slug: string }> }
) {
  const { slug } = await ctx.params;
  const type = req.nextUrl.searchParams.get("type") ?? "blog";
  const { metadata, body, isNew } = await req.json();

  try {
    const action = isNew ? "add" : "update";

    if (type === "blog") {
      const mdxPath = `content/blog/${slug}/index.mdx`;
      await writeFile(mdxPath, body, `${action} blog post: ${slug}`);

      const manifestFile = await readFile("content/blog/posts.json");
      const posts: Record<string, unknown>[] = manifestFile
        ? JSON.parse(manifestFile.content)
        : [];

      const idx = posts.findIndex((p) => p.slug === slug);
      const entry = { slug, ...metadata };
      if (idx >= 0) posts[idx] = entry;
      else posts.unshift(entry);

      await writeFileSha(
        "content/blog/posts.json",
        JSON.stringify(posts, null, 2) + "\n",
        `${action} posts manifest: ${slug}`,
        IS_DEV ? undefined : (await getFile("content/blog/posts.json"))?.sha
      );
    } else {
      const mdxPath = `content/${slug}.mdx`;
      const mdxContent = `export const metadata = ${JSON.stringify(metadata, null, 2)};\n\n${body}`;
      await writeFile(mdxPath, mdxContent, `${action} case study: ${slug}`);

      const manifestFile = await readFile("content/work/works.json");
      const works: Record<string, unknown>[] = manifestFile
        ? JSON.parse(manifestFile.content)
        : [];

      const idx = works.findIndex((w) => w.slug === slug);
      const entry = {
        slug,
        title: (metadata.title as string).replace(/ — Law Levisay$/, ""),
        description: metadata.description,
        image: metadata.image ?? "",
      };
      if (idx >= 0) works[idx] = entry;
      else works.unshift(entry);

      await writeFileSha(
        "content/work/works.json",
        JSON.stringify(works, null, 2) + "\n",
        `${action} works manifest: ${slug}`,
        IS_DEV ? undefined : (await getFile("content/work/works.json"))?.sha
      );
    }

    return Response.json({ ok: true });
  } catch (err) {
    console.error(err);
    return Response.json({ error: "Failed to save content" }, { status: 500 });
  }
}
