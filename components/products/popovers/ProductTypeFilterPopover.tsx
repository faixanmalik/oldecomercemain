import TextButton from "@/components/buttons/TextButton"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useEffect, useState } from "react"
import Checkbox from "@/components/Checkbox"
import { IoIosArrowDown } from "react-icons/io"
import Text from "@/components/Text"

export default function ProductTypeFilterPopover({ productTypes, onChange }: { productTypes: string[], onChange: (productTypes: string[]) => void | Promise<void> }) {

  const [selectedVendorIds, setSelectedVendorIds] = useState<string[]>([])

  useEffect(() => {
    onChange(selectedVendorIds)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedVendorIds])

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="px-2 gap-1 flex items-center rounded-lg h-min py-1 text-gray-800 text-xs border-dashed border-gray-200 hover:border-solid hover:bg-transparent" onClick={() => { }}>
          <Text className="text-gray-800">Product type</Text>
          <IoIosArrowDown size={14} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-max whitespace-nowrap p-3 rounded-xl">
        <div className="flex flex-col gap-2 w-full items-start">

          {
            productTypes.map(pt => (
              <Checkbox key={pt} id={pt} label={pt} checked={false} onChange={e => { }} />
            ))
          }

          <TextButton className="mt-2" disabled={selectedVendorIds.length === 0} onClick={() => setSelectedVendorIds([])}>
            Clear
          </TextButton>

        </div>
      </PopoverContent>
    </Popover >
  )
}

