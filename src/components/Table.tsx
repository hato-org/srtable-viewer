"use client";
import useSWR from "swr";
import dynamic from "next/dynamic";
import { useReadLocalStorage } from "usehooks-ts";
import { ScienceRoom } from "@/types/hato";
import { css } from "@shadow-panda/styled-system/css";
import { flex, center, vstack, hstack, grid } from "@shadow-panda/styled-system/patterns";
import dynamicIconImports from "lucide-react/dynamicIconImports";
import { useSeconds } from "use-seconds";

const tableColors = ["#dc2626", "#2563eb", "#7c3aed", "#0284c7", "#ea580c", "#FFF100", "#16a34a"];

export default function Table({ date }: { date: Date }) {
  const [clockDate] = useSeconds();
  const LucideLoader2 = dynamic(dynamicIconImports["loader-2"]);
  const LucideAlertCircle = dynamic(dynamicIconImports["alert-circle"]);

  const apiKey = useReadLocalStorage<string>("hatoapi-apikey");
  const { data, isLoading, error } = useSWR<ScienceRoom, Error>(
    apiKey ? `srtable-${date}` : null,
    async () =>
      (
        await fetch(
          `https://api.hato.cf/scienceroom?${new URLSearchParams({
            y: date.getFullYear().toString(),
            m: (date.getMonth() + 1).toString(),
            d: date.getDate().toString(),
          }).toString()}`,
          { headers: { "X-APIKEY": apiKey ?? "" } }
        )
      ).json(),
    {
      refreshInterval: 1000 * 60,
    }
  );

  if (isLoading)
    return (
      <div className={center({ w: "full", h: "full" })}>
        <LucideLoader2 className={css({ w: 10, h: 10, animation: "spin" })} />
      </div>
    );

  if (error)
    return (
      <div
        className={vstack({ w: "full", h: "full", justifyContent: "center", alignItems: "center" })}
      >
        <LucideAlertCircle className={css({ w: 24, h: 24, color: "red.500" })} />
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
                fontSize: "4xl",
              })}
            >
              {index}
            </div>
          ) : (
            <div
              key={index}
              className={css({
                w: "full",
                textAlign: "center",
                whiteSpace: "nowrap",
                fontWeight: "bold",
                letterSpacing: "wider",
              })}
            >
              <span className={css({ fontSize: "5xl", color: "neutral.600" })}>
                {clockDate.getHours()}:{clockDate.getMinutes().toString().padStart(2, "0")}
              </span>
              <span className={css({ fontSize: "2xl", color: "neutral.500" })}>
                :{clockDate.getSeconds().toString().padStart(2, "0")}
              </span>
            </div>
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
            gap: 4,
          })}
          style={{
            backgroundColor: `${tableColors[rowIndex] ?? "#000000"}16`,
          }}
        >
          <div
            className={hstack({
              w: "full",
              py: 2,
              gap: 4,
              justifyContent: "flex-end",
              alignItems: "center",
              whiteSpace: "nowrap",
              color: "neutral.700",
              fontSize: "3xl",
            })}
          >
            {name}
            <div
              className={css({
                w: 1,
                h: "full",
                rounded: "full",
              })}
              style={{
                backgroundColor: tableColors[rowIndex] ?? "#000",
              }}
            />
          </div>
          {table.slice(0, 6).map((val, index) => (
            <div
              className={vstack({
                justifyContent: "center",
                alignItems: "center",
                whiteSpace: "pre",
                gap: 0,
                containerType: "inline-size",
              })}
              key={index + val}
            >
              <span
                className={css({
                  color: "neutral.600",
                  fontSize: "lg",
                  fontWeight: "bold",
                })}
              >
                {val.split("\n")[0]}
              </span>
              <span
                className={css({
                  color: "neutral.800",
                  fontSize: "4xl",
                  fontWeight: "bold",
                  lineHeight: 1,
                  letterSpacing: "widest",
                })}
              >
                {val
                  .split("\n")[1]
                  ?.replace(/[Ａ-Ｚａ-ｚ０-９－／]/g, (s) =>
                    String.fromCharCode(s.charCodeAt(0) - 0xfee0)
                  )
                  .replace("　", " ")}
              </span>
            </div>
          ))}
        </div>
      ))}
      <div className={hstack({ w: "full", alignItems: "flex-end" })}>
        {data.updatedAt && (
          <span className={css({ fontSize: "sm", color: "neutral.500" })}>
            最終更新: {new Date(data.updatedAt).toLocaleString()}
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
      今日の理科室割情報はありません
    </div>
  );
}
