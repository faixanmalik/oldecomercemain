import React from "react";

export default function HollowDot({ color }: { color: string }) {
  return (
    <span
      className={`rounded-[3px] w-2 h-2 border-[1.5px] bg-transparent ${color}`}
    />
  );
}
