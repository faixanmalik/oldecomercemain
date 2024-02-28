"use client";

import React, { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { toast } from "react-hot-toast";

import { Customer } from "@/types/customer";
import Input from "@/components/Input";
import FilledButton from "@/components/buttons/FilledButton";
import OutlinedButton from "@/components/buttons/OutlinedButton";
import Title from "@/components/Title";
import Checkbox from "@/components/Checkbox";
import Select from "@/components/Select";

import countries from "@/data/countries";

import { FaPlus } from "react-icons/fa";
import { DialogClose } from "@radix-ui/react-dialog";

const defaultCustomer: Customer = {
  firstName: "",
  lastName: "",
  language: "English",
  email: "",
  phone: "",

  marketing: false,
  smsMarketing: false,

  addresses: [
    {
      address: "",
      apartment: "",
      city: "",
      postalCode: "",
      country: "",
    },
  ],

  taxExempt: false,

  note: "",
  tags: [],
};

const NewCustomer = () => {
  const [customer, setCustomer] = useState<Customer>(defaultCustomer);

  const handleFieldChange = (field: string, value: string) => {
    setCustomer((prevCustomer: any) => {
      if (prevCustomer) {
        return { ...prevCustomer, [field]: value };
      }
      return null;
    });
  };

  const handleAddressFieldChange = (field: string, value: string) => {
    setCustomer((prevCustomer: any) => {
      if (prevCustomer) {
        return {
          ...prevCustomer,
          addresses: [{ ...prevCustomer.addresses[0], [field]: value }],
        };
      }
      return null;
    });
  };

  const addTag = (tag: string) => {
    setCustomer((prevCustomer: any) => {
      if (prevCustomer) {
        return { ...prevCustomer, tags: [...prevCustomer.tags, tag] };
      }
      return null;
    });
  };

  const handleCheckboxChange = (field: string, value: boolean) => {
    setCustomer((prevCustomer: any) => {
      if (prevCustomer) {
        return { ...prevCustomer, [field]: value };
      }
      return null;
    });
  };

  const addCustomer = async () => {
    try {
      const response = await fetch("/api/customers", {
        method: "POST",
        body: JSON.stringify(customer),
      });

      console.log(response);

      toast.success("Customer added successfully!");
      setCustomer(defaultCustomer);
    } catch (error) {
      toast.error("Error adding customer");
    }
  };

  return (
    <Dialog>
      <DialogTrigger>
        <p className="p-1.5 m-1.5 text-xs rounded-lg bg-gray-100 flex gap-2 items-center">
          <FaPlus
            className="inline-block text-lg p-1 border
           text-gray-400 border-gray-400 rounded-full"
          />
          Cretate a new customer
        </p>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Customer</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col p-5 gap-4 sm:w-[100%]">
          <div className="flex gap-4 flex-col sm:flex-row">
            <Input
              onChange={(e) => {
                handleFieldChange("firstName", e.target.value);
              }}
              label="First Name"
              id="firstName"
              placeholder=""
              value={customer?.firstName}
            />
            <Input
              onChange={(e) => {
                handleFieldChange("lastName", e.target.value);
              }}
              label="Last Name"
              id="lastName"
              placeholder=""
              value={customer?.lastName}
            />
          </div>

          <select
            value={customer?.language}
            onChange={(e) => {
              handleFieldChange("language", e.target.value);
            }}
            className="px-3 border border-gray-200 rounded-lg py-1 text-sm outline outline-1 outline-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
          >
            <option value="English">English</option>
            {/* Add other language options if needed */}
          </select>

          <Input
            label="Email"
            id="email"
            placeholder=""
            value={customer?.email}
            onChange={(e) => {
              handleFieldChange("email", e.target.value);
            }}
          />

          <Checkbox
            checked={customer.marketing}
            onChange={(e) => {
              handleCheckboxChange("marketing", e.target.checked);
            }}
            id="marketingEmail"
            label="Customer agreed to receive marketing emails."
          />

          <Checkbox
            checked={customer.smsMarketing}
            onChange={(e) => {
              handleCheckboxChange("smsMarketing", e.target.checked);
            }}
            id="smsMarketing"
            label="Customer agreed to receive SMS marketing text messages."
          />
        </div>

        <div className="flex flex-col p-5 gap-2">
          <Select
            label="Country/Region of origin"
            options={countries}
            onChange={(e) => {
              handleAddressFieldChange("country", e.target.value);
            }}
            value={customer.addresses[0].country}
          />
          <div className="flex gap-4 flex-col sm:flex-row">
            <Input
              onChange={(e) => {
                handleAddressFieldChange("address", e.target.value);
              }}
              label="Address"
              id="address"
              placeholder=""
              value={customer?.addresses[0].address}
            />
            <Input
              onChange={(e) => {
                handleAddressFieldChange("apartment", e.target.value);
              }}
              label="Apartment, suite, etc."
              id="apartment"
              placeholder=""
              value={customer?.addresses[0].apartment}
            />
          </div>

          <div className="flex gap-4 flex-col sm:flex-row">
            <Input
              label="City"
              id="city"
              placeholder=""
              value={customer?.addresses[0].city}
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
              value={customer?.addresses[0].postalCode}
            />
          </div>
        </div>

        <DialogFooter>
          <DialogClose>
            <OutlinedButton>Cancel</OutlinedButton>
          </DialogClose>

          <DialogClose>
            <FilledButton
              onClick={() => {
                addCustomer();
              }}
            >
              Add Customer
            </FilledButton>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NewCustomer;
