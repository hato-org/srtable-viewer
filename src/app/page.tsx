"use client";

import { useState, useEffect } from "react";
import IntroModal from "@/components/IntroModal";
import Table from "@/components/Table";
import { css } from "@shadow-panda/styled-system/css";
import { flex } from "@shadow-panda/styled-system/patterns";
import { useSearchParams } from "next/navigation";
import Sidebar from "@/components/Sidebar";

export default function Home() {
  const [date, setDate] = useState(new Date());
  const searchParams = useSearchParams();

  useEffect(() => {
    const year = searchParams.get("y");
    const month = searchParams.get("m");
    const dayOfMonth = searchParams.get("d");

    if (year && month && dayOfMonth)
      setDate(new Date(Number(year), Number(month) - 1, Number(dayOfMonth)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      <IntroModal />
      <Sidebar />
      <div className={css({ w: "full", maxW: "breakpoint-xl", h: "full", p: 2, overflow: "auto" })}>
        <Table date={date} />
      </div>
    </main>
  );
}
