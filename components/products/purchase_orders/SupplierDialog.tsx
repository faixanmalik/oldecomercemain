import React from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import TextButton from "@/components/buttons/TextButton";
import Input from "@/components/Input";
import Select from "@/components/Select";
import countries from "@/data/countries";
import { ApiSupplier, Supplier } from "@/types/supplier";
import toast from "react-hot-toast";

export default function SupplierDialog({
  text,
  heading,
  onSave,
}: {
  text: string;
  heading: string;
  onSave: (supplier: Supplier) => void;
}) {

  const [supplier, setSupplier] = React.useState<ApiSupplier>({
    name: "",
    company: "",
    address: "",
    apartment: "",
    city: "",
    contactName: "",
    country: "",
    email: "",
    phoneNumber: "",
    postalCode: "",
  })

  const [open, setOpen] = React.useState(false);

  async function createSuppier() {
    try {
      const response = await fetch("http://localhost:3000/api/suppliers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(supplier),
      });
      const data = await response.json();

      if (response.status == 201) {
        toast.success("Supplier created successfully");
        onSave(data);
        setOpen(false)
      }

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <TextButton onClick={() => { }}>{text}</TextButton>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{heading}</DialogTitle>
        </DialogHeader>

        <div className=" flex flex-col px-4 gap-6 my-4">
          <Input
            id="supplier-company"
            label="Company"
            onChange={e => setSupplier({ ...supplier, company: e.target.value })}
            placeholder=""
          />
          <Select
            label="Country/Region"
            onChange={e => setSupplier({ ...supplier, country: e.target.value })}
            options={countries}
          />

          <Input
            id="supplier-address"
            icon={<AiOutlineSearch />}
            label="Address"
            onChange={e => setSupplier({ ...supplier, address: e.target.value })}
            placeholder=""
          />
          <Input
            id="supplier-apartment"
            label="Apartment, Suite etc"
            onChange={e => setSupplier({ ...supplier, apartment: e.target.value })}
            placeholder=""
          />

          <div className="flex w-full gap-4">
            <Input
              id="supplier-city"
              label="City"
              onChange={e => setSupplier({ ...supplier, city: e.target.value })}
              placeholder=""
            />
            <Input
              id="supplier-postal-code"
              label="Postal code"
              onChange={e => setSupplier({ ...supplier, postalCode: e.target.value })}
              placeholder=""
            />
          </div>

          <Input
            id="supplier-contact-name"
            label="Contact name"
            onChange={e => setSupplier({ ...supplier, contactName: e.target.value })}
            placeholder=""
          />

          <div className="flex w-full gap-4">
            <Input
              id="supplier-email"
              label="Email address"
              onChange={e => setSupplier({ ...supplier, email: e.target.value })}
              placeholder=""
            />
            <Input
              id="supplier-phone-number"
              label="Phone number"
              onChange={e => setSupplier({ ...supplier, phoneNumber: e.target.value })}
              placeholder=""
            />
          </div>
        </div>

        <DialogFooter>
          <Button onClick={() => createSuppier()} size={"sm"} type="submit">

            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
