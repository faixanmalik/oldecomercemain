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

const Unavailable = () => {
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({
    Damaged: 0,
    "Quality control": 0,
    "Safety stock": 0,
    Other: 0,
  });

  return (
    <Dialog>
      <DialogTrigger>
        <div className="flex bg-white py-4 border-b flex-col hover:bg-gray-100 rounded-lg">
          <div className="px-2 flex w-full justify-between items-center">
            <Text className="text-gray-800 capitalize">Unavailable</Text>
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
          <DialogTitle className="text-left">Unavailable (0)</DialogTitle>
          <DialogClose />
        </DialogHeader>

        <div className="p-4 text-sm">
          <Text className="text-gray-800 mb-1 font-bold">
            Unavailable inventory
          </Text>
          {Object.entries(quantities).map(([name, value]) => (
            <div
              key={name}
              className="w-full flex justify-between items-center"
            >
              <Text className="text-gray-800">{name}</Text>
              <InventoryOptionsPopover quantity={value} />
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Unavailable;
