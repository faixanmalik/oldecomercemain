import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Image from "next/image";

export function SortPopover() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="w-10 py-1 px-2 border rounded-md shadow-sm shadow-neutral-200">
          <Image
            src="/BothArrows.svg"
            alt="Plus button Image"
            width={20}
            height={20}
          />
        </button>
      </PopoverTrigger>
      <PopoverContent className="p-0 absolute -right-4 w-40 rounded-2xl">
        <div className="p-4">
          <p className="text-sm font-normal text-black">Sort by</p>
          <div className="flex flex-col items-start gap-2 pt-3">
            <div className="flex items-center gap-2">
              <RadioGroup defaultValue="comfortable">
                <div className="flex items-center space-x-4">
                  <RadioGroupItem value="default" id="r1" />
                  <Label htmlFor="r1">Date</Label>
                </div>
                <div className="flex items-center space-x-4">
                  <RadioGroupItem value="comfortable" id="r2" />
                  <Label htmlFor="r2">File name</Label>
                </div>
                <div className="flex items-center space-x-4">
                  <RadioGroupItem value="compact" id="r3" />
                  <Label htmlFor="r3">File size</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        </div>
        <div className="w-full border-b border-gray-300"></div>
        <div className="p-4">
          <div className="flex flex-col items-start gap-2">
            <div className="flex items-center gap-2">
              <Checkbox id="c1" />
              <Label htmlFor="c1">Descending</Label>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
