"use client";

import { useState } from "react";

export default function ServerIP() {
  const [copied, setCopied] = useState(false);

  const ip = "play.rearmc.club";

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
    <div className="flex justify-center px-4 pt-4 pb-2">
      <button
        type="button"
        onClick={copyIP}
        className="
          group
          flex
          items-center
          gap-3
          px-5
          py-3
          rounded-2xl
          border
          border-[#3b1717]
          bg-[#0d0b0c]
          hover:bg-[#140b0d]
          hover:border-red-700
          transition-all
          duration-200
          shadow-[0_0_25px_rgba(220,38,38,0.08)]
        "
      >
        <span
          className="
            w-2.5
            h-2.5
            rounded-full
            bg-green-500
            shadow-[0_0_10px_rgba(34,197,94,0.8)]
            flex-shrink-0
          "
        />

        <div className="text-left">
          <p className="text-[10px] uppercase tracking-[0.18em] text-gray-500 font-bold">
            Server IP
          </p>

          <p className="text-sm sm:text-base font-black text-white">
            {ip}
          </p>
        </div>

        <span
          className="
            ml-1
            text-xs
            font-bold
            text-gray-500
            group-hover:text-red-400
            transition-colors
          "
        >
          {copied ? "Copied!" : "Copy"}
        </span>
      </button>
    </div>
  );
}