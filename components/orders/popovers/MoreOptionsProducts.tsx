"use client";

import PopoverButton from "@/components/buttons/PopoverButton";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { BsThreeDots } from "react-icons/bs";

const MoreOptionsProducts = ({
  fulfillment_status = "unfulfilled",
  setHoldFulfillment,
  handleFieldChange,
}: {
  fulfillment_status: string;
  setHoldFulfillment: any;
  handleFieldChange: any;
}) => {
  const handleHoldFulfillment = () => {
    setHoldFulfillment(true);
  };

  const cancelFulfillment = () => {
    handleFieldChange("fulfillment_status", "Unfulfilled");
  };

  return (
    <Popover>
      <PopoverTrigger>
        <BsThreeDots className="text-neutral-500" />
      </PopoverTrigger>

      <PopoverContent className="w-[100%] p-1.5 rounded-xl">
        {fulfillment_status === "Fulfilled" ? (
          <div className="flex flex-col p-0">
            <PopoverButton>Print packing slip</PopoverButton>
            <PopoverButton
              onClick={cancelFulfillment}
              className="text-red-500 hover:bg-red-100"
            >
              Cancel fulfillment
            </PopoverButton>
          </div>
        ) : (
          <div className="flex flex-col p-0">
            <PopoverButton>Change location</PopoverButton>
            <PopoverButton onClick={handleHoldFulfillment}>
              Hold fulfillment
            </PopoverButton>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};

export default MoreOptionsProducts;
