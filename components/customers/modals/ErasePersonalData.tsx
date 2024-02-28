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

import { DeleteMinor, EmailNewsletterMajor } from "@shopify/polaris-icons";
import { DialogClose } from "@radix-ui/react-dialog";

const RequestCustomerData = ({}: {}) => {
  return (
    <Dialog>
      <DialogTrigger>
        <PopoverButton className="w-full">Erase personal data</PopoverButton>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Erase personal data</DialogTitle>
        </DialogHeader>

        <div className="p-4 flex items-start gap-4">
          <DeleteMinor className="w-14 text-gray-500" />
          <div>
            <SectionTitle title="Erase identifiable information" />
            <p className="text-sm text-gray-500">
              Erase any information that can be used to identify this customer.
              Information includes: Name, address, email, IP address, credit
              card number. Learn more
            </p>
          </div>
        </div>

        <div className="p-4 flex items-start gap-4">
          <EmailNewsletterMajor className="w-20 text-gray-500" />
          <div>
            <SectionTitle title="Email confirmation" />
            <p className="text-sm text-gray-500">
              The store owner will receive a confirmation email when the data is
              erased on Wednesday, June 12, 2024. The customer’s orders will
              still be visible for business reporting purposes. You can cancel
              the process until that date. Once the data is erased, it cannot be
              retrieved.
            </p>
          </div>
        </div>

        <DialogFooter>
          <DialogClose className="flex gap-2">
            <OutlinedButton>Cancel</OutlinedButton>
            <FilledButton bgClass="bg-red-500">
              Request customer data
            </FilledButton>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RequestCustomerData;
