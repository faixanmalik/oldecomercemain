import TextButton from "@/components/buttons/TextButton"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import Text from "@/components/Text"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Market } from "@/types/market"
import { IoIosArrowDown } from "react-icons/io"

export default function SalesChannelFilterPopover({ markets, selectedMarket, onChange }: { markets: Market[], selectedMarket: Market | null, onChange: (marketId: string | null) => void | Promise<void> }) {

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="px-2 gap-1 flex items-center rounded-lg h-min py-1 text-gray-800 text-xs border-dashed border-gray-200 hover:border-solid hover:bg-transparent" onClick={() => { }}>
          <Text className="text-gray-800">Market</Text>
          <IoIosArrowDown size={14} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-max whitespace-nowrap p-3 rounded-xl">
        <div className="flex flex-col gap-2 w-full items-start">

          <RadioGroup defaultValue={selectedMarket?._id} onValueChange={onChange} className="mt-4 flex flex-col gap-2">
            {
              markets.map(sc => (
                <div key={sc._id} className="flex items-center space-x-2">
                  <RadioGroupItem value={sc._id} id={sc._id} />
                  <Label htmlFor="option-one" className="text-xs text-gray-800">{sc.name}</Label>
                </div>
              ))
            }
          </RadioGroup>

          <TextButton className="mt-2" disabled={selectedMarket === null} onClick={() => onChange(null)}>
            Clear
          </TextButton>

        </div>
      </PopoverContent>
    </Popover >
  )
}

