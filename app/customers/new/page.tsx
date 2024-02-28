"use client";

import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { IoIosClose } from "react-icons/io";

import Link from "next/link";
import Heading from "@/components/Heading";
import Card from "@/components/Card";
import Input from "@/components/Input";
import Checkbox from "@/components/Checkbox";
import Select from "@/components/Select";
import Title from "@/components/Title";

import { Customer } from "@/types/customer";

import countries from "@/data/countries";
import FilledButton from "@/components/buttons/FilledButton";

import { toast } from "react-hot-toast";

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
    <div className="min-h-screen md:p-5 md:w-[100%] lg:px-[20%]">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2 p-5">
          <Link href="/customers">
            <FaArrowLeft className="text-sm text-neutral-800" />
          </Link>
          <Heading className="!pb-1">New Customer</Heading>
        </div>

        <Title className="pl-5">Customer Overview</Title>
        <Card className="flex flex-col p-5 gap-4">
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
            className="px-3 w-full border border-gray-200 rounded-lg py-1 text-sm outline outline-1 outline-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
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

          <div className="flex">
            <Input
              label="Phone"
              id="phone"
              placeholder=""
              value={customer?.phone}
              onChange={(e) => {
                handleFieldChange("phone", e.target.value);
              }}
            />
          </div>

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

          <p className="text-xs text-neutral-600 pb-2 pt-4">
            You should ask your customers for permission before you subscribe
            them to your marketing emails or SMS.
          </p>
        </Card>

        <div className="py-4">
          <Title className="pl-5">Address</Title>
          <p className="text-sm pl-5 md:pl-0 text-neutral-600">
            The primary address of this customer
          </p>
        </div>
        <Card className="flex flex-col p-5 gap-2">
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

          <p className="text-xs text-neutral-600 pb-2 pt-4">
            You can add multiple addresses for a customer. For example, you can
            add a different shipping address for a customer.
          </p>
        </Card>

        <div className="py-4">
          <Title className="pl-5">Tax Exemptions</Title>
        </div>
        <Card className="p-5">
          <Checkbox
            id="taxExempt"
            label="Collect Tax"
            checked={customer?.taxExempt}
            onChange={(e) => {
              handleCheckboxChange("taxExempt", e.target.checked);
            }}
          />
        </Card>

        <div className="py-4">
          <Title className="pl-5">Notes</Title>
          <p className="text-sm text-neutral-600 pl-5 md:pl-0">
            Notes are private and won&apos;t be shared with the customer.
          </p>
        </div>
        <Card className="p-5">
          <Input
            label="Note"
            id="note"
            placeholder=""
            value={customer?.note}
            onChange={(e) => {
              handleFieldChange("note", e.target.value);
            }}
          />
        </Card>

        <div className="py-4">
          <Title className="pl-5">Tags</Title>
          <p className="text-sm pl-5 md:pl-0 text-neutral-600">
            Tags can be used to categorize customers into groups.
          </p>
        </div>
        <Card className="p-5">
          <Input
            id="tags"
            label="Tags"
            placeholder=""
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                console.log(e.currentTarget.value);
                addTag(e.currentTarget.value);
                console.log(customer);
                e.currentTarget.value = "";
              }
            }}
          />

          <div className="flex gap-2">
            {customer?.tags.map((tag) => (
              <div
                key={tag}
                className="bg-slate-200 mt-2 text-gray-900 px-2 py-1 rounded-md text-sm flex items-center gap-1"
              >
                {tag}
                <button
                  onClick={() =>
                    setCustomer({
                      ...customer,
                      tags: customer?.tags.filter((t) => t !== tag),
                    })
                  }
                >
                  <IoIosClose size={20} />
                </button>
              </div>
            ))}
          </div>
        </Card>

        <div className="self-end p-5 md:p-0">
          <FilledButton onClick={addCustomer}>Add Customer</FilledButton>
        </div>
      </div>
    </div>
  );
};

export default NewCustomer;
