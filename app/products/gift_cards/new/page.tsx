import React from "react"
import Link from "next/link"
import CreateGiftCardForm from "@/components/products/gift_cards/CreateGiftCardForm"
import { IoIosArrowRoundBack } from "react-icons/io"

export const dynamic = "force-dynamic"

export default function CreateGiftCardPage() {

    return (
        <div className=" w-full min-h-screen bg-gray-100 items-center flex flex-col">
            <div className="flex-col max-w-5xl w-full flex gap-6 md:px-8 py-8 ">
                <div className="flex gap-3 items-start md:items-center flex-col md:flex-row px-4 md:px-0 ">
                    <Link href="/products/gift_cards" className="p-1 rounded-md hover:bg-black/10 transition-all">
                        <IoIosArrowRoundBack size={20} className="text-[#1a1a1a]" />
                    </Link>
                    <h1 className="text-xl font-bold text-[#1a1a1a]">Create Gift Card</h1>
                </div>

                <CreateGiftCardForm />
            </div>
        </div>
    )
}
