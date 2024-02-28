"use client"

import { HeaderItem } from "@/types/datatable"
import { ApiPurchaseOrderItem } from "@/types/purchaseOrder"
import Link from "next/link"
import Text from "@/components/Text"
import React from "react"
import { PiImagesSquareThin } from "react-icons/pi"
import Image from "next/image"
import TextButton from "@/components/buttons/TextButton"

export default function AddProductsDatable({ initialItems }: { initialItems: ApiPurchaseOrderItem[] }) {

  function MobileRow({ item: poi }: { item: ApiPurchaseOrderItem }) {
    return (

      <div className="flex bg-white py-3 border-t border-gray-200 w-full px-3">
        <div className="flex items-center justify-between w-full">
          <div className="flex flex-col gap-1">
            <Link href={poi.product === null ? `/products/${poi.variant}` : `/products/${poi.product}/variants/${poi.variant}`}>
              <TextButton className="font-bold">{poi.productTitle}</TextButton>
            </Link>
            <Text>{poi.variantName}</Text>
          </div>
        </div>
      </div>
    )
  }

  function Row({ item: poi }: { item: ApiPurchaseOrderItem }) {
    return (
      <div className={`border-b flex items-center transition-all text-gray-800 bg-white hover:bg-gray-50`}>
        <div className="flex gap-2 w-80 items-start py-4 font-medium text-gray-900 whitespace-nowrap">
          <div className={`rounded-md overflow-hidden grid self-center mr-2 transition-all text-gray-300 place-items-center bg-white h-14 w-14 min-w-[56px] ${poi.image ? "" : "border-2 border-gray-300 border-dashed "}`} >
            {
              poi.image ? (
                <Image src={poi.image} alt={poi.productTitle} width={0} height={0} sizes="100vw" style={{ width: '100%', height: '100%' }} />
              ) : (
                <PiImagesSquareThin size={24} className="text-gray-500" />
              )
            }
          </div>
          <div className="flex flex-col gap-1">
            <Link href={poi.product === null ? `/products/${poi.variant}` : `/products/${poi.product}/variants/${poi.variant}`}>
              <TextButton className="font-bold">{poi.productTitle}</TextButton>
            </Link>
            <Text>{poi.variantName}</Text>
          </div>
        </div>

        <div className="px-6 py-2 w-1/5">
          {poi.supplierSKU}
        </div>
        <div className="px-6 py-2 w-1/5">
          {/*TODO: */}
          0 of 0
        </div>
      </div>
    )
  }

  const headerItems = getHeaderItems()

  return (
    <div className="relative overflow-x-auto overflow-hidden">

      <div className="w-full">
        <div className="w-full text-sm text-left overflow-y-scroll rtl:text-right text-gray-500 ">
          <div
            className={`text-[10px] text-gray-700 uppercase border-t-2 border-b-2 bg-gray-100`}
          >
            <div className="flex w-full items-center">
              {headerItems.map((h) => (
                <div key={h.label} className={`px-6 w-full py-1`}>
                  {h.label}
                </div>
              ))}
            </div>
          </div>

          <div className="hidden sm:block text-xs bg-red-500 w-full">
            {initialItems.map((item) => (
              <Row key={item._id} item={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}


function getHeaderItems(): HeaderItem<ApiPurchaseOrderItem>[] {
  return [
    { label: "Products", sortable: false },
    { label: "SKU", sortable: false },
    { label: "Received", sortable: false },
  ]
}
