import { ImageResponse } from "next/og";
import { readFile } from "fs/promises";
import path from "path";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default async function Icon() {
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
          borderRadius: "4px",
        }}
      >
        <span
          style={{
            color: "#ffffff",
            fontSize: 20,
            fontFamily: "GFS Didot",
            letterSpacing: "-0.5px",
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
