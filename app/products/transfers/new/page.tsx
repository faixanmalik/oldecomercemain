import React from "react";
import Link from "next/link";
import CreateTransferForm from "@/components/products/transfers/CreateTransferForm";
import { apiUrl } from "@/lib/utils";
import { Location } from "@/types/location";
import { IoIosArrowRoundBack } from "react-icons/io";

export const dynamic = "force-dynamic";

export default async function CreateTransferPage() {
  const res = await fetch(apiUrl("/api/settings/locations"));
  if (!res.ok) {
    throw new Error("Failed to fetch locations");
  }
  const locations: Location[] = await res.json();

  return (
    <div className=" w-full min-h-screen bg-gray-100 items-center flex flex-col">
      <div className="flex-col max-w-5xl w-full flex gap-6 md:px-8 py-8 ">
        <div className="flex flex-col md:flex-row gap-3 items-start px-4 md:px-0 md:items-center ">
          <Link
            href="/products/transfers"
            className="p-1 rounded-md hover:bg-black/10 transition-all"
          >
            <IoIosArrowRoundBack size={20} className="text-[#1a1a1a]" />
          </Link>
          <h1 className="text-xl font-bold text-[#1a1a1a]">Create Transfer</h1>
        </div>

        <CreateTransferForm locations={locations} />
      </div>
    </div>
  );
}
