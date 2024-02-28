
import React, { useState } from "react"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import Text from "@/components/Text"
import { IoIosAddCircleOutline, IoIosArrowDown } from "react-icons/io"
import PopoverButton from "@/components/buttons/PopoverButton"
import { RiDeleteBinLine } from "react-icons/ri"
import { FaArrowRightLong } from "react-icons/fa6"


export default function InventoryOptionsPopover({ quantity }: { quantity: number }) {

  const [open, setOpen] = useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button onClick={() => setOpen(!open)} className="p-2 rounded-md focus:ring-2 focus:ring-blue-700 flex items-center gap-2">
          <Text className="text-blue-600">{quantity || 0}</Text>
          <IoIosArrowDown className="text-blue-600" size={14} />
        </button>
      </PopoverTrigger>
      <PopoverContent className="rounded-xl max-h-[50vh] overflow-y-scroll items-start w-min whitespace-nowrap p-1.5 bg-white flex gap-2 flex-col">

        <PopoverButton className="flex gap-2">
          <IoIosAddCircleOutline className="text-gray-800" size={14} />
          <Text className="text-gray-800">Add inventory</Text>
        </PopoverButton>

        <PopoverButton className="flex gap-2">
          <FaArrowRightLong className="text-gray-800" size={14} />
          <Text className="text-gray-800">Move to available</Text>
        </PopoverButton>

        <PopoverButton className="flex gap-2">
          <RiDeleteBinLine className="text-red-600" size={14} />
          <Text className="text-red-600">Delete</Text>
        </PopoverButton>

      </PopoverContent>
    </Popover >)
}
