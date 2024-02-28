"use client";

import Checkbox from "@/components/Checkbox";
import FilledButton from "@/components/buttons/FilledButton";
import OutlinedButton from "@/components/buttons/OutlinedButton";
import PopoverButton from "@/components/buttons/PopoverButton";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Tax } from "@/types/order";
import { PopoverClose } from "@radix-ui/react-popover";

import { useState } from "react";

const Tax = ({ tax, setTax }: { tax: Tax; setTax: any }) => {
  const [localTax, setLocalTax] = useState<Tax>(tax);
  const handleApply = () => {
    setTax(localTax);
  };

  return (
    <Popover>
      <PopoverTrigger className="text-left">
        <p className="text-blue-500 hover:underline whitespace-nowrap hover:text-blue-700">
          Estimated tax
        </p>
      </PopoverTrigger>

      <PopoverContent className="p-0.5 rounded-xl">
        <div className="flex flex-col gap-1 p-2">
          <p className="text-sm text-neutral-800">
            Taxes are automatically calculated.
          </p>

          <Checkbox
            className="mt-2"
            id="tax"
            checked={localTax.charges_tax}
            onChange={(e) => {
              setLocalTax({
                ...localTax,
                charges_tax: e.target.checked,
              });
            }}
            label="Charges tax"
          />
        </div>

        <div className="flex justify-between border-t p-2">
          <PopoverClose asChild>
            <OutlinedButton>Cancel</OutlinedButton>
          </PopoverClose>

          <PopoverClose asChild>
            <FilledButton onClick={handleApply}>Apply</FilledButton>
          </PopoverClose>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default Tax;
