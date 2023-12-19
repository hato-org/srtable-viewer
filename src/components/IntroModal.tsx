"use client";
import { useState, useEffect } from "react";
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
import { hasCookie, setCookie } from "cookies-next";

export default function IntroModal() {
  const LucideExternalLink = dynamic(dynamicIconImports["external-link"]);
  const [inputVal, setInputVal] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!hasCookie("hatoapi-key")) setIsOpen(true);
  }, []);

  return (
    <Dialog open={isOpen}>
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
          <Button asChild w="full" variant="ghost">
            <Link className={css({ w: "full" })} href="https://hato.cf" target="_blank">
              <div className={hstack()}>
                <span>Hatoに移動</span>
                <LucideExternalLink className={css({ w: 4, h: 4 })} />
              </div>
            </Link>
          </Button>
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
          <Button
            w="full"
            disabled={!inputVal}
            onClick={() => {
              setCookie("hatoapi-key", inputVal);
              window.location.reload();
            }}
          >
            利用を開始
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
