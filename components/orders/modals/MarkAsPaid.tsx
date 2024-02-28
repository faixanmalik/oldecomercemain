"use client";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import FilledButton from "@/components/buttons/FilledButton";
import OutlinedButton from "@/components/buttons/OutlinedButton";

import PopoverButton from "@/components/buttons/PopoverButton";

import { DialogClose } from "@radix-ui/react-dialog";

import Select from "@/components/Select";

const MarkAsPaid = ({
  handleMarkAsPaid,
  total,
}: {
  handleMarkAsPaid: any;
  total: any;
}) => {
  return (
    <Dialog>
      <DialogTrigger>
        <PopoverButton className="w-full">Mark as paid</PopoverButton>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-sm">Mark as paid</DialogTitle>
        </DialogHeader>

        <div className="p-4 text-sm">
          <p className="mb-4">
            This will create an order. Mark this order as paid if you received
            SAR {total} outside of Shopify.
          </p>

          <Select
            label="Select a payment method"
            options={[
              { label: "Cash on delivery (COD)", value: "cod" },
              { label: "Bank transfer", value: "bank-transfer" },
            ]}
            onChange={(e) => {
              console.log(e);
            }}
          />
        </div>

        <DialogFooter>
          <DialogClose>
            <OutlinedButton>Cancel</OutlinedButton>
          </DialogClose>
          <DialogClose>
            <FilledButton onClick={handleMarkAsPaid}>Create order</FilledButton>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default MarkAsPaid;
