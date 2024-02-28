import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Text from "./Text";
import { useState } from "react";
import { Button } from "./ui/button";
import { FaArrowDownLong, FaArrowUpLong } from "react-icons/fa6";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { RadioItem } from "@/types";
import Image from "next/image";

export default function SortPopover({
  options,
  onSelect,
}: {
  options: RadioItem[];
  onSelect: (value: string) => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          onClick={() => setOpen(!open)}
          className="w-10 py-1 px-2 border rounded-md shadow-sm shadow-neutral-200 hover:bg-neutral-50 hover:shadow-lg hover:shadow-neutral-900/20 "
        >
          <Image
            src="/BothArrows.svg"
            alt="Plus button Image"
            width={20}
            height={20}
          />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-max whitespace-nowrap p-1 rounded-xl md:-translate-x-[10px]">
        <div className="flex flex-col p-2 rounded-lg bg-white">
          <Text className="text-gray-800">Sort by</Text>
          <RadioGroup
            defaultValue="product-title"
            onValueChange={onSelect}
            className="mt-4 flex flex-col gap-2"
          >
            {options.map((op) => (
              <div key={op.value} className="flex items-center space-x-2">
                <RadioGroupItem value={op.value} id={op.value} />
                <Label htmlFor="option-one" className="text-xs text-gray-800">
                  {op.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        <div className="border-t border-gray-300 pt-2 mt-2 flex flex-col gap-0.5">
          <Button
            variant="ghost"
            className={`hover:bg-gray-200/75 gap-2 flex px-3 py-1.5 h-min bg-transparent`}
            onClick={() => { }}
          >
            <FaArrowUpLong size={14} className="text-gray-800" />
            <Text className="text-gray-800">Lowest to highest</Text>
          </Button>
          <Button
            variant="ghost"
            className={`hover:bg-gray-200/75 flex gap-2 px-3 py-1.5 h-min bg-transparent`}
            onClick={() => { }}
          >
            <FaArrowDownLong size={14} className="text-gray-800" />
            <Text className="text-gray-800">Highest to lowest</Text>
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
