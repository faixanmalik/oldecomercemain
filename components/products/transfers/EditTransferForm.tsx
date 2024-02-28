
'use client'

import React from "react"
import Link from "next/link"
import Card from "@/components/Card"
import SectionTitle from "@/components/SectionTitle"
import StatusText from "@/components/StatusText"
import { ApiTransfer, ApiTransferSchema, Transfer } from "@/types/transfer"
import { IoIosArrowDown, IoIosArrowRoundBack, IoIosClose } from "react-icons/io"
import Spinner from "@/components/Spinner"
import FilledButton from "@/components/buttons/FilledButton"
import axios from "axios"
import toast from "react-hot-toast"
import { ZodError } from "zod"
import { HiOutlineDotsHorizontal } from "react-icons/hi"
import { Button } from "@/components/ui/button"
import Text from "@/components/Text"
import OrderedProductsDatatable from "./OrderedProductsDatatable"

export default function EditTransferForm({ initialTransfer }: { initialTransfer: Transfer }) {

  const [transfer, setTransfer] = React.useState<ApiTransfer>({ ...initialTransfer, destination: initialTransfer.destination._id, origin: initialTransfer.origin._id })
  const [loading, setLoading] = React.useState(false)

  async function handleSave() {

    setLoading(true)

    try {

      ApiTransferSchema.parse(transfer)
      const { status } = await axios.put(`/api/products/transfers/${initialTransfer._id}`, transfer)
      if (status === 200) {
        toast.success("Transfer saved!")
      }

    }
    catch (error) {

      if (error instanceof ZodError) {
        toast.error(error.errors[0].message);
      } else {
        toast.error("Something went wrong")
        console.log(error)
      }

    }
    finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex-col max-w-5xl w-full flex gap-6 md:px-8 py-8 ">
      <div className="flex px-4 md:px-0 gap-3 items-start md:items-center justify-between">

        <div className="flex flex-col md:flex-row gap-4 items-start">
          <Link href="/products/transfers" className="p-1 rounded-md hover:bg-black/10 transition-all">
            <IoIosArrowRoundBack size={20} className="text-[#1a1a1a]" />
          </Link>
          <h1 className="text-xl font-bold text-neutral-800 flex gap-2 items-center">
            #{transfer.referenceNumber}
            <StatusText status={transfer.status} />
          </h1>
        </div>

        <div className="flex h-min gap-2">
          <div className="hidden md:flex md:gap-2">
            <Button variant="ghost" className="p-2 bg-gray-200 text-black items-center hover:bg-gray-300 h-min text-xs" onClick={() => { }} >
              Edit
            </Button>
            <Button variant="ghost" className="p-2 bg-gray-200 text-black flex gap-2 items-center hover:bg-gray-300 h-min text-xs" onClick={() => { }} >
              Duplicate <IoIosArrowDown size={14} />
            </Button>
            <Button variant="ghost" className="p-2 bg-gray-200 text-black flex gap-2 items-center hover:bg-gray-300 h-min text-xs" onClick={() => { }} >
              More actions <IoIosArrowDown size={14} />
            </Button>
          </div>

          <div className="flex md:hidden">
            {/*TODO: handle onClick*/}
            <Button variant="ghost" className="p-2 bg-gray-200 text-black hover:bg-gray-300 h-min text-xs" onClick={() => { }}>
              <HiOutlineDotsHorizontal size={14} />
            </Button>
          </div>

          {
            transfer.status === "draft" ? (
              <FilledButton onClick={() => setTransfer({ ...transfer, status: "pending" })}>
                Mark as Pending
              </FilledButton>
            ) : (

              <FilledButton onClick={() => { }}>
                Recieve Inventory
              </FilledButton>
            )
          }
        </div>

      </div>

      <Card className="flex flex-col md:flex-row gap-4 md:gap-0 p-4">
        <div className="flex flex-col w-full">
          <SectionTitle title="Origin" />
          {
            <div className="flex flex-col w-full items-start gap-2">
              <h3 className="text-xl text-gray-900 font-bold">{initialTransfer.origin.name}</h3>
              <Text>{initialTransfer.origin.address}, {initialTransfer.origin.city}</Text>
            </div>
          }
        </div>

        <div className="min-h-full w-[1px] bg-gray-300 mx-4" />

        <div className="w-full h-full flex flex-col gap-4">
          <SectionTitle title="Destination" />
          {
            <div className="flex flex-col w-full items-start gap-2">
              <h3 className="text-xl text-gray-900 font-bold">{initialTransfer.destination.name}</h3>
              <Text>{initialTransfer.destination.address}, {initialTransfer.destination.city}</Text>
            </div>
          }
        </div>
      </Card>

      <Card className="p-4">
        <SectionTitle title="Ordered products" />
        <OrderedProductsDatatable items={initialTransfer.items} />
        <Text className="text-gray-800 mt-4">{transfer.items.length} variants on transfer</Text>
      </Card>

      <div className="flex flex-col md:flex-row gap-4">
        <Card className="flex flex-col p-4 gap-4 h-min w-full">
          <SectionTitle title="Shipping Details" />
          <div className="flex gap-4 flex-col w-full items-start">
            <div className="flex flex-col gap-2 w-full">
              <Text>Expected arrival</Text>
              <Text className="text-gray-800">{transfer.shipping.arrivalDate?.substring(0, 10) ?? "None"}</Text>
            </div>
            <div className="flex flex-col gap-2 w-full">
              <Text>Shipping carrier</Text>
              <Text className="text-gray-800">{transfer.shipping.carrier ?? "None"}</Text>
            </div>
            <div className="flex flex-col gap-2 w-full">
              <Text>Tracking number</Text>
              <Text className="text-blue-600 uderline cursor-pointer">{transfer.shipping.trackingNumber ?? "None"}</Text>
            </div>
          </div>
        </Card>

        <Card className="p-4 w-full flex gap-4 flex-col">
          <SectionTitle title="Additional details" />
          <AdditionalDetails transfer={transfer} setTransfer={setTransfer} />
        </Card>
      </div>

      <div className="w-full max-w-5xl flex justify-end mb-8 px-4 md:px-0">
        {
          loading ? (
            <Spinner />
          ) : (
            <FilledButton disabled={loading} onClick={handleSave}>Save</FilledButton>
          )
        }
      </div>

    </div>
  )
}

function AdditionalDetails({ transfer, setTransfer }: { transfer: ApiTransfer, setTransfer: React.Dispatch<React.SetStateAction<ApiTransfer>> }) {

  return (
    <>
      <div className="flex flex-col gap-2">
        <Text>Reference number</Text>
        <Text className="text-gray-800">{transfer.referenceNumber}</Text>
      </div>
      <div className="flex gap-2">
        {transfer.tags.map((tag) => (
          <div
            key={tag}
            className="bg-slate-200 w-min whitespace-nowrap px-2 py-1 rounded-md text-sm flex items-center gap-1"
          >
            <Text className="text-gray-800">{tag}{" "}</Text>
            <button
              onClick={() =>
                setTransfer({ ...transfer, tags: transfer.tags.filter((t) => t !== tag) })
              }
            >
              <IoIosClose size={20} />
            </button>
          </div>
        ))}
      </div>

    </>
  )
}
