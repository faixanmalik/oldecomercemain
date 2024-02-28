
import React from "react"
import { AiOutlineSearch } from "react-icons/ai";
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import TextButton from "@/components/buttons/TextButton"
import Input from "@/components/Input"
import Select from "@/components/Select";
import countries from "@/data/countries";
import { Supplier } from "@/types/supplier";

export default function EditSupplierDialog({ text, supplier, onSave }: { text: string, supplier: Supplier, onSave: (supplier: Supplier) => void }) {

  return (
    <Dialog>
      <DialogTrigger asChild>
        <TextButton onClick={() => { }}>{text}</TextButton>
      </DialogTrigger>
      <DialogContent className="h-min">
        <DialogHeader>
          <DialogTitle>Edit Supplier</DialogTitle>
        </DialogHeader>

        <div className=" flex flex-col px-4 gap-6 mb-4">
          <Input id="supplier-company" label="Company" onChange={() => { }} placeholder="" />
          <Select label="Country/Region" onChange={() => { }} options={countries} />

          <Input id="supplier-address" icon={<AiOutlineSearch />} label="Address" onChange={() => { }} placeholder="" />
          <Input id="supplier-apartment" label="Apartment, Suite etc" onChange={() => { }} placeholder="" />

          <div className="flex w-full gap-4">
            <Input id="supplier-city" label="City" onChange={() => { }} placeholder="" />
            <Input id="supplier-postal-code" label="Postal code" onChange={() => { }} placeholder="" />
          </div>

          <Input id="supplier-contact-name" label="Contact name" onChange={() => { }} placeholder="" />

          <div className="flex w-full gap-4">
            <Input id="supplier-email" label="Email address" onChange={() => { }} placeholder="" />
            <Input id="supplier-phone-number" label="Phone number" onChange={() => { }} placeholder="" />
          </div>
        </div>


        <DialogFooter>
          <Button onClick={() => onSave(supplier)} size={"sm"} type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

