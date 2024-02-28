"use client";

import PopoverButton from "@/components/buttons/PopoverButton";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { BsThreeDots } from "react-icons/bs";

const MoreOptionsOrders = ({}: {}) => {
  return (
    <Popover>
      <PopoverTrigger>
        <BsThreeDots className="text-neutral-500 bg-gray-200 w-6 h-6 rounded-md p-1 hover:bg-gray-300" />
      </PopoverTrigger>

      <PopoverContent className="w-[100%] p-0 rounded-xl">
        <div className="flex flex-col p-0">
          <div className="p-1.5 flex flex-col">
            <PopoverButton className="text-sm !text-black">Edit</PopoverButton>
            <PopoverButton className="text-sm !text-black">
              Cancel fulfillment requests
            </PopoverButton>
            <PopoverButton className="text-sm !text-black">
              Mark as Unfulfilled
            </PopoverButton>
            <PopoverButton className="text-sm !text-black">
              Change fulfillment location
            </PopoverButton>
          </div>

          <div className="h-[1px] w-full bg-gray-300"></div>

          <div className="p-1.5 flex flex-col">
            <PopoverButton className="text-sm !text-black">
              Print packing slip
            </PopoverButton>
            <PopoverButton className="text-sm !text-black">
              Archive orders
            </PopoverButton>
            <PopoverButton className="text-sm !text-black">
              Unarchive orders
            </PopoverButton>
            <PopoverButton className="text-sm !text-black">
              Cancel orders
            </PopoverButton>
          </div>

          <div className="h-[1px] w-full bg-gray-300"></div>

          <div className="p-1.5 flex flex-col">
            <PopoverButton className="text-sm !text-black">
              Add tags
            </PopoverButton>
            <PopoverButton className="text-sm !text-black">
              Remove tags
            </PopoverButton>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default MoreOptionsOrders;
