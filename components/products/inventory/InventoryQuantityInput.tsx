import React, { useState } from "react"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import Text from "@/components/Text";
import { LuSettings2 } from "react-icons/lu";
import Select from "@/components/Select";
import Input from "@/components/Input";

export default function InventoryQuantityInput({ value, onChange, extendedPopover = false }: { value: number, extendedPopover?: boolean, onChange: React.ChangeEventHandler<HTMLInputElement> }) {
  return (
    <div className="flex">
      <Input id="change-quantity" className="w-24" type="number" onChange={onChange} />
      <SettingsPopover originalQuantity={value} extendedPopover={extendedPopover} onChange={onChange} />
    </div>
  )
}

export function SettingsPopover({ originalQuantity, Icon = <LuSettings2 className="text-gray-800 icon transition-all" size={14} />, onChange, extendedPopover }: { extendedPopover: boolean, onChange: React.ChangeEventHandler<HTMLInputElement>, Icon?: React.ReactNode, originalQuantity: number }) {

  const [open, setOpen] = useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button onClick={() => setOpen(!open)}>
          {Icon}
        </button>
      </PopoverTrigger>
      <PopoverContent className="rounded-xl items-start w-60 whitespace-nowrap p-2 bg-white flex gap-4 flex-col">

        {
          extendedPopover && (
            <Select onChange={() => { }} options={[
              { value: 'adjust-available', label: 'Adjust available' },
              { value: 'move-to-unavaiable', label: 'Move to unavaiable' },
            ]} />
          )
        }

        <div className="w-full flex flex-col gap-1">
          <Input id="adjust-by-quantity" label="Adjust by" className="w-40" type="number" onChange={onChange} />
          <Text>(Original quantity: {originalQuantity})</Text>
        </div>

        <Select onChange={() => { }} label="Reason" options={[
          { value: 'correction', label: 'Correction (default)' },
          { value: 'count', label: 'Count' },
          { value: 'received', label: 'Received' },
          { value: 'return restock', label: 'Returne restock' },
          { value: 'damaged', label: 'Damaged' },
          { value: 'theft or loss', label: 'Theft or loss' },
          { value: 'promotion or donation', label: 'Promotion or donation' },
        ]} />

      </PopoverContent>
    </Popover >)
}
