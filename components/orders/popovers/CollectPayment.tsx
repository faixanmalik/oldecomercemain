"use client";

import PopoverButton from "@/components/buttons/PopoverButton";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import FilledButton from "@/components/buttons/FilledButton";
import { FaC, FaChevronDown } from "react-icons/fa6";
import MarkAsPaid from "../modals/MarkAsPaid";

const CollectPaymentPopover = ({
  handleMarkAsPaid,
  total
}: {
  handleMarkAsPaid: any;
  total: any;
}) => {
  return (
    <Popover>
      <PopoverTrigger>
        <FilledButton className="flex items-center gap-2">
          Collect payment <FaChevronDown />
        </FilledButton>
      </PopoverTrigger>

      <PopoverContent className="w-[100%] p-1.5 rounded-xl">
        <div className="flex flex-col p-0">
          <PopoverButton>Enter credit Card</PopoverButton>
          <MarkAsPaid handleMarkAsPaid={handleMarkAsPaid} total={total} />
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default CollectPaymentPopover;
