import IntroModal from "@/components/IntroModal";
import Table from "@/components/Table";
import { flex } from "@shadow-panda/styled-system/patterns";
import { cookies } from "next/headers";
import { fetchScienceroomTable } from "@/services/scienceroom";
import dayjs from "dayjs";

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const key = cookies().get("hatoapi-key")?.value;
  const { y, m, d } = searchParams;
  const date = dayjs(y && m && d ? [Number(y), Number(m) - 1, Number(d)] : new Date()).startOf(
    "day"
  );
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
      })}
    >
      <IntroModal isOpen={!key} />
      <div
        className={flex({ w: "full", maxW: "breakpoint-xl", h: "full", p: 2, overflow: "auto" })}
      >
        <Table date={date.toDate()} table={table} />
      </div>
    </main>
  );
}
