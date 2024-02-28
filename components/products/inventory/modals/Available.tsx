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

import { useEffect, useState } from "react";
import Select from "@/components/Select";
import Input from "@/components/Input";
import OutlinedButton from "@/components/buttons/OutlinedButton";
import FilledButton from "@/components/buttons/FilledButton";
import axios from "axios";

const Available = ({ variant }: { variant: any }) => {
  const [available, setAvailable] = useState({
    adjust: "Adjust available",
    adjust_by: 0,
    new: 0,
    correction: 0,
    reason: "Count",
  });

  const onSave = () => {
    try {
      const data = axios.post(
        `/api/products/inventory/available/${variant.productId}`,
        {
          quantity: available.new,
          variantId: variant._id,
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger>
        <div className="flex bg-white py-4 border-b flex-col hover:bg-gray-100 rounded-lg">
          <div className="px-2 flex w-full justify-between items-center">
            <Text className="text-gray-800 capitalize">Available</Text>
            <div className="flex gap-2 items-center">
              <Text className="text-gray-800">
                {variant?.inventoryLevels[0]?.available ?? 0}
              </Text>
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
          <DialogTitle className="text-left">Available</DialogTitle>
          <DialogClose />
        </DialogHeader>

        <div className="p-4 text-sm flex flex-col gap-4">
          <Select
            onChange={(e) => {
              setAvailable({ ...available, adjust: e.target.value });
            }}
            value={available.adjust}
            options={[
              { label: "Adjust available", value: "Adjust available" },
              { label: "Move to unavailable", value: "Move to unavailable" },
            ]}
          />

          <div className="flex gap-2">
            <Input id="adjust_by" type="number" label="Adjust by" />
            <Input
              onChange={(e) => {
                setAvailable({ ...available, new: Number(e.target.value) });
              }}
              id="new"
              type="number"
              label="New"
            />
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

          {/* <DialogClose asChild> */}
          <FilledButton onClick={onSave}>Save</FilledButton>
          {/* </DialogClose> */}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Available;
