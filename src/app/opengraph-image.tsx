// import Image from "next/image";
import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "屋代高校理科室割";
export const size = {
  width: 1280,
  height: 720,
};
export const contentType = "image/png";

const originUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : `http://localhost:${process.env.PORT || 3000}`;

async function fetchFont(text: string): Promise<ArrayBuffer | null> {
  const googleFontsUrl = `https://fonts.googleapis.com/css2?family=Zen+Maru+Gothic:wght@500&text=${encodeURIComponent(
    text
  )}`;

  const css = await (
    await fetch(googleFontsUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_8; de-at) AppleWebKit/533.21.1 (KHTML, like Gecko) Version/5.0.5 Safari/533.21.1",
      },
    })
  ).text();

  const resource = css.match(/src: url\((.+)\) format\('(opentype|truetype)'\)/);

  if (!resource) return null;

  return await fetch(resource[1]).then((res) => res.arrayBuffer());
}

export default async function Image() {
  const zenMaruMedium = fetchFont(alt);

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
          src={`${originUrl}/cover.png`}
          style={{ position: "absolute", inset: 0, filter: "blur(2px)", opacity: 0.5 }}
        />
        <img alt="Hero" src={`${originUrl}/hero-alpha.png`} width={640} />
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
          data: (await zenMaruMedium)!,
          style: "normal",
          weight: 500,
        },
      ],
    }
  );
}
