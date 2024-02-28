import TextButton from "@/components/buttons/TextButton"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import Text from "@/components/Text"
import Checkbox from "@/components/Checkbox"
import { IoIosArrowDown } from "react-icons/io"

export default function StatusFilterPopover({ statuses, onChange, selectedStatuses = [] }: { statuses: string[], selectedStatuses?: string[], onChange: (statuses: string[]) => void | Promise<void> }) {

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="px-2 gap-1 flex items-center rounded-lg h-min py-1 text-gray-800 text-xs border-dashed border-gray-200 hover:border-solid hover:bg-transparent" onClick={() => { }}>
          <Text className="text-gray-800">Status</Text>
          <IoIosArrowDown size={14} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-max whitespace-nowrap p-3 rounded-xl">
        <div className="flex flex-col gap-2 w-full items-start">

          {
            statuses.map(s => (
              <Checkbox key={s} id={s} label={s} checked={false} onChange={e => {
                if (e.target.checked) {
                  onChange([...selectedStatuses, s])
                } else {
                  onChange(selectedStatuses.filter(_s => _s !== s))
                }
              }} />
            ))
          }

          <TextButton className="mt-2" disabled={selectedStatuses.length === 0} onClick={() => onChange([])}>
            Clear
          </TextButton>

        </div>
      </PopoverContent>
    </Popover >
  )
}

