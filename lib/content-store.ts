import { getFile, putFile } from "./github";
import path from "path";
import fs from "fs";

const IS_DEV = process.env.NODE_ENV === "development";
const ROOT = path.join(process.cwd());

function localRead(filePath: string): { content: string; sha: string } | null {
  const abs = path.join(ROOT, filePath);
  if (!fs.existsSync(abs)) return null;
  return { content: fs.readFileSync(abs, "utf-8"), sha: "local" };
}

function localWrite(filePath: string, content: string): void {
  const abs = path.join(ROOT, filePath);
  fs.mkdirSync(path.dirname(abs), { recursive: true });
  fs.writeFileSync(abs, content, "utf-8");
}

export async function readFile(
  filePath: string
): Promise<{ content: string; sha: string } | null> {
  if (IS_DEV) return localRead(filePath);
  return getFile(filePath);
}

export async function writeFile(
  filePath: string,
  content: string,
  message: string
): Promise<void> {
  if (IS_DEV) {
    localWrite(filePath, content);
    return;
  }
  const existing = await getFile(filePath);
  return putFile(filePath, content, message, existing?.sha);
}

export async function writeFileSha(
  filePath: string,
  content: string,
  message: string,
  sha?: string
): Promise<void> {
  if (IS_DEV) {
    localWrite(filePath, content);
    return;
  }
  return putFile(filePath, content, message, sha);
}
