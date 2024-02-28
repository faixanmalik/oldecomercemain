/* eslint-disable react/no-unescaped-entities */
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
import { Shipping } from "@/types/order";
import { CiWarning } from "react-icons/ci";

const AddShipping = ({
  shipping,
  setShipping,
  children,
  edit,
}: {
  shipping: Shipping;
  setShipping: any;
  children?: any;
  edit?: boolean;
}) => {
  const [localShipping, setLocalShipping] = useState<Shipping>(shipping);
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    if (localShipping.name && localShipping.price) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [localShipping]);

  const handleRemove = () => {
    setShipping({});
    setLocalShipping({});
    setDisabled(true);
  };

  const handleApply = () => {
    setShipping(localShipping);
    setDisabled(true);
  };

  return (
    <Dialog>
      <DialogTrigger className="text-left">
        {edit ? (
          <p className="text-blue-500 hover:underline hover:text-blue-700">
            Edit shipping or delivery
          </p>
        ) : (
          <p className="text-blue-500 hover:underline hover:text-blue-700">
            Add shipping or delivery
          </p>
        )}
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Shipping and delivery options</DialogTitle>
        </DialogHeader>

        <div className="p-4 flex flex-col gap-4 text-gray-700">
          <div className="flex gap-2 bg-orange-100 text-orange-950 rounded-md p-2 px-4 text-[0.8em] font-[400]">
            <CiWarning className="inline-block w-5 h-5" />
            <p>
              If you're not seeing all your rates, add a customer with a
              complete shipping address.
            </p>
          </div>
          <div className="flex items-center gap-2 pl-2">
            <span className="w-2 h-2 rounded-full outline-3 outline outline-black"></span>
            <p className="text-sm">Custom</p>
          </div>
          <div className="flex gap-4 pl-5">
            <Input
              id="shipping name"
              label="Name"
              value={localShipping.name}
              onChange={(e) => {
                setLocalShipping({ ...localShipping, name: e.target.value });
              }}
            />
            <Input
              id="shipping price"
              label="Shipping price"
              value={localShipping.price}
              onChange={(e) => {
                setLocalShipping({
                  ...localShipping,
                  price: Number(e.target.value),
                });
              }}
            />
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

export default AddShipping;
