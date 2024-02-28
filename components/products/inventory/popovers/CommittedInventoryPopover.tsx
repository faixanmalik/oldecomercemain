import React, { useState } from "react"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import Text from "@/components/Text"
import { IoIosArrowDown } from "react-icons/io"

export default function CommittedInventoryPopover({ quantity }: { quantity: number }) {

  const [open, setOpen] = useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button onClick={() => setOpen(!open)} className="p-2 rounded-md focus:ring-2 focus:ring-blue-700 flex items-center gap-2">
          <Text className="text-gray-800">{quantity}</Text>
          <IoIosArrowDown className="text-gray-800 icon transition-all" size={14} />
        </button>
      </PopoverTrigger>
      <PopoverContent className="rounded-xl items-start w-60 whitespace-nowrap p-2 bg-white flex gap-1 flex-col">
        {
          quantity > 0 ? (
            "Some"
          ) : (
            <Text className="text-gray-800">No unfilfilled orders for this item</Text>
          )
        }

      </PopoverContent>
    </Popover >)
}
