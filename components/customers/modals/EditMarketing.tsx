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

import { Customer } from "@/types/customer";

import Checkbox from "@/components/Checkbox";
import FilledButton from "@/components/buttons/FilledButton";
import OutlinedButton from "@/components/buttons/OutlinedButton";

const EditMarketing = ({
  customer,
  handleFieldChange,
}: {
  customer: Customer;
  handleFieldChange: any;
}) => {
  const [marketing, setMarketing] = useState(customer.marketing);
  const [smsMarketing, setSmsMarketing] = useState(customer.smsMarketing);

  const handleEditMarketing = () => {
    console.log("marketing", marketing);
    setMarketing(!marketing);
    handleFieldChange("marketing", !marketing);
  };

  const handleEditSmsMarketing = () => {
    setSmsMarketing(!smsMarketing);
    handleFieldChange("smsMarketing", !smsMarketing);
  };

  return (
    <Dialog>
      <DialogTrigger className="text-xs text-left align-top p-2 rounded-lg hover:bg-neutral-200 text-neutral-600">
        Edit marketing settings
      </DialogTrigger>

      <DialogContent className="w-[100%]">
        <DialogHeader>
          <DialogTitle>Edit Marketing</DialogTitle>
        </DialogHeader>

        <div className="p-4">
          <Checkbox
            checked={marketing}
            onChange={(e) => {
              handleEditMarketing();
            }}
            id="marketingEmail"
            label="Customer agreed to receive marketing emails."
          />

          <Checkbox
            checked={smsMarketing}
            onChange={(e) => {
              handleEditSmsMarketing();
            }}
            id="smsMarketing"
            label="Customer agreed to receive SMS marketing text messages."
          />

          <p className="mt-2 text-sm">
            You should ask your customers for permission before you subscribe
            them to your marketing emails or SMS.
          </p>
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

export default EditMarketing;
