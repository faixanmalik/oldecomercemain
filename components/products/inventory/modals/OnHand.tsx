import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";

import Text from "@/components/Text";

import ArrowRight from "@/public/ArrowRight.svg";
import Image from "next/image";

import InventoryOptionsPopover from "../popovers/InventoryOptionsPopover";

import { useState } from "react";
import Select from "@/components/Select";
import Input from "@/components/Input";
import OutlinedButton from "@/components/buttons/OutlinedButton";
import FilledButton from "@/components/buttons/FilledButton";

const OnHand = () => {
  const [available, setAvailable] = useState({
    adjust_by: 0,
    new: 0,
    reason: "Count",
  });

  return (
    <Dialog>
      <DialogTrigger>
        <div className="flex bg-white py-4 border-b flex-col hover:bg-gray-100 rounded-lg">
          <div className="px-2 flex w-full justify-between items-center">
            <Text className="text-gray-800 capitalize">On hand</Text>
            <div className="flex gap-2 items-center">
              <Text className="text-gray-800">1</Text>
              <Image
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                }}
                src={ArrowRight}
                alt="Arrow right"
              />
            </div>
          </div>
        </div>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-left">On hand (0)</DialogTitle>
          <DialogClose />
        </DialogHeader>

        <div className="p-4 text-sm flex flex-col gap-4">
          <div className="flex gap-2">
            <Input id="adjust_by" type="number" label="Adjust by" />
            <Input id="new" type="number" label="New" />
          </div>

          <Select
            onChange={(e) => {
              setAvailable({ ...available, reason: e.target.value });
            }}
            value={available.reason}
            options={[
              { label: "Count", value: "Count" },
              { label: "Received", value: "Received" },
            ]}
          />
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <OutlinedButton>Cancel</OutlinedButton>
          </DialogClose>

          <DialogClose asChild>
            <FilledButton>Save</FilledButton>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default OnHand;
