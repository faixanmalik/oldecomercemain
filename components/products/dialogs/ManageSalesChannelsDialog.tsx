import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import OutlinedButton from "@/components/buttons/OutlinedButton";
import FilledButton from "@/components/buttons/FilledButton";
import { SalesChannel } from "@/types/salesChannel";
import { Button } from "@/components/ui/button";
import Checkbox from "@/components/Checkbox";
import PopoverButton from "@/components/buttons/PopoverButton";
import { DialogClose } from "@radix-ui/react-dialog";

export default function ManageSalesChannelsDialog({
  salesChannels,
  initiallySelectedChannels,
  onSave,
}: {
  salesChannels: SalesChannel[];
  initiallySelectedChannels: string[];
  onSave: (selectedChannels: string[]) => void;
}) {
  const [open, setOpen] = useState(false);
  const [selectedChannels, setSelectedChannels] = useState(
    initiallySelectedChannels || []
  );
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <PopoverButton className="!text-gray-700 !text-[0.8em] font-medium">
          Manage sales channels
        </PopoverButton>
      </DialogTrigger>
      <DialogContent className="h-min">
        <DialogHeader>
          <DialogTitle>Manage sales channels</DialogTitle>
        </DialogHeader>

        <div className="p-4 flex flex-col gap-2">
          {salesChannels.map((sc) => (
            <Checkbox
              key={sc._id}
              id={sc._id}
              label={sc.name}
              checked={selectedChannels.includes(sc._id)}
              onChange={(e) => {
                if (e.target.checked) {
                  setSelectedChannels([...selectedChannels, sc._id]);
                } else {
                  setSelectedChannels(
                    selectedChannels.filter((id) => id !== sc._id)
                  );
                }
              }}
            />
          ))}
        </div>

        <DialogFooter className="flex gap-2">
          <DialogClose>
            <OutlinedButton onClick={() => setOpen(false)}>
              Cancel
            </OutlinedButton>
          </DialogClose>

          <DialogClose>
            <FilledButton onClick={() => onSave(selectedChannels)}>
              Done
            </FilledButton>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
