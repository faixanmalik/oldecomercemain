import TextButton from "@/components/buttons/TextButton"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Vendor } from "@/types/vendor"
import { useEffect, useState } from "react"
import Checkbox from "@/components/Checkbox"
import { IoIosArrowDown } from "react-icons/io"
import Text from "@/components/Text"

export default function ProductVendorFilterPopover({ vendors, onChange }: { vendors: Vendor[], onChange: (vendorIds: string[]) => void | Promise<void> }) {

  const [selectedVendorIds, setSelectedVendorIds] = useState<string[]>([])

  useEffect(() => {
    onChange(selectedVendorIds)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedVendorIds])

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="px-2 gap-1 flex items-center rounded-lg h-min py-1 text-gray-800 text-xs border-dashed border-gray-200 hover:border-solid hover:bg-transparent" onClick={() => { }}>
          <Text className="text-gray-800">Product vendor</Text>
          <IoIosArrowDown size={14} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-max whitespace-nowrap p-3 rounded-xl">
        <div className="flex flex-col gap-2 w-full items-start">

          {
            vendors.map(v => (
              <Checkbox key={v._id} id={v._id} label={v.name} checked={false} onChange={e => {
                if (e.target.checked) {
                  setSelectedVendorIds([...selectedVendorIds, v._id])
                } else {
                  setSelectedVendorIds(selectedVendorIds.filter(_s => _s !== v._id))
                }
              }} />
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

