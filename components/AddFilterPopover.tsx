import React, { useState } from "react"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import Text from "./Text"


export default function AddFilterPopover({ filters, disabled, onSelect }: { filters: string[], disabled: string[], onSelect: (filter: string) => void }) {

  const [open, setOpen] = useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" disabled={filters.length === disabled.length} className="px-2 border-dashed rounded-lg h-min py-1 text-gray-800 text-xs hover:bg-gray-200/75" onClick={() => { }}>
          Add filter +
        </Button>
      </PopoverTrigger>
      <PopoverContent className="rounded-xl max-h-[50vh] overflow-y-scroll items-start w-min whitespace-nowrap p-1.5 bg-white flex gap-1 flex-col">

        {
          filters.map(f => (
            !disabled.includes(f) && <button key={f} className="p-2 w-full text-start bg-transparent hover:bg-gray-100 transition-all rounded-lg" onClick={() => {
              setOpen(false)
              onSelect(f)
            }}>
              <Text className="text-gray-800">{f}</Text>
            </button>
          ))
        }

      </PopoverContent>
    </Popover >)
}
