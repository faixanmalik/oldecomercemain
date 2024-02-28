import React, { useState } from "react"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import Text from "@/components/Text"
import { ApiInventoryLevel, InventoryLevel } from "@/types/product"
import { IoIosArrowDown } from "react-icons/io"
import InventoryOptionsPopover from "./InventoryOptionsPopover"


export default function UnavailableInventoryPopover({ inventoryLevel }: { inventoryLevel: ApiInventoryLevel | InventoryLevel }) {

  const [open, setOpen] = useState(false)

  const [quantities, setQuantities] = useState<{ [key: string]: number }>({
    'Damaged': 0,
    'Quality control': 0,
    'Safety stock': 0,
    'Other': 0,
  })

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button onClick={() => setOpen(!open)} className="p-2 rounded-md focus:ring-2 focus:ring-blue-700 flex items-center gap-2">
          <Text className="text-gray-800">{inventoryLevel.unavailable || 0}</Text>
          <IoIosArrowDown className="text-gray-800 icon transition-all" size={14} />
        </button>
      </PopoverTrigger>
      <PopoverContent className="rounded-xl items-start w-60 whitespace-nowrap p-2 bg-white flex gap-1 flex-col">

        <Text className="text-gray-800 mb-1 font-bold">Unavailable inventory</Text>
        {
          Object.entries(quantities).map(([name, value]) => (
            <div key={name} className="w-full flex justify-between items-center">
              <Text className="text-gray-800">{name}</Text>
              <InventoryOptionsPopover quantity={value} />
            </div>
          ))
        }

      </PopoverContent>
    </Popover >)
}
