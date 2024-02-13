"use client";
import { css } from "@shadow-panda/styled-system/css";
import { vstack, hstack } from "@shadow-panda/styled-system/patterns";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import Link from "next/link";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { useForm } from "react-hook-form";
import useSWRMutation from "swr/mutation";
import { ExternalLink, Loader2 } from "lucide-react";

export default function IntroModal({ isOpen }: { isOpen: boolean }) {
  const form = useForm({
    defaultValues: {
      apiKey: "",
    },
  });

  const { trigger, isMutating } = useSWRMutation(
    "/api/register",
    async (path, { arg }: { arg: { apiKey: string } }) =>
      await fetch(path, { method: "POST", body: JSON.stringify(arg) }),
    {
      onSuccess: () => window.location.reload(),
    }
  );

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
            <Link className={css({ w: "full" })} href="https://hato.pages.dev" target="_blank">
              <div className={hstack()}>
                <span>Hatoに移動</span>
                <ExternalLink className={css({ w: 4, h: 4 })} />
              </div>
            </Link>
          </Button>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit((data) => trigger(data))}>
            <div className={vstack({ gap: 4 })}>
              <FormField
                rules={{
                  required: {
                    value: true,
                    message: "APIキーを入力してください",
                  },
                }}
                control={form.control}
                name="apiKey"
                render={({ field }) => (
                  <FormItem w="full">
                    <FormLabel>APIキー</FormLabel>
                    <FormControl>
                      <Input placeholder="APIキーを入力" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" w="full" disabled={isMutating}>
                {isMutating ? <Loader2 className={css({ animation: "spin" })} /> : "利用を開始"}
              </Button>
            </div>
          </form>
        </Form>
        {/* <DialogFooter>
            
            </DialogFooter> */}
      </DialogContent>
    </Dialog>
  );
}
