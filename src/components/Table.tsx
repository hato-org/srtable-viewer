"use client";
import { Suspense } from "react";
import useSWR from "swr";
import { ScienceRoom } from "@/types/hato";
import { css } from "@shadow-panda/styled-system/css";
import { flex, center, vstack, hstack, grid } from "@shadow-panda/styled-system/patterns";
import { Clock } from "./Clock";
import { AlertCircle, Loader2 } from "lucide-react";

const tableColors = ["#dc2626", "#2563eb", "#7c3aed", "#0284c7", "#ea580c", "#FFF100", "#16a34a"];

export default function Table({ date, table }: { date: Date; table?: ScienceRoom }) {
  const { data, isLoading, error } = useSWR<ScienceRoom, Error>(
    `srtable-${date.toISOString()}`,
    table
      ? async () =>
          (
            await fetch(
              `/api/scienceroom?${new URLSearchParams({
                y: date.getFullYear().toString(),
                m: (date.getMonth() + 1).toString(),
                d: date.getDate().toString(),
              }).toString()}`
            )
          ).json()
      : null,
    {
      fallbackData: table,
      refreshInterval: 1000 * 60, // Refresh every minite
    }
  );

  if (!table && isLoading)
    return (
      <div
        className={vstack({
          w: "full",
          h: "full",
          justifyContent: "center",
          alignItems: "center",
          gap: 4,
        })}
      >
        <Loader2 className={css({ w: 10, h: 10, animation: "spin" })} />
        <span>読み込み中</span>
      </div>
    );

  if (error)
    return (
      <div
        className={vstack({ w: "full", h: "full", justifyContent: "center", alignItems: "center" })}
      >
        <AlertCircle className={css({ w: 24, h: 24, color: "red.500" })} />
        <span className={css({ fontSize: "2xl", fontWeight: "bold" })}>エラーが発生しました</span>
        <code className={css({ fontFamily: "monospace", whiteSpace: "pre" })}>{error.message}</code>
        <pre className={css({ fontFamily: "monospace", whiteSpace: "pre" })}>{error.stack}</pre>
      </div>
    );

  return data?.roomTable.length ? (
    <div
      className={vstack({
        w: "full",
        h: "full",
        gap: 2,
        flexShrink: 0,
      })}
    >
      <div className={grid({ w: "full", columns: 7 })}>
        {Array.from({ length: 7 }).map((_, index) =>
          index ? (
            <div
              key={index}
              className={flex({
                w: "full",
                justifyContent: "center",
                alignItems: "flex-end",
                pt: "auto",
                color: "neutral.600",
                textAlign: "center",
                fontSize: { base: "md", lg: "4xl" },
              })}
            >
              {index}
            </div>
          ) : (
            <Suspense key={index}>
              <Clock />
            </Suspense>
          )
        )}
      </div>
      {data?.roomTable.map(({ name, table }, rowIndex) => (
        <div
          key={name}
          className={grid({
            w: "full",
            h: "full",
            rounded: "xl",
            columns: 7,
            gap: { base: 1, sm: 2, md: 4 },
          })}
          style={{
            backgroundColor: `${tableColors[rowIndex] ?? "#000000"}16`,
          }}
        >
          <div
            className={hstack({
              w: "full",
              py: 2,
              gap: { base: 1, sm: 2, md: 4 },
              justifyContent: "flex-end",
              alignItems: "center",
              whiteSpace: "nowrap",
              color: "neutral.700",
              fontSize: {
                base: name.length > 2 ? "sm" : "md",
                xs: "md",
                sm: "lg",
                md: "xl",
                lg: "3xl",
              },
            })}
          >
            {name}
            <div
              className={css({
                w: 1,
                h: "full",
                rounded: "full",
                flexShrink: 0,
              })}
              style={{
                backgroundColor: tableColors[rowIndex] ?? "#000",
              }}
            />
          </div>
          {table.slice(0, 6).map((val, index) => (
            <TablePeriod key={index + val} period={val} index={index} />
          ))}
        </div>
      ))}
      <div className={hstack({ w: "full", alignItems: "flex-end" })}>
        {data?.updatedAt && (
          <span className={css({ fontSize: "sm", color: "neutral.500" })}>
            最終更新:{" "}
            {new Date(data?.updatedAt).toLocaleString("ja-JP", {
              timeZone: "JST",
              dateStyle: "medium",
              timeStyle: "short",
            })}
          </span>
        )}
      </div>
    </div>
  ) : (
    <div
      className={center({
        w: "full",
        h: "full",
        fontSize: "lg",
        fontWeight: "bold",
        color: "neutral.600",
      })}
    >
      {date.toLocaleDateString("ja-JP", { dateStyle: "short" })}の理科室割情報はありません
    </div>
  );
}

function TablePeriod({ period, index }: { period: string; index: number }) {
  const [subject, assignedClass] = period.split("\n");

  return (
    <div
      className={vstack({
        justifyContent: "center",
        alignItems: "center",
        whiteSpace: "pre",
        gap: 0,
        containerType: "inline-size",
        flexShrink: 0,
      })}
    >
      <span
        className={css({
          color: "neutral.600",
          fontSize: {
            base: subject?.length > 3 ? "2xs" : "xs",
            xs: "xs",
            sm: "sm",
            md: "md",
            lg: "lg",
          },
          fontWeight: "bold",
        })}
      >
        {subject}
      </span>
      <span
        className={css({
          color: "neutral.800",
          fontSize: {
            base: assignedClass?.length > 4 ? "sm" : "md",
            xs: "lg",
            sm: "xl",
            md: "2xl",
            lg: "4xl",
          },
          fontWeight: "bold",
          lineHeight: 1,
          letterSpacing: { base: "wider", lg: "widest" },
        })}
      >
        {assignedClass
          ?.replace(/[Ａ-Ｚａ-ｚ０-９－／]/g, (s) => String.fromCharCode(s.charCodeAt(0) - 0xfee0))
          .replace("　", " ")}
      </span>
    </div>
  );
}
