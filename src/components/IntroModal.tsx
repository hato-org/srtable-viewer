"use client";
import { useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import { css } from "@shadow-panda/styled-system/css";
import { vstack, hstack } from "@shadow-panda/styled-system/patterns";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import Link from "next/link";
import dynamic from "next/dynamic";
import dynamicIconImports from "lucide-react/dynamicIconImports";

export default function IntroModal() {
  const LucideExternalLink = dynamic(dynamicIconImports["external-link"]);
  const [apiKey, setApiKey] = useLocalStorage<string>("hatoapi-apikey", "");
  const [inputVal, setInputVal] = useState("");

  return (
    <Dialog open={!apiKey}>
      <DialogContent gap={8}>
        <DialogHeader>
          <DialogTitle>屋代高校 理科室割</DialogTitle>
          <DialogDescription>利用するには、Hato APIのAPIキーが必要です。</DialogDescription>
        </DialogHeader>
        <div className={vstack({ w: "full", alignItems: "flex-start" })}>
          <h2 className={css({ fontWeight: "bold" })}>APIキーの取得方法</h2>
          <span className={css({ color: "neutral.500", fontSize: "sm" })}>
            Hatoにログイン後、「設定」→「アカウント」から、APIキーをコピーしてください。
          </span>
          <Link className={css({ w: "full" })} href="https://hato.cf" target="_blank">
            <Button w="full" variant="ghost">
              <div className={hstack()}>
                <span>Hatoに移動</span>
                <LucideExternalLink className={css({ w: 4, h: 4 })} />
              </div>
            </Button>
          </Link>
        </div>
        <div className={vstack()}>
          <Input
            type="text"
            placeholder="APIキーを入力"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
          />
        </div>
        <DialogFooter>
          <Button w="full" disabled={!inputVal} onClick={() => setApiKey(inputVal)}>
            利用を開始
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
