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

import Checkbox from "@/components/Checkbox";

import { Customer } from "@/types/customer";
import FilledButton from "@/components/buttons/FilledButton";
import OutlinedButton from "@/components/buttons/OutlinedButton";

const ManageTax = ({
  customer,
  handleFieldChange,
}: {
  customer: Customer;
  handleFieldChange: any;
}) => {
  const handleTaxExempt = (val: boolean) => {
    handleFieldChange("taxExempt", val);
  };

  return (
    <Dialog>
      <DialogTrigger className="text-xs text-left align-top p-2 rounded-lg hover:bg-neutral-200 text-neutral-600">
        Manage tax exemptions
      </DialogTrigger>

      <DialogContent className="w-[100%]">
        <DialogHeader>
          <DialogTitle>Edit Tax</DialogTitle>
        </DialogHeader>

        <div className="p-4">
          <Checkbox
            id="taxExempt"
            label="Collect Tax"
            checked={customer?.taxExempt}
            onChange={(e) => {
              handleTaxExempt(e.target.checked);
            }}
          />
        </div>

        <DialogFooter>
          <div className="flex gap-2">
            <DialogClose>
              <OutlinedButton>Cancel</OutlinedButton>
            </DialogClose>

            <DialogClose>
              <FilledButton>Save</FilledButton>
            </DialogClose>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ManageTax;
