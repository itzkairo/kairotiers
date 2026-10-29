"use client";

import { useState } from "react";

import { CheckIcon, CopyIcon } from "./CodeIcons";

export default function ServerIP() {
  const [copied, setCopied] = useState(false);

  const ip = "play.swiftmc.fun";

  const copyIP = async () => {
    try {
      await navigator.clipboard.writeText(ip);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 1500);
    } catch (error) {
      console.error("Failed to copy IP:", error);
    }
  };

  return (
    <div className="flex justify-center px-4 pb-2 pt-4">
      <button
        type="button"
        onClick={copyIP}
        className="
          group
          flex
          items-center
          gap-3
          rounded-[8px]
          border
          border-line
          bg-surface
          px-4
          py-2.5
          transition-colors
          duration-200
          hover:border-line-red
          hover:bg-surface-hover
        "
      >
        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />

        <span className="text-left">
          <span className="block text-[11px] font-medium text-[#6F6F78]">
            Server IP
          </span>

          <span className="mono-value mt-1 block text-[13px] font-medium text-white">
            {ip}
          </span>
        </span>

        <span
          aria-live="polite"
          className="
            ml-1
            flex
            items-center
            gap-1.5
            text-[10px]
            font-medium
            text-[#6F6F78]
            transition-colors
            duration-200
            group-hover:text-[#F87171]
          "
        >
          {copied ? (
            <CheckIcon className="h-3.5 w-3.5" />
          ) : (
            <CopyIcon className="h-3.5 w-3.5" />
          )}

          {copied ? "Copied!" : "Copy"}
        </span>
      </button>
    </div>
  );
}
