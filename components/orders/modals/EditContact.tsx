"use client";

import React, { useEffect, useState } from "react";

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

import { Customer } from "@/types/customer";
import FilledButton from "@/components/buttons/FilledButton";
import OutlinedButton from "@/components/buttons/OutlinedButton";
import { FaPencilAlt } from "react-icons/fa";
import Checkbox from "@/components/Checkbox";

import axios from "axios";

const EditContact = ({
  customer,
  setCustomer,
}: {
  customer: Customer;
  setCustomer: any;
}) => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [updateCustomerProfile, setUpdateCustomerProfile] = useState(true);

  useEffect(() => {
    if (!customer) return;
    setEmail(customer.email);
    setPhone(customer.phone);
  }, [customer]);

  const handleFieldChange = async (field: string, value: string) => {
    const newCustomer = await axios.patch(`/api/customers/${customer._id}`, {
      field: field,
      value: value,
    });

    setCustomer({ ...customer, [field]: value });
  };

  const handleSave = async () => {
    if (updateCustomerProfile) {
      await handleFieldChange("email", email);
      await handleFieldChange("phone", phone);
    } else {
      setCustomer({ ...customer, email, phone });
    }
  };

  return (
    <Dialog>
      <DialogTrigger>
        <FaPencilAlt className="w-6 h-6 text-neutral-500 p-1.5 rounded-md hover:bg-gray-200" />
      </DialogTrigger>

      <DialogContent className="w-[100%]">
        <DialogHeader>
          <DialogTitle>Edit customer</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col  gap-3 p-4">
          <Input
            label="Email"
            id="email"
            placeholder=""
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />

          <div className="flex">
            <Input
              label="Phone"
              id="phone"
              placeholder=""
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
              }}
            />
          </div>

          <Checkbox
            label="Update customer profile"
            checked={updateCustomerProfile}
            onChange={(e) => {
              setUpdateCustomerProfile(e.target.checked);
            }}
            id="updateCustomerProfile"
          />
        </div>

        <DialogFooter>
          <div className="flex gap-2">
            <DialogClose>
              <OutlinedButton>Cancel</OutlinedButton>
            </DialogClose>

            <DialogClose>
              <FilledButton onClick={handleSave}>Save</FilledButton>
            </DialogClose>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditContact;
