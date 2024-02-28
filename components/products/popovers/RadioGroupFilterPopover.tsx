
import TextButton from "@/components/buttons/TextButton"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { IoIosArrowDown } from "react-icons/io"
import Text from "@/components/Text"
import { RadioItem } from "@/types"

export default function RadioGroupFilterPopover({ items, text, selectedItem, onChange }: { items: RadioItem[], selectedItem: string | null, text: string, onChange: (id: string | null) => void | Promise<void> }) {

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="px-2 gap-1 flex items-center rounded-lg h-min py-1 text-gray-800 text-xs border-dashed border-gray-200 hover:border-solid hover:bg-transparent" onClick={() => { }}>
          <Text className="text-gray-800">{text}</Text>
          <IoIosArrowDown size={14} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-max whitespace-nowrap p-3 rounded-xl">
        <div className="flex flex-col gap-2 w-full items-start">

          <RadioGroup defaultValue={selectedItem ?? undefined} onValueChange={onChange} className="flex flex-col gap-2">
            {
              items.map(c => (
                <div key={c.value} className="flex items-center space-x-2">
                  <RadioGroupItem value={c.value} id={c.value} />
                  <Label htmlFor="option-one" className="text-xs text-gray-800">{c.label}</Label>
                </div>
              ))
            }
          </RadioGroup>

          <TextButton className="mt-2" disabled={selectedItem === null} onClick={() => onChange(null)}>
            Clear
          </TextButton>

        </div>
      </PopoverContent>
    </Popover >
  )
}

