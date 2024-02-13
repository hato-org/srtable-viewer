// import Image from "next/image";
import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "屋代高校理科室割";
export const size = {
  width: 1280,
  height: 600,
};
export const contentType = "image/png";

export default async function Image() {
  const zenMaruMedium = fetch(
    "https://cdn.jsdelivr.net/fontsource/fonts/zen-maru-gothic@latest/japanese-500-normal.woff2"
  ).then((res) => res.arrayBuffer());

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#fff",
          fontSize: 32,
          fontWeight: 600,
        }}
      >
        <img
          alt="Science table"
          src="/cover.png"
          style={{
            position: "absolute",
            inset: 0,
            filter: "blur(8px)",
          }}
        />
        <img
          alt="Hero"
          src="/hero-alpha.png"
          style={{
            width: "40rem",
          }}
        />
        <span
          style={{
            fontSize: "6rem",
            color: "#555",
          }}
        >
          屋代高校理科室割
        </span>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Zen Maru",
          data: await zenMaruMedium,
          style: "normal",
          weight: 500,
        },
      ],
    }
  );
}
