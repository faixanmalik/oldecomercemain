'use client'

import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import SupplierDialog from "@/components/products/purchase_orders/SupplierDialog"
import { Supplier } from "@/types/supplier";
import { IoIosArrowDown, IoIosArrowRoundBack } from "react-icons/io";
import Text from "@/components/Text";
import React from "react";
import Link from "next/link";
import Card from "@/components/Card";
import SectionTitle from "@/components/SectionTitle";
import TitleMini from "@/components/TitleMini";
import StatusText from "@/components/StatusText";
import { AdjustmentName, ApiPurchaseOrder, ApiPurchaseOrderSchema, PurchaseOrder } from "@/types/purchaseOrder";
import FilledButton from "@/components/buttons/FilledButton";
import Spinner from "@/components/Spinner";
import axios from "axios";
import toast from "react-hot-toast";
import { ZodError } from "zod";
import AddProductsDatable from "./AddProductsDatatable";
import { toApiPurchaseOrderItems } from "@/lib/products/utils";

export default function EditPurchaseOrderForm({ initialOrder }: { initialOrder: PurchaseOrder }) {

  const [purchaseOrder, setPurchaseOrder] = React.useState<ApiPurchaseOrder>({ ...initialOrder, items: toApiPurchaseOrderItems(initialOrder.items), supplier: initialOrder.supplier._id, destination: initialOrder.destination._id })
  const [loading, setLoading] = React.useState(false)

  function getTotalTax() {
    return initialOrder.items.reduce((acc, curr) => acc + curr.tax, 0);
  }

  async function handleSave() {
    setLoading(true)
    try {

      ApiPurchaseOrderSchema.parse(purchaseOrder)
      const { status } = await axios.put(`/api/products/transfers/${initialOrder._id}`, purchaseOrder)
      if (status === 200) {
        toast.success("Transfer saved!")
      }

    }
    catch (error) {

      if (error instanceof ZodError) {
        toast.error(error.errors[0].message);
      } else {
        toast.error("Something went wrong")
      }
      console.log(error)

    }
    finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div className="flex px-4 md:px-0 justify-between items-start md:items-center ">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
          <Link href="/products/purchase_orders" className="p-1 rounded-md hover:bg-black/10 transition-all">
            <IoIosArrowRoundBack size={20} className="text-[#1a1a1a]" />
          </Link>
          <h1 className="text-xl font-bold text-neutral-800 flex gap-2 items-center">
            #{purchaseOrder.referenceNumber}
            <StatusText status={purchaseOrder.status} />
          </h1>
        </div>

        <div className="flex gap-2">
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

          <FilledButton onClick={() => { }}>
            Mark as Ordered
          </FilledButton>
        </div>
      </div>

      <Card className="flex flex-col items-center justify-center p-4">
        <div className="flex flex-col md:flex-row w-full h-full gap-4">
          <div className="w-full h-full flex flex-col items-start gap-4">
            <SectionTitle title="Supplier" />
            {
              purchaseOrder.supplier ?
                <div className="flex flex-col w-full items-start gap-2">
                  <h3 className="text-xl text-gray-900 font-bold">{initialOrder.supplier.company}</h3>
                  <div className="w-full flex flex-col md:flex-row justify-between">
                    <Text>{initialOrder.supplier.address}, {initialOrder.supplier.city}</Text>
                    <SupplierPopover supplier={initialOrder.supplier} />
                  </div>
                </div>
                :
                <SupplierDialog text="Create Supplier" heading="Create Supplier" onSave={s => setPurchaseOrder({ ...purchaseOrder, supplier: s._id })} />
            }
          </div>

          <div className="w-full h-full flex flex-col gap-4">
            <SectionTitle title="Destination" />
            {
              <div className="flex flex-col w-full items-start gap-2">
                <h3 className="text-xl text-gray-900 font-bold">{initialOrder.destination.name}</h3>
                <Text>{initialOrder.destination.address}, {initialOrder.destination.city}</Text>
              </div>
            }
          </div>
        </div>

        {
          purchaseOrder.paymentTerms && (
            <div className="w-full flex flex-col md:flex-row justify-between gap-4 mt-8">
              <Text>Payment Terms</Text>
              <Text className="text-gray-800">{purchaseOrder.paymentTerms}</Text>
            </div>
          )
        }

      </Card>

      <Card className="p-4 flex flex-col items-start">
        <SectionTitle title="Shipping Details" />
        <div className="mt-4 flex gap-4 flex-col w-full items-start xl:flex-row">
          <div className="flex flex-col gap-2 w-1/3">
            <Text>Expected arrivallll</Text>
            <Text className="text-gray-800">{purchaseOrder.shipping.arrivalDate?.substring(0, 10) ?? "No arrival date"}</Text>
          </div>
          <div className="flex flex-col gap-2 w-1/3">
            <Text>Shipping carrier</Text>
            <Text className="text-gray-800">{purchaseOrder.shipping.carrier}</Text>
          </div>
          <div className="flex flex-col gap-2 w-1/3">
            <Text>Tracking number</Text>
            <Text className="text-blue-600 uderline cursor-pointer">{purchaseOrder.shipping.trackingNumber}</Text>
          </div>
        </div>
      </Card>

      <Card className="p-4">
        <SectionTitle title="Add Products" />
        <AddProductsDatable initialItems={purchaseOrder.items} />
        <Text className="text-gray-800 mt-4">{purchaseOrder.items.length} variant on purchase order</Text>
      </Card>

      <div className=" flex flex-col 2xl:flex-row w-full gap-6">
        <Card className="p-4 w-full flex gap-4 flex-col">
          <SectionTitle title="Additional details" />
          <AdditionalDetails purchaseOrder={purchaseOrder} />
        </Card>

        <Card className="p-4 w-full h-max">
          <SectionTitle title="Cost summary" />
          <div className="flex items-center justify-between w-full">
            <p className="text-xs mb-2 text-neutral-800">Taxes (included)</p>
            <p className="text-xs text-neutral-800" >$ {getTotalTax()}</p>
          </div>

          <div className="flex items-center justify-between w-full">
            <TitleMini text="Subtotal" />
            <p className="text-xs whitespace-nowrap text-neutral-800" >$ 0.00</p>
          </div>
          <Text className="text-neutral-500 mb-4">{initialOrder.items.reduce((acc, p) => acc + p.quantity, 0)} items</Text>

          <TitleMini text="Cost adjustments" />
          <CostAdjustments adjustments={purchaseOrder.costAdjustments} />

          <div className="flex justify-between items-center w-full mt-4">
            <h3 className="text-xs font-bold mb-2 text-neutral-800">Total</h3>
            <p className="text-xs text-neutral-800" >$ {initialOrder.items.reduce((acc, p) => acc + (p.cost || 10) + p.tax, 0).toFixed(2)}</p>
          </div>
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
    </>
  )
}


function CostAdjustments({ adjustments }: { adjustments: { name: AdjustmentName, value: number }[] }) {
  if (adjustments.length === 0) {
    return <Text>None</Text>
  }
  return (
    <>
      {adjustments.map(a => (
        <div key={a.name} className="flex justify-between items-center w-full">
          <h3 className="text-xs mb-2 text-neutral-800">{a.name}</h3>
          <p className="text-xs text-neutral-800" >$ {a.value}</p>
        </div>
      ))}
    </>
  )
}

function AdditionalDetails({ purchaseOrder }: { purchaseOrder: ApiPurchaseOrder }) {

  return (
    <>
      <div className="flex flex-col gap-2">
        <Text>Reference number</Text>
        <Text className="text-gray-800">{purchaseOrder.referenceNumber}</Text>
      </div>
      {
        purchaseOrder.noteToSupplier && (
          <div className="flex flex-col gap-2">
            <Text>Note to supplier</Text>
            <Text className="text-gray-800">{purchaseOrder.noteToSupplier}</Text>
          </div>
        )
      }
      <div className="flex gap-2">
        {purchaseOrder.tags.map((tag) => (
          <div
            key={tag}
            className="bg-slate-200 w-min whitespace-nowrap text-gray-900 px-2 py-1 rounded-md text-sm flex items-center gap-1"
          >
            {tag}
          </div>
        ))}
      </div>

    </>
  )
}

function SupplierPopover({ supplier }: { supplier: Supplier }) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size="sm" variant="link" className="text-xs text-blue-700">
          View supplier
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-max whitespace-nowrap flex flex-col gap-1 items-start">

        <Text className="font-bold text-gray-900">Address</Text>
        <Text className="text-gray-900 mt-1">{supplier.address}</Text>
        <Text className="text-gray-900">{supplier.apartment}</Text>
        <Text className="text-gray-900">{supplier.city} {supplier.postalCode}</Text>
        <Text className="text-gray-900">{supplier.country}</Text>

        <Text className="font-bold text-gray-900 mt-3">Contact</Text>
        <Text className="text-gray-900 mt-1">{supplier.contactName}</Text>
        <Text className="text-gray-900">{supplier.email}</Text>
        <Text className="text-gray-900 mb-3">{supplier.phoneNumber}</Text>

        <SupplierDialog text="Edit Supplier" heading="Edit Supplier" onSave={s => console.log(s)} />

      </PopoverContent>
    </Popover >
  )
}
