"use client";

import React, { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";

import Input from "@/components/Input";
import Select from "@/components/Select";
import countries from "@/data/countries";

import FilledButton from "@/components/buttons/FilledButton";
import OutlinedButton from "@/components/buttons/OutlinedButton";

const ManageAddress = ({ addAddress }: { addAddress?: any }) => {
  const [address, setAddress] = useState<any>();

  const handleAddAddress = () => {
    addAddress(address);
  };

  const handleAddressFieldChange = (field: string, value: string) => {
    setAddress({ ...address, [field]: value });
  };

  return (
    <Dialog>
      <DialogTrigger className="text-xs text-left align-top border py-1 shadow-sm shadow-black/50 p-2 rounded-lg hover:bg-neutral-200 text-neutral-600">
        Add new address
      </DialogTrigger>

      <DialogContent className="w-[100%]">
        <DialogHeader>
          <DialogTitle>Add new address</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-3 p-4">
          <Select
            label="Country/Region of origin"
            options={countries}
            onChange={(e) => {
              handleAddressFieldChange("country", e.target.value);
            }}
            value={address?.country}
          />
          <div className="flex gap-4 flex-col sm:flex-row">
            <Input
              onChange={(e) => {
                handleAddressFieldChange("address", e.target.value);
              }}
              label="Address"
              id="address"
              placeholder=""
              value={address?.address}
            />
            <Input
              onChange={(e) => {
                handleAddressFieldChange("apartment", e.target.value);
              }}
              label="Apartment, suite, etc."
              id="apartment"
              placeholder=""
              value={address?.apartment}
            />
          </div>

          <div className="flex gap-4 flex-col sm:flex-row">
            <Input
              label="City"
              id="city"
              placeholder=""
              value={address?.city}
              onChange={(e) => {
                handleAddressFieldChange("city", e.target.value);
              }}
            />
            <Input
              label="Postal Code"
              id="postalCode"
              placeholder=""
              onChange={(e) => {
                handleAddressFieldChange("postalCode", e.target.value);
              }}
              value={address?.postalCode}
            />
          </div>
        </div>

        <DialogFooter>
          <div className="flex gap-2">
            <DialogClose>
              <OutlinedButton>
                Cancel
              </OutlinedButton>
            </DialogClose>

            <DialogClose>
              <FilledButton onClick={handleAddAddress}>Save</FilledButton>
            </DialogClose>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ManageAddress;
