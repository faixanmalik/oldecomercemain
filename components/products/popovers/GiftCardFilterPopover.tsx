import TextButton from "@/components/buttons/TextButton"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useEffect, useState } from "react"
import Checkbox from "@/components/Checkbox"
import { GiftCard } from "@/types/giftCard"
import Text from "@/components/Text"
import { IoIosArrowDown } from "react-icons/io"

export default function GiftCardFilterPopover({ giftCards, onChange }: { giftCards: GiftCard[], onChange: (giftCardIds: string[]) => void | Promise<void> }) {

  const [selectedGiftCardIds, setSelectedGiftCardIds] = useState<string[]>([])

  useEffect(() => {
    onChange(selectedGiftCardIds)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedGiftCardIds])

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="px-2 gap-1 flex items-center rounded-lg h-min py-1 text-gray-800 text-xs border-dashed border-gray-200 hover:border-solid hover:bg-transparent" onClick={() => { }}>
          <Text className="text-gray-800">Gift card</Text>
          <IoIosArrowDown size={14} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-max whitespace-nowrap p-3 rounded-xl">
        <div className="flex flex-col gap-2 w-full items-start">

          {
            giftCards.map(gc => (
              <Checkbox key={gc._id} id={gc._id} label={gc.code} checked={false} onChange={e => {
                if (e.target.checked) {
                  setSelectedGiftCardIds([...selectedGiftCardIds, gc._id])
                } else {
                  setSelectedGiftCardIds(selectedGiftCardIds.filter(_gc => _gc !== gc._id))
                }
              }} />
            ))
          }

          <TextButton className="mt-2" disabled={selectedGiftCardIds.length === 0} onClick={() => setSelectedGiftCardIds([])}>
            Clear
          </TextButton>

        </div>
      </PopoverContent>
    </Popover >
  )
}

