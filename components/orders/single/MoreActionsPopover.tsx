"use client";

import OutlinedButton from "@/components/buttons/OutlinedButton";
import PopoverButton from "@/components/buttons/PopoverButton";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { FaRegPlusSquare } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
import { IoArchive } from "react-icons/io5";
import { FaPrint } from "react-icons/fa6";
import { FaEye } from "react-icons/fa";

import { MobileHorizontalDotsMajor } from "@shopify/polaris-icons";
import { ChevronDown } from "lucide-react";
const CustomerOptionsPopover = () => {
  const classes = "!text-sm !text-gray-600 font-medium flex items-center gap-2";
  return (
    <Popover>
      <PopoverTrigger>
        <MobileHorizontalDotsMajor className="w-7 bg-neutral-200 p-1.5 sm:hidden hover:bg-neutral-200 rounded-lg" />
        <OutlinedButton className="hidden sm:flex items-center justify-center">
          More actions <ChevronDown className="text-gray-500 h-4" />
        </OutlinedButton>
      </PopoverTrigger>

      <PopoverContent className="w-[100%] p-1.5 rounded-xl">
        <div className="flex flex-col p-0">
          <PopoverButton className={classes}>
            <FaRegPlusSquare />
            Duplicate
          </PopoverButton>
          <PopoverButton className={classes}>
            <RxCross1 />
            Cancel order
          </PopoverButton>
          <PopoverButton className={classes}>
            <IoArchive />
            Archive
          </PopoverButton>
          <PopoverButton className={classes}>
            <FaPrint />
            Print order page
          </PopoverButton>
          <PopoverButton className={classes}>
            <FaPrint />
            Print packing slips
          </PopoverButton>
          <PopoverButton className={classes}>
            <FaEye />
            View order status page
          </PopoverButton>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default CustomerOptionsPopover;
