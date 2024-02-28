"use client";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";

import Input from "@/components/Input";

import { FaPencilAlt } from "react-icons/fa";
import { useState } from "react";

const AddNotesModal = ({ defaultValue = "", onSave }: { defaultValue?: string, onSave: (note: string) => void }) => {

  const [open, setOpen] = useState(false)
  const [note, setNote] = useState(defaultValue)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <FaPencilAlt className="text-sm text-neutral-500" />
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {defaultValue ? "Edit" : "Add"} note
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-2 p-4">
          <Input
            id="note"
            value={note}
            label="Notes"
            onChange={(e) => setNote(e.target.value)}
            className="border border-neutral-300 rounded-lg text-sm"
          />
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <button onClick={() => setOpen(false)} className="text-sm border border-neutral-900 shadow-lg p-1 px-2 rounded-lg">
              Cancel
            </button>
          </DialogClose>
          <button
            onClick={() => {
              setOpen(false);
              onSave(note);
            }}
            className="text-sm border border-neutral-900 bg-neutral-800 text-white shadow-lg p-1 px-2 rounded-lg"
          >
            Done
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddNotesModal;
