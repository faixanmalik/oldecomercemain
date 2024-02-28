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
import { Button } from "@/components/ui/button";
import { Market } from "@/types/market";
import Checkbox from "@/components/Checkbox";
import Text from "@/components/Text";
import PopoverButton from "@/components/buttons/PopoverButton";

export default function ManageMarketsDialog({ markets: markets, initiallySelectedMarkets, onSave }: { markets: Market[], initiallySelectedMarkets: string[], onSave: (marketIds: string[]) => void }) {

  const [open, setOpen] = useState(false)
  const [selectedMarkets, setSelectedMarkets] = useState(initiallySelectedMarkets)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="w-full" asChild>
      <PopoverButton className="!text-gray-700 !text-[0.8em] font-medium">
        Manage markets
       </PopoverButton>
      </DialogTrigger>
      <DialogContent className="h-min">
        <DialogHeader>
          <DialogTitle>Manage sales channels</DialogTitle>
        </DialogHeader>

        <div className="p-4 flex flex-col gap-2 h-40">
          {
            markets.map(m => (
              <div key={m._id} className="flex items-center gap-2">
                <Checkbox id={m._id} disabled={false} checked={selectedMarkets.includes(m._id)} label={
                  <div className="flex flex-col">
                    <Text className="text-gray-800">{m.name}</Text>
                    <Text>{m.domain}</Text>
                  </div>
                } onChange={e => {
                  if (e.target.checked) {
                    setSelectedMarkets([...selectedMarkets, m._id])
                  } else {
                    setSelectedMarkets(selectedMarkets.filter(id => id !== m._id))
                  }
                }} />
              </div>
            ))
          }
        </div>

        <div className="p-4 bg-gray-100">
          <Text className="text-gray-800">Changes you make in markets will apply only to your <span className="font-bold">Online Store.</span></Text>
        </div>

        <DialogFooter className="flex gap-2">
          <OutlinedButton onClick={() => setOpen(false)}>Cancel</OutlinedButton>
          <FilledButton onClick={() => {
            onSave(selectedMarkets)
            setOpen(false)
          }}>Done</FilledButton>
        </DialogFooter>
      </DialogContent>
    </Dialog >
  );
}
