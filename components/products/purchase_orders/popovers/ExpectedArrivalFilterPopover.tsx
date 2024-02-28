import TextButton from "@/components/buttons/TextButton"
import Text from "@/components/Text"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { IoIosArrowDown } from "react-icons/io"
import DatePicker from "@/components/DatePicker"
import React from "react"

type ArrivalType = 'On or before' | 'On or after';

export default function ExpectedArrivalFilterPopover({ selectedArrivalType, setArrivalType, date, setDate }: { selectedArrivalType: ArrivalType | null, setArrivalType: React.Dispatch<React.SetStateAction<ArrivalType | null>>, date: Date | undefined, setDate: React.Dispatch<React.SetStateAction<Date | undefined>> }) {

  const types: ArrivalType[] = ['On or before', 'On or after'];

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="px-2 gap-1 flex items-center rounded-lg h-min py-1 text-gray-800 text-xs border-dashed border-gray-200 hover:border-solid hover:bg-transparent" onClick={() => { }}>
          <Text className="text-gray-800">Sales channel</Text>
          <IoIosArrowDown size={14} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-max whitespace-nowrap p-3 rounded-xl">
        <div className="flex flex-col gap-2 w-full items-start">

          <RadioGroup defaultValue={selectedArrivalType ?? undefined} onValueChange={v => setArrivalType(v as ArrivalType)} className="mt-4 flex flex-col gap-2">
            {
              types.map(t => (
                <div key={t} className="flex items-center space-x-2">
                  <RadioGroupItem value={t} id={t} />
                  <Label htmlFor="option-one" className="text-xs text-gray-800">{t}</Label>
                </div>
              ))
            }
          </RadioGroup>

          {selectedArrivalType && <DatePicker date={date} setDate={setDate} />}

          <TextButton className="mt-2" disabled={selectedArrivalType === null} onClick={() => setArrivalType(null)}>
            Clear
          </TextButton>

        </div>
      </PopoverContent>
    </Popover >
  )
}

