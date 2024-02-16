import dayjs from "dayjs";
import IntroModal from "@/components/IntroModal";
import Table from "@/components/Table";
import { flex } from "@shadow-panda/styled-system/patterns";
import { cookies } from "next/headers";
import { fetchScienceroomTable } from "@/services/scienceroom";

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const key = cookies().get("hatoapi-key")?.value;
  const { y, m, d } = searchParams;
  const date = dayjs(y && m && d ? [Number(y), Number(m) - 1, Number(d)] : new Date())
    .tz("Asia/Tokyo")
    .startOf("day");
  const table = key
    ? await (
        await fetchScienceroomTable({
          y: date.year().toString(),
          m: (date.month() + 1).toString(),
          d: date.date().toString(),
          key,
        })
      ).json()
    : undefined;

  return (
    <main
      className={flex({
        pos: "fixed",
        w: "100dvw",
        h: "100dvh",
        justifyContent: "center",
        alignItems: "center",
        overflow: "auto",
      })}
    >
      <IntroModal isOpen={!key} />
      <div className={flex({ w: "full", maxW: "breakpoint-xl", h: "full", p: 2 })}>
        <Table date={date.toDate()} table={table} />
      </div>
    </main>
  );
}
