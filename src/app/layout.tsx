import "./globals.css";
import type { Metadata } from "next";
import { Inter, M_PLUS_1, Zen_Kaku_Gothic_New } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
const zenKaku = Zen_Kaku_Gothic_New({ weight: "500", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.SITE_URL ?? `https://${process.env.VERCEL_URL}` ?? "http://localhost:3000"
  ),
  title: "屋代高校 理科室割",
  description: "屋代高校の理科室割が閲覧できます",
  openGraph: {
    title: "屋代高校 理科室割ビューア",
    description: "屋代高校の理科室割が閲覧できます",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body className={zenKaku.className} style={inter.style}>
        {children}
      </body>
    </html>
  );
}
