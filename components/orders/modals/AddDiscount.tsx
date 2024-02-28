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
import { DialogClose } from "@radix-ui/react-dialog";
import Select from "@/components/Select";
import Input from "@/components/Input";

import { useEffect, useState } from "react";
import { Discount } from "@/types/order";

const AddDiscount = ({
  discount,
  setDiscount,
  children,
  edit,
}: {
  discount: Discount;
  setDiscount: any;
  children?: any;
  edit?: boolean;
}) => {
  const [localDiscount, setLocalDiscount] = useState<Discount>(discount);
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    if (localDiscount.type && localDiscount.value) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [localDiscount]);

  const handleRemove = () => {
    setLocalDiscount({
      discount: 0,
      type: "amount",
    });
    setDiscount({
      discount: 0,
      type: "amount",
    });
  };

  const handleApply = () => {
    setDiscount(localDiscount);
    setDisabled(true);
  };

  return (
    <Dialog>
      <DialogTrigger className="text-left w-min">
        {children ? (
          children
        ) : (
          <p className="text-blue-500 hover:underline whitespace-nowrap hover:text-blue-700">
            Add discount
          </p>
        )}
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>{edit ? "Edit Discount" : "Add Discount"}</DialogTitle>
        </DialogHeader>

        <div className="p-4 flex flex-col gap-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <Select
                value={localDiscount.type}
                onChange={(e) => {
                  setLocalDiscount({
                    ...localDiscount,
                    type: e.target.value,
                  });
                }}
                label="Discount Type"
                options={[
                  { label: "Amount", value: "amount" },
                  { label: "Percentage", value: "percentage" },
                ]}
              />
            </div>

            <div className="flex-1">
              <Input
                type="number"
                id="value"
                label="Value"
                placeholder="Discount Value"
                onChange={(e) => {
                  setLocalDiscount({
                    ...localDiscount,
                    value: Number(e.target.value),
                  });
                }}
                value={localDiscount.value}
              />
            </div>
          </div>

          <div>
            <Input
              id="reason"
              label="Reason for discount"
              onChange={(e) => {
                setLocalDiscount({
                  ...localDiscount,
                  reason: e.target.value,
                });
              }}
              value={localDiscount.reason}
            />
            <p className="text-xs text-gray-600 pt-1">
              Your customers can see this reason
            </p>
          </div>
        </div>

        {edit ? (
          <DialogFooter className="justify-between">
            <DialogClose>
              <FilledButton
                onClick={handleRemove}
                className="bg-red-500 border-red-600 hover:bg-red-600"
              >
                Remove discount
              </FilledButton>
            </DialogClose>

            {disabled ? (
              <FilledButton disabled={true}>Done</FilledButton>
            ) : (
              <DialogClose>
                <FilledButton disabled={false} onClick={handleApply}>
                  Done
                </FilledButton>
              </DialogClose>
            )}
          </DialogFooter>
        ) : (
          <DialogFooter>
            <DialogClose>
              <OutlinedButton>Cancel</OutlinedButton>
            </DialogClose>

            {disabled ? (
              <FilledButton disabled={disabled}>Apply</FilledButton>
            ) : (
              <DialogClose>
                <FilledButton disabled={disabled} onClick={handleApply}>
                  Apply
                </FilledButton>
              </DialogClose>
            )}
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AddDiscount;
