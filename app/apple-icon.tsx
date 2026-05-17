import { ImageResponse } from "next/og";
import { readFile } from "fs/promises";
import path from "path";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default async function AppleIcon() {
  const font = await readFile(
    path.join(process.cwd(), "public/fonts/GFSDidot.ttf")
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#2a2822",
        }}
      >
        <span
          style={{
            color: "#ffffff",
            fontSize: 100,
            fontFamily: "GFS Didot",
            letterSpacing: "-3px",
          }}
        >
          LL
        </span>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "GFS Didot", data: font, style: "normal" }],
    }
  );
}
