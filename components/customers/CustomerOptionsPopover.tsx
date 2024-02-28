import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Customer } from "@/types/customer";

import EditMarketing from "./modals/EditMarketing";
import ManageTax from "./modals/ManageTax";
import EditContact from "./modals/EditContact";

import { MobileVerticalDotsMajor } from "@shopify/polaris-icons";
import Addresses from "./modals/Addresses";

const CustomerOptionsPopover = ({
  customer,
  addAddress,
  editAddress,
  editContact,
  handleFieldChange,
  makeDefault,
}: {
  customer: Customer;
  addAddress: any;
  editAddress: any;
  editContact: any;
  handleFieldChange: any;
  makeDefault: any;
}) => {
  return (
    <Popover>
      <PopoverTrigger>
        <MobileVerticalDotsMajor className="w-7 p-1.5 hover:bg-neutral-200 rounded-lg" />
      </PopoverTrigger>

      <PopoverContent className="w-[100%] p-1.5 rounded-xl">
        <div className="flex flex-col p-0">
          <EditContact customer={customer} editContact={editContact} />
          <Addresses
            customer={customer}
            addAddress={addAddress}
            editAddress={editAddress}
            makeDefault={makeDefault}
          />
          <ManageTax
            customer={customer}
            handleFieldChange={handleFieldChange}
          />
          <EditMarketing
            handleFieldChange={handleFieldChange}
            customer={customer}
          />
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default CustomerOptionsPopover;
