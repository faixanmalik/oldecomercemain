import React from "react";
import Link from "next/link";

export default function LinkMini({ href, children }: { href: string, children: React.ReactNode }) {
  return (
    <Link href={href}>
      <p className="select-none rounded-lg bg-gray-900 py-2 px-4 text-center align-middle font-sans text-xs font-bold text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
        {children}
      </p>
    </Link>
  )
}
