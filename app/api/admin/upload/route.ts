import { readFile } from "@/lib/content-store";
import { putFile } from "@/lib/github";
import path from "path";
import fs from "fs";

export const dynamic = "force-dynamic";

const IS_DEV = process.env.NODE_ENV === "development";

export async function POST(request: Request) {
  try {
    const form = await request.formData();
    const file = form.get("file") as File | null;
    const folder = (form.get("folder") as string) || "uploads";

    if (!file) {
      return Response.json({ error: "No file provided" }, { status: 400 });
    }

    const safeName = file.name
      .toLowerCase()
      .replace(/[^a-z0-9.]/g, "-")
      .replace(/-+/g, "-");

    const filePath = `public/images/${folder}/${safeName}`;
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    if (IS_DEV) {
      const abs = path.join(process.cwd(), filePath);
      fs.mkdirSync(path.dirname(abs), { recursive: true });
      fs.writeFileSync(abs, buffer);
    } else {
      const base64 = buffer.toString("base64");
      const existing = await readFile(filePath);
      await putFile(filePath, base64, `upload image: ${safeName}`, existing?.sha);
    }

    const publicUrl = `/${filePath.replace(/^public\//, "")}`;
    return Response.json({ url: publicUrl });
  } catch (err) {
    console.error(err);
    return Response.json({ error: "Upload failed" }, { status: 500 });
  }
}
