"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import dynamicIconImports from "lucide-react/dynamicIconImports";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { css } from "@shadow-panda/styled-system/css";
import { flex, vstack } from "@shadow-panda/styled-system/patterns";
import QRCode from "@/../public/qrcode.png";
import Hero from "@/../public/hero.png";

export default function Sidebar() {
  const LucideChevronUp = dynamic(dynamicIconImports["chevron-up"]);
  const LucideChevronDown = dynamic(dynamicIconImports["chevron-down"]);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Collapsible open={isOpen}>
      <CollapsibleTrigger onClick={() => setIsOpen(true)}>
        <div
          className={flex({
            pos: "fixed",
            bottom: 0,
            right: 0,
            w: 24,
            px: 8,
            py: 4,
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
          })}
        >
          <LucideChevronUp />
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div
          className={vstack({
            pos: "fixed",
            bottom: 0,
            right: 8,
            zIndex: 1000,
            p: 4,
            w: 60,
            gap: 0,
            bg: "white",
            borderWidth: 1,
            borderColor: "neutral.100",
            roundedTop: "xl",
            shadow: "lg",
          })}
        >
          <button
            className={css({
              pos: "absolute",
              top: 4,
              right: 4,
              color: "neutral.500",
              w: 6,
              h: 6,
              cursor: "pointer",
            })}
            onClick={() => setIsOpen(false)}
          >
            <LucideChevronDown />
          </button>
          <Image src={Hero} alt="Hato logo" className={css({ w: "8/12" })} />
          <Image src={QRCode} alt="Hato QR code" />
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
