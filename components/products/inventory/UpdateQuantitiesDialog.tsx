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
import Input from "@/components/Input";
import Text from "@/components/Text";
import { getInventoryLevel } from "@/lib/products/utils";
import { Location } from "@/types/location";
import { IoIosArrowForward } from "react-icons/io";
import { Button } from "@/components/ui/button";
import { VariantWithContext } from "@/types/product";

type SaveResult = {
  op: "add" | "set";
  value: number
}

export default function UpdateQuantitesDialog({ onSave, selectedLocation, selectedVariants }: { selectedVariants: VariantWithContext[], selectedLocation: Location, onSave: (res: SaveResult) => void }) {

  const [open, setOpen] = useState(false)
  const [result, setResult] = useState<SaveResult>({ op: "add", value: 0 })

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="p-2 bg-gray-200 text-black hover:bg-gray-300 h-min text-xs" onClick={() => { }}>
          Update quantities
        </Button>
      </DialogTrigger>
      <DialogContent className="h-min">
        <DialogHeader>
          <DialogTitle>Udate on hand quantites</DialogTitle>
        </DialogHeader>

        <div className="p-4 flex flex-col">

          <div className="w-full flex items-center gap-4 py-4">
            <div className="flex">
              <button className={`p-2 rounded-tr-lg rounded-br-lg text-gray-800 text-xs ${result.op === 'add' ? "bg-gray-200 border border-gray-400" : "bg-white border-b border-l border-black"}`} onClick={() => setResult({ ...result, op: 'add' })}>
                Add
              </button>
              <button className={`p-2 rounded-tr-lg rounded-br-lg text-gray-800 text-xs ${result.op === 'set' ? "bg-gray-200 border border-gray-400" : "bg-white border-b border-r border-black"}`} onClick={() => setResult({ ...result, op: 'set' })}>
                Set
              </button>
            </div>
            <Input id="change-quantity" type="number" className="w-min" value={result.value} onChange={e => setResult({ ...result, value: Number(e.target.value) })} />
          </div>


          <div className="w-full flex flex-col gap-8 bg-gray-100 py-4">
            <Text className="text-gray-800">{selectedVariants.length} variant will be changed:</Text>

            <div className="flex flex-col gap-2 w-full">
              {
                selectedVariants.map(v => (
                  <div key={v.title + v.name} className="flex justify-between w-full items-center">
                    <Text className="text-gray-800">{v.title} - {v.name}</Text>
                    <Text as={'div'} className="text-gray-800 gap-2 flex items-center">{getInventoryLevel(v.inventoryLevels, selectedLocation).onHand} <IoIosArrowForward size={14} className="text-gray-800" /> <span className="bg-cyan-300 p-1">{result.value}</span> </Text>
                  </div>
                ))
              }
            </div>
          </div>

        </div>

        <DialogFooter className="flex gap-2">
          <OutlinedButton onClick={() => setOpen(false)}>Cancel</OutlinedButton>
          <FilledButton onClick={() => onSave(result)}>Save</FilledButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
