"use client";

import OutlinedButton from "@/components/buttons/OutlinedButton";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import PopoverButton from "@/components/buttons/PopoverButton";
import FilledButton from "@/components/buttons/FilledButton";
import SectionTitle from "@/components/SectionTitle";

import { ShareMinor, CalendarTickMajor } from "@shopify/polaris-icons";
import { DialogClose } from "@radix-ui/react-dialog";

const RequestCustomerData = ({}: {}) => {
  return (
    <Dialog>
      <DialogTrigger>
        <PopoverButton className="w-full">Request customer data</PopoverButton>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Request customer data</DialogTitle>
        </DialogHeader>

        <div className="p-4 flex items-start gap-4">
          <ShareMinor className="w-16 text-gray-500" />
          <div>
            <SectionTitle title="Request customer data" />
            <p className="text-sm text-gray-500">
              Get a copy of this customer’s data by email so you can share it
              with them. Data such as orders, payouts, products, and customer
              information can be exported in CSV or Excel formats. Learn more
            </p>
          </div>
        </div>

        <div className="p-4 flex items-start gap-4">
          <CalendarTickMajor className="w-12 text-gray-500" />
          <div>
            <SectionTitle title="Request timeline" />
            <p className="text-sm text-gray-500">
              Generally, you should respond to a request from a customer within
              30 days. Extensions are allowed if the request is exceptionally
              difficult to fulfill.
            </p>
          </div>
        </div>

        <DialogFooter>
          <DialogClose className="flex gap-2">
            <OutlinedButton>Cancel</OutlinedButton>
            <FilledButton>Request customer data</FilledButton>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RequestCustomerData;
