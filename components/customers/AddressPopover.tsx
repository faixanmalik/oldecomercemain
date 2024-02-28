import PopoverButton from "@/components/buttons/PopoverButton";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  PopoverClose,
} from "@/components/ui/popover";

import { MobileVerticalDotsMajor } from "@shopify/polaris-icons";
import EditAddress from "./modals/EditAddress";

const AddressPopover = ({
  oldAddress,
  editAddress,
  idx,
  makeDefault,
}: {
  oldAddress?: any;
  editAddress: any;
  idx: number;
  makeDefault: any;
}) => {
  return (
    <Popover>
      <PopoverTrigger>
        <MobileVerticalDotsMajor className="w-7 p-1.5 hover:bg-neutral-200 rounded-lg" />
      </PopoverTrigger>

      <PopoverContent className="w-[100%] p-1.5 rounded-xl">
        <div className="flex flex-col p-0">
          <EditAddress
            oldAddress={oldAddress}
            editAddress={editAddress}
            idx={idx}
            alt={true}
          />

          <PopoverClose asChild>
            <PopoverButton
              onClick={() => {
                makeDefault(idx);
              }}
            >
              Set as default
            </PopoverButton>
          </PopoverClose>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default AddressPopover;
