"use client"

import Checkbox from "@/components/Checkbox"
import StatusText from "@/components/StatusText"
import { useRouter } from "next/navigation"
import Card from "@/components/Card"
import { Button } from "@/components/ui/button"
import { FilterElements, HeaderItem, RowProps } from "@/types/datatable"
import Datatable from "../../Datatable"
import { PurchaseOrder } from "@/types/purchaseOrder"
import Link from "next/link"
import Text from "@/components/Text"
import { FaCircle } from "react-icons/fa"
import StatusFilterPopover from "../popovers/StatusFilterPopover"
import { useState } from "react"
import SearchItemFilterPopover from "../popovers/SearchItemFilterPopover"
import { Supplier } from "@/types/supplier"
import TagFilterPopover from "../popovers/TagFilterPopover"
import { Location } from "@/types/location"
import ExpectedArrivalFilterPopover from "./popovers/ExpectedArrivalFilterPopover"

export default function PurchaseOrdersDatable({ initialPurchaseOrders, locations, suppliers, tags }: { initialPurchaseOrders: PurchaseOrder[], locations: Location[], suppliers: Supplier[], tags: string[] }) {

  const router = useRouter()

  function MobileRow({ item: po }: RowProps<PurchaseOrder>) {
    return (

      <Link href={`/products/purchase_orders/${po._id}`} key={po._id} className="flex bg-white py-4 border-t border-gray-200 w-full px-3">

        <div className="flex items-center justify-between w-full">
          <div className="flex gap-1 flex-col">
            <Text className="text-gray-800 font-bold flex items-center gap-1 text-base">#{po.referenceNumber} <span className="text-gray-500 flex items-center gap-1 text-xs"><FaCircle size={5} /> reference</span></Text>
            <Text className="text-gray-500 flex items-center gap-1 text-xs">{po.supplier?.name} <FaCircle size={5} className="text-gray-500" /> {po.destination.name ?? "No destination"}</Text>
            <Text className="text-gray-500 flex items-center gap-1 text-xs">$ {po.total} <FaCircle size={5} className="text-gray-500" /> {po.shipping.arrivalDate?.substring(0, 10) ?? "No arrival date"}</Text>
          </div>
          <div className="flex flex-col">
            <Text className="text-gray-800 flex items-center gap-1">
              <FaCircle size={8} className="text-gray-800" />
              Recieved
            </Text>
            <Text>1 of 1</Text>
          </div>
        </div>
      </Link>
    )
  }

  function Row({ item: po, isSelected, setSelected }: RowProps<PurchaseOrder>) {

    return (
      <tr className={`border-b transition-all text-gray-800 ${isSelected ? "bg-gray-100 hover:bg-gray-200 " : "bg-white hover:bg-gray-50 "}`}>
        <td className="w-4 p-4">
          <Checkbox id={"select-" + po._id} checked={isSelected} label="" onChange={e => setSelected(e.target.checked)} />
        </td>

        <th scope="row" onClick={() => router.push(`/products/purchase_orders/${po._id}`)} className="flex flex-col gap-2 items-start xl:min-w-[240px] py-4 font-medium text-gray-900 whitespace-nowrap cursor-pointer">
          <Text className="font-bold text-gray-800">#{po.referenceNumber}</Text>
          <Text>reference</Text>
        </th>

        <td className="px-6 py-2">
          {po.supplier.name ?? po.supplier.company}
        </td>
        <td className="px-6 py-2">
          {po.destination.name}
        </td>
        <td className="px-6 py-2">
          <StatusText status={po.status} />
        </td>
        <td className="px-6 py-2">
          0 of 0
        </td>
        <td className="px-6 py-2">
          {po.total}
        </td>
        <td className="px-6 py-2">
          {po.shipping.arrivalDate ? (new Date(po.shipping.arrivalDate)).toISOString().slice(0, 10) : ""}
        </td>
      </tr>
    )
  }


  const [statuses, setStatuses] = useState<string[]>([])
  const [selectedTag, setSelectedTag] = useState<string | null>(null)
  const [arrivalDateType, setArrivalDateType] = useState<'On or before' | 'On or after' | null>(null)
  const [date, setDate] = useState<Date | undefined>(undefined)

  const filters = {
    "Status": statuses,
    "Tagged with": selectedTag,
    "Expected arrival": arrivalDateType,
    "Expected arrival type": arrivalDateType,
  }

  const setFilters = {
    "Status": setStatuses,
    "Tagged with": setSelectedTag,
    "Expected arrival": setArrivalDateType,
    "Expected arrival type": setArrivalDateType,
  }

  return (
    <Datatable<PurchaseOrder>
      initialItems={initialPurchaseOrders}
      sortPopoverProps={{
        //TODO: fecth new `initialPurchaseOrders` from API
        onSelect: (value) => { console.log(value) },
        options: [
          { label: "Created", value: "createdAt" },
          { label: "Expected arrival date", value: "shipping.arrivalDate" },
          { label: "Supplier", value: "supplier.name" },
          { label: "Destination", value: "destination.name" },
          { label: "Status", value: "status" },
        ]
      }}
      ActionsCard={ActionsCard}
      Row={Row}
      MobileRow={MobileRow}
      headerItems={getHeaderItems(initialPurchaseOrders)}
      views={["all", "active", "draft", "archived"]}
      filters={getAllFilters(suppliers, tags, locations, filters, setFilters)}
    />
  )
}


function ActionsCard() {
  return (
    <div className="py-4 min-w-full w-full grid bg-white place-items-center">
      <Card className="px-4 py-2 flex gap-2">

        <Button variant="ghost" className="p-2 bg-gray-200 text-black hover:bg-gray-300 h-min text-xs" onClick={() => { }}>
          Add tags
        </Button>
        <Button variant="ghost" className="p-2 bg-gray-200 text-black hover:bg-gray-300 h-min text-xs" onClick={() => { }}>
          Remove tags
        </Button>

      </Card>
    </div>
  )
}

function getHeaderItems(products: PurchaseOrder[]): HeaderItem<PurchaseOrder>[] {
  return [
    { label: "Purchase Order", sortable: false },

    {
      label: "Supplier", sortable: true, onSort: (sortKey) => {
        let sortedPurchaseOrders = [...products]
        switch (sortKey) {
          case "desc": sortedPurchaseOrders.sort((a, b) => a.supplier.name.localeCompare(b.supplier.name)); break;
          case "asc": sortedPurchaseOrders.sort((a, b) => b.supplier.name.localeCompare(a.supplier.name)); break;
          default: throw new Error("Sort type not allowed")
        }
        return sortedPurchaseOrders
      }
    },

    {
      label: "Destination", sortable: true, onSort: (sortKey) => {
        let sortedPurchaseOrders = [...products]
        switch (sortKey) {
          case "desc": sortedPurchaseOrders.sort((a, b) => a.destination.name.localeCompare(b.destination.name)); break;
          case "asc": sortedPurchaseOrders.sort((a, b) => b.destination.name.localeCompare(a.destination.name)); break;
          default: throw new Error("Sort type not allowed")
        }
        return sortedPurchaseOrders
      }
    },


    {
      label: "Status", sortable: true, onSort: (sortKey) => {
        let sortedPurchaseOrders = [...products]
        switch (sortKey) {
          case "desc": sortedPurchaseOrders.sort((a, b) => a.status.localeCompare(b.status)); break;
          case "asc": sortedPurchaseOrders.sort((a, b) => b.status.localeCompare(a.status)); break;
          default: throw new Error("Sort type not allowed")
        }
        return sortedPurchaseOrders
      }
    },

    { label: "Recieved", sortable: false },
    { label: "Total", sortable: false },

    {
      label: "Expected arrival", sortable: true, onSort: (sortKey) => {
        let sortedPurchaseOrders = [...products]
        switch (sortKey) {
          case "desc": sortedPurchaseOrders.sort((a, b) => {
            if (a.shipping.arrivalDate && b.shipping.arrivalDate) {
              return new Date(a.shipping.arrivalDate).getTime() - new Date(b.shipping.arrivalDate).getTime()
            }
            return 0
          }); break;
          case "asc": sortedPurchaseOrders.sort((a, b) => {
            if (a.shipping.arrivalDate && b.shipping.arrivalDate) {
              return new Date(b.shipping.arrivalDate).getTime() - new Date(a.shipping.arrivalDate).getTime()
            }
            return 0
          }); break;
          default: throw new Error("Sort type not allowed")
        }
        return sortedPurchaseOrders
      }
    },
  ]
}


function getAllFilters(suppliers: Supplier[], tags: string[], locations: Location[], filters: any, setFilters: any): FilterElements {

  // TODO: create popovers
  return {
    "Status": <StatusFilterPopover statuses={['Darft', 'Partial', 'Ordered', 'Received', 'Closed']} selectedStatuses={filters["Status"]} onChange={setFilters["Status"]} />,
    "Supplier": <SearchItemFilterPopover items={suppliers.map(s => ({ _id: s._id, name: s.name }))} listHeading="Suppliers" selectedItem={null} onChange={() => { }} />,
    "Tagged with": <TagFilterPopover tags={tags} selectedTag={filters["Status"]} onChange={setFilters["Tagged with"]} />,
    "Destination": <SearchItemFilterPopover items={locations.map(s => ({ _id: s._id, name: s.name }))} listHeading="Suppliers" selectedItem={null} onChange={() => { }} />,
    "Expected Arrival": <ExpectedArrivalFilterPopover selectedArrivalType={filters["Expected arrival type"]} setArrivalType={setFilters["Expected arrival type"]} date={filters["Expected arrival"]} setDate={setFilters["Expected arrival"]} />,
  }
}


