import IntroModal from "@/components/IntroModal";
import Table from "@/components/Table";
import { flex } from "@shadow-panda/styled-system/patterns";
import { cookies } from "next/headers";
import { fetchScienceroomTable } from "@/services/scienceroom";
import { startOfDay } from "@/utils/date";

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const key = cookies().get("hatoapi-key")?.value;
  const { y, m, d } = searchParams;
  const date = y && m && d ? new Date(Number(y), Number(m) - 1, Number(d)) : startOfDay(new Date());
  const table = key
    ? await (
        await fetchScienceroomTable({
          y: date.getFullYear().toString(),
          m: (date.getMonth() + 1).toString(),
          d: date.getDate().toString(),
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
        <Table date={date} table={table} />
      </div>
    </main>
  );
}
