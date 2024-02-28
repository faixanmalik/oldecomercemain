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
import { Location } from "@/types/location";
import Text from "@/components/Text";
import TextButton from "@/components/buttons/TextButton";
import Checkbox from "@/components/Checkbox";

export default function EditLocationsDialog({
  onSave,
  locations,
  initialLocations = [],
  disabledLocations = [],
}: {
  locations: Location[];
  initialLocations?: string[];
  disabledLocations?: string[];
  onSave: (selectedLocations: Location[]) => void;
}) {
  const [open, setOpen] = useState(false);
  const [selectedLocations, setSelectedLocations] = useState<Location[]>(
    locations.filter((l) => initialLocations.includes(l._id))
  );

  return (
    <Dialog
      open={open}
      onOpenChange={(o) => {
        setOpen(o);
      }}
    >
      <DialogTrigger asChild>
        <TextButton onClick={() => setOpen(true)}>Edit locations</TextButton>
      </DialogTrigger>
      <DialogContent className="h-min">
        <DialogHeader>
          <DialogTitle>Edit locations</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4 p-4">
          <Text className="text-gray-800">
            Select locations that stock the selected variants.
          </Text>
          <div className="flex items-center justify-between">
            {selectedLocations.length === locations.length ? (
              <TextButton onClick={() => setSelectedLocations([])}>
                Deselect all
              </TextButton>
            ) : (
              <TextButton onClick={() => setSelectedLocations([...locations])}>
                Select all
              </TextButton>
            )}
            <Text className="text-sm text-gray-800">
              {selectedLocations.length} of {locations.length} selected
            </Text>
          </div>

          <div className="flex flex-col gap-2">
            {locations.map((l) => (
              <>
                <Checkbox
                  key={l._id}
                  id={`select-lcoation-${l._id}`}
                  label={l.name}
                  disabled={disabledLocations.includes(l._id)}
                  checked={!!selectedLocations.find((_l) => _l._id === l._id)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedLocations([...selectedLocations, l]);
                    } else {
                      setSelectedLocations(
                        selectedLocations.filter((l) => l._id !== l._id)
                      );
                    }
                  }}
                />
                {disabledLocations.includes(l._id) && (
                  <Text>
                    {" "}
                    Cannot untrack. {l.name} has committed inventory{" "}
                  </Text>
                )}
              </>
            ))}
          </div>
        </div>

        <DialogFooter className="flex gap-2">
          <OutlinedButton onClick={() => setOpen(false)}>Cancel</OutlinedButton>
          <FilledButton
            onClick={() => {
              onSave(selectedLocations);
              setOpen(false);
            }}
          >
            Done
          </FilledButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
