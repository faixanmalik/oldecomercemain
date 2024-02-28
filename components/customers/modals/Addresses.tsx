"use client";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import ManageAddress from "./ManageAddress";
import { Customer } from "@/types/customer";

import EditAddress from "./EditAddress";
import AddressPopover from "../AddressPopover";

const AddressCard = ({
  address,
  editAddress,
  idx,
  makeDefault,
}: {
  address: any;
  editAddress?: any;
  idx: number;
  makeDefault?: any;
}) => {
  return (
    <div className="flex justify-between p-4 border bg-neutral-100 rounded-lg">
      <div className="flex flex-col gap-1">
        {idx === 0 && (
          <span className="text-xs w-16 mt-[-2em] mb-1 pl-2 pr-0 bg-gray-200 rounded-lg p-1 text-gray-600 font-medium">
            Default
          </span>
        )}
        <p className="text-sm text-neutral-500">{address.address}</p>
        <p className="text-sm text-neutral-500">
          {address.city}, {address.postalCode}
        </p>
        <p className="text-sm text-neutral-500">{address.country}</p>
      </div>
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          {idx === 0 ? (
            <EditAddress
              oldAddress={address}
              idx={idx}
              editAddress={editAddress}
            />
          ) : (
            <AddressPopover
              oldAddress={address}
              idx={idx}
              editAddress={editAddress}
              makeDefault={makeDefault}
            />
          )}
        </div>
      </div>
    </div>
  );
};

const Addresses = ({
  customer,
  addAddress,
  editAddress,
  makeDefault,
}: {
  customer: Customer;
  addAddress?: any;
  editAddress?: any;
  makeDefault: any;
}) => {
  const addresses = customer?.addresses;

  return (
    <Dialog>
      <DialogTrigger className="text-xs text-left align-top p-2 rounded-lg hover:bg-neutral-200 text-neutral-600">
        Manage addresses
      </DialogTrigger>

      <DialogContent className="w-[100%]">
        <DialogHeader>
          <DialogTitle>Manage addresses</DialogTitle>
        </DialogHeader>

        <div className="p-4 flex flex-col gap-4">
          {addresses.map((address, idx) => (
            <AddressCard
              key={idx}
              address={address}
              editAddress={editAddress}
              idx={idx}
              makeDefault={makeDefault}
            />
          ))}
        </div>

        <DialogFooter>
          <ManageAddress addAddress={addAddress} />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Addresses;
