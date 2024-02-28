"use client";

import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";

import FilledButton from "@/components/buttons/FilledButton";
import OutlinedButton from "@/components/buttons/OutlinedButton";
import { FaPencil } from "react-icons/fa6";

const EditNotes = ({
  customerNote,
  handleFieldChange,
}: {
  customerNote: string;
  handleFieldChange: any;
}) => {
  const [note, setNote] = useState<string>(customerNote || "");

  return (
    <Dialog>
      <DialogTrigger className="text-xs text-left align-top p-2 rounded-lg hover:bg-neutral-200 text-neutral-600">
        <FaPencil className="inline-block mr-1" />
      </DialogTrigger>

      <DialogContent className="w-[100%]">
        <DialogHeader>
          <DialogTitle>Edit Tax</DialogTitle>
        </DialogHeader>

        <div className="p-4">
          <textarea
            id="note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Add a note"
            className="pl-3 pt-2 text-sm sm:text-xs w-full border border-gray-200 rounded-lg py-1 outline outline-1 outline-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
            rows={5}
          />
        </div>

        <DialogFooter>
          <div className="flex gap-2">
            <DialogClose>
              <OutlinedButton>Cancel</OutlinedButton>
            </DialogClose>

            <DialogClose>
              <FilledButton
                onClick={() => {
                  handleFieldChange("note", note);
                }}
              >
                Save
              </FilledButton>
            </DialogClose>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditNotes;
