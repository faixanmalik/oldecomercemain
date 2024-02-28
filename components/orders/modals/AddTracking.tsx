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

import { useState } from "react";
import OutlinedButton from "@/components/buttons/OutlinedButton";

import { Tracking } from "@/types/tracking";

import { DeleteMinor } from "@shopify/polaris-icons";
import Input from "@/components/Input";
import { FaPlus } from "react-icons/fa6";
import Checkbox from "@/components/Checkbox";
import { DialogClose } from "@radix-ui/react-dialog";

const AddTracking = () => {
  const [tracking, setTracking] = useState<Tracking[]>([]);

  const handleTrackingNumberChange = (idx: number, value: string) => {
    const newTracking = [...tracking];
    newTracking[idx].trackingNumber = value;
    setTracking(newTracking);
  };

  const handleAddTracking = () => {
    setTracking([...tracking, { trackingNumber: "" }]);
  };

  return (
    <Dialog>
      <DialogTrigger>
        <FilledButton>Add Tracking</FilledButton>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Tracking</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4 p-4">
          {tracking.map((item, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <Input label="Tracking Number" id="tracking" />
              <Input
                disabled={idx !== 0}
                label="Shipping carrier"
                id="shipping"
              />

              {tracking.length > 1 && (
                <button
                  onClick={() => {
                    const newTracking = [...tracking];
                    newTracking.splice(idx, 1);
                    setTracking(newTracking);
                  }}
                  className="w-5 h-5 mt-3"
                >
                  <DeleteMinor />
                </button>
              )}
            </div>
          ))}

          <p
            onClick={handleAddTracking}
            className="flex items-center text-blue-500 hover:underline gap-2 text-sm"
          >
            <FaPlus /> Add another tracking number
          </p>

          <Checkbox
            id="notification"
            label="Send a notification to the customer"
          />
        </div>

        <DialogFooter>
          <DialogClose>
            <OutlinedButton>Cancel</OutlinedButton>
          </DialogClose>
          <DialogClose>
            <FilledButton>Save</FilledButton>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddTracking;
