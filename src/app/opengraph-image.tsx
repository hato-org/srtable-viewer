import Image from "next/image";
import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "屋代高校理科室割";
export const size = {
  width: 1280,
  height: 600,
};

export default async function OgImage() {
  const zenMaruMedium = fetch(
    "https://fonts.googleapis.com/css2?family=Zen+Maru+Gothic:wght@500&display=swap"
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
        <Image
          alt="Science table"
          src="/cover.png"
          style={{
            position: "absolute",
            inset: 0,
            filter: "blur(8px)",
          }}
        />
        <Image
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
