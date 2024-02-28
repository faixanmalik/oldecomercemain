import React from "react";
import Link from "next/link";
import Heading from "@/components/Heading";
import CreateCollectionForm from "@/components/products/collections/CreateCollectionForm";
import { IoIosArrowRoundBack } from "react-icons/io";

export const dynamic = "force-dynamic"

export default function NewCollectionPage() {
  return (
    <div className=" w-full bg-gray-100 min-h-screen items-center flex flex-col">
      <div className="flex-col max-w-5xl w-full flex gap-6  md:px-8 py-8 ">
        <div className="flex gap-3 items-center ">
          <Link
            href="/products"
            className="p-1 rounded-md hover:bg-black/10 transition-all"
          >
            <IoIosArrowRoundBack size={20} className="text-[#1a1a1a]" />
          </Link>
          <Heading>Create collection</Heading>
        </div>

        <CreateCollectionForm />
      </div>
    </div>
  );
}
