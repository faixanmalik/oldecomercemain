import OutlinedButton from "@/components/buttons/OutlinedButton";
import PopoverButton from "@/components/buttons/PopoverButton";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { MobileHorizontalDotsMajor } from "@shopify/polaris-icons";
import { ChevronDown } from "lucide-react";
import RequestCustomerData from "../modals/RequestCustomerData";
import ErasePersonalData from "../modals/ErasePersonalData";

const CustomerOptionsPopover = () => {
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
          <RequestCustomerData />
          <ErasePersonalData />
          <PopoverButton className="text-red-500">
            Delete customer
          </PopoverButton>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default CustomerOptionsPopover;
