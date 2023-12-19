"use client";
import { useSeconds } from "use-seconds";
import { css } from "@shadow-panda/styled-system/css";

export function Clock() {
  const [clockDate] = useSeconds();

  return (
    <div
      className={css({
        w: "full",
        textAlign: "center",
        whiteSpace: "nowrap",
        fontWeight: "bold",
        letterSpacing: { md: "wide", lg: "wider" },
      })}
    >
      <span
        className={css({
          display: { base: "none", md: "initial" },
          fontSize: { md: "2xl", lg: "5xl" },
          color: "neutral.600",
        })}
      >
        {clockDate.getHours()}:{clockDate.getMinutes().toString().padStart(2, "0")}
      </span>
      <span
        className={css({
          display: { base: "none", md: "initial" },
          fontSize: { md: "md", lg: "2xl" },
          color: "neutral.500",
        })}
      >
        :{clockDate.getSeconds().toString().padStart(2, "0")}
      </span>
    </div>
  );
}
