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
import { FaPencilAlt } from "react-icons/fa";
import PopoverButton from "@/components/buttons/PopoverButton";

const EditAddress = ({
  oldAddress,
  editAddress,
  idx,
  alt,
}: {
  oldAddress?: any;
  editAddress: any;
  idx: number;
  alt?: boolean;
}) => {
  const [address, setAddress] = useState(oldAddress);

  const handleEditAddress = () => {
    editAddress(address, idx);
  };

  const handleAddressFieldChange = (field: string, value: string) => {
    setAddress({ ...address, [field]: value });
  };

  return (
    <Dialog>
      <DialogTrigger>
        {alt ? (
          <PopoverButton className="w-full">Edit</PopoverButton>
        ) : (
          <FaPencilAlt className="w-6 h-6 text-neutral-500 p-1.5 rounded-md hover:bg-gray-200" />
        )}
      </DialogTrigger>

      <DialogContent className="w-[100%]">
        <DialogHeader>
          <DialogTitle>Edit address</DialogTitle>
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
              <OutlinedButton>Cancel</OutlinedButton>
            </DialogClose>

            <DialogClose>
              <FilledButton onClick={handleEditAddress}>Save</FilledButton>
            </DialogClose>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditAddress;
