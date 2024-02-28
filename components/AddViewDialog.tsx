import React from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Text from "@/components/Text";
import OutlinedButton from "./buttons/OutlinedButton";
import FilledButton from "./buttons/FilledButton";
import { Button } from "./ui/button";
import { IoIosAdd } from "react-icons/io";
import Input from "./Input";

export default function AddViewDialog({ onSave }: { onSave: (name: string) => void }) {

  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState<string>("");

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" className={`hover:bg-gray-200/75 px-3 py-1.5 h-min`} onClick={() => { }}>
          <Text className="text-gray-800 capitalize">{<IoIosAdd size={18} className="text-gray-800" />}</Text>
        </Button>
      </DialogTrigger>
      <DialogContent className="h-min">
        <DialogHeader>
          <DialogTitle>Create new view</DialogTitle>
        </DialogHeader>

        <div className="my-4 px-4 w-full">
          <Input id="add-view" label="Name" value={name} onChange={e => setName(e.target.value)} />
        </div>


        <DialogFooter className="flex gap-2">
          <OutlinedButton onClick={() => setOpen(false)}>Cancel</OutlinedButton>
          <FilledButton onClick={() => {
            onSave(name)
            setOpen(false)
          }}>Create view</FilledButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
