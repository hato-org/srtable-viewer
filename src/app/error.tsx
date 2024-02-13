"use client";

import { Button } from "@/components/ui/button";
import { css } from "@shadow-panda/styled-system/css";
import { vstack, hstack } from "@shadow-panda/styled-system/patterns";
import { Loader2, RotateCw } from "lucide-react";
import { useEffect } from "react";
import useSWRMutation from "swr/mutation";

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { trigger, isMutating } = useSWRMutation(
    "/api/register",
    async (path, { arg }: { arg: { apiKey: string } }) =>
      await fetch(path, { method: "POST", body: JSON.stringify(arg) }),
    {
      onSuccess: () => window.location.reload(),
    }
  );

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div
      className={vstack({
        pos: "fixed",
        h: "full",
        w: "full",
        p: 8,
        gap: 8,
        justifyContent: "center",
        alignItems: "center",
      })}
    >
      <h2
        className={css({
          fontSize: "2xl",
        })}
      >
        Error!
      </h2>
      <div className={hstack({})}>
        <Button
          disabled={isMutating}
          onClick={() => {
            trigger({ apiKey: "" });
          }}
        >
          {isMutating ? (
            <Loader2 className={css({ animation: "spin" })} />
          ) : (
            <>
              <RotateCw size={12} />
              リセット
            </>
          )}
        </Button>
      </div>
      <pre
        className={css({
          bg: "gray.200",
          rounded: "md",
          px: 4,
          fontFamily: "mono",
        })}
      >
        {error.message} ({error.digest})
      </pre>
      <code
        className={css({
          bg: "gray.200",
          rounded: "md",
          p: 4,
          fontFamily: "mono",
          whiteSpace: "pre",
          overflowX: "auto",
        })}
      >
        {error.stack}
      </code>
    </div>
  );
}
