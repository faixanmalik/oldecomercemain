import TextButton from "@/components/buttons/TextButton"
import Text from "@/components/Text"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { IoIosArrowDown, IoIosSearch } from "react-icons/io"
import Input from "@/components/Input"
import { PromiseOr } from "@/types"
import PopoverButton from "@/components/buttons/PopoverButton"

type NameAndId = { name: string, _id: string };

export default function SearchItemFilterPopover<T extends NameAndId>({ items, listHeading, selectedItem, onChange }: { items: T[], listHeading: string, selectedItem: T | null, onChange: (id: string | null) => PromiseOr<void> }) {

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="px-2 gap-1 flex items-center rounded-lg h-min py-1 text-gray-800 text-xs border-dashed border-gray-200 hover:border-solid hover:bg-transparent" onClick={() => { }}>
          <Text className="text-gray-800">Tagged with</Text>
          <IoIosArrowDown size={14} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-max whitespace-nowrap p-3 rounded-xl">
        <div className="flex flex-col gap-2 w-full items-start">

          <Input id="search-collection" placeholder="Search for collections" className="w-full" icon={<IoIosSearch size={16} className="text-gray-800" />} />

          <div className="flex flex-col">
            <Text className="font-bold mb-2 text-gray-800">{listHeading}</Text>
            {
              items.map(item => (
                <PopoverButton key={item._id} onClick={() => onChange(item._id)}>
                  {item.name}
                </PopoverButton>
              ))
            }
          </div>

          <TextButton className="mt-2" disabled={selectedItem === null} onClick={() => onChange(null)}>
            Clear
          </TextButton>

        </div>
      </PopoverContent>
    </Popover >
  )
}

