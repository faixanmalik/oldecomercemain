import React from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import OutlinedButton from "../../buttons/OutlinedButton";
import FilledButton from "../../buttons/FilledButton";
import { Location } from "@/types/location";
import Checkbox from "@/components/Checkbox";
import Text from "@/components/Text";
import TextButton from "@/components/buttons/TextButton";

export default function EditVariantsLocationsDialog({ onSave, allLocations }: { allLocations: Location[], onSave: (locations: Location[]) => void }) {

  const [open, setOpen] = React.useState(false);
  const [locations, setLocations] = React.useState<Location[]>(allLocations)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button onClick={() => { }} className="p-2 bg-white hover:bg-gray-100 rounded-xl w-full flex justify-start text-xs text-gray-800">Edit locations</button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit locations</DialogTitle>
        </DialogHeader>

        <div className="flex max-h-[70vh] overflow-y-scroll gap-4 px-4 my-4 flex-col">

          <Text className="text-gray-800">Select locations that stock the selected variants.</Text>

          <div className="flex w-full justify-between">
            <TextButton onClick={() => {
              if (locations.length === allLocations.length) {
                setLocations([])
              } else {
                setLocations(allLocations)
              }
            }}>
              {
                locations.length === allLocations.length ? "Deselect all" : "Select all"
              }
            </TextButton>
            <Text className="text-gray-800">
              {locations.length} of {allLocations.length} selected
            </Text>
          </div>

          <div className="flex flex-col gap-4">
            {
              allLocations.map(l => (
                <Checkbox key={l._id} id={l._id} checked={locations.find(location => location._id === l._id) !== undefined} label={l.name} onChange={e => {
                  if (e.target.value) {
                    setLocations([...allLocations, l])
                  } else {
                    setLocations(allLocations.filter(l => l._id !== e.target.id))
                  }
                }} />
              ))
            }
          </div>
        </div>

        <DialogFooter className="flex gap-2">
          <OutlinedButton onClick={() => setOpen(false)}>Cancel</OutlinedButton>
          <FilledButton onClick={() => {
            onSave(locations)
            setOpen(false)
          }}>Done</FilledButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
