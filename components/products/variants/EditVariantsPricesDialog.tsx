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
import { ApiVariant } from "@/types/product";
import Text from "@/components/Text";
import Input from "@/components/Input";

export default function EditVariantsPricesDialog({ initialVariants, onSave }: { initialVariants: ApiVariant[], onSave: (variants: ApiVariant[]) => void }) {

  const [open, setOpen] = React.useState(false);
  const [variants, setVariants] = React.useState<ApiVariant[]>(initialVariants)
  const [priceForAll, setPriceForAll] = React.useState<number | undefined>(undefined)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button onClick={() => { }} className="p-2 bg-white hover:bg-gray-100 rounded-xl w-full flex justify-start text-xs text-gray-800">Edit prices</button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit prices</DialogTitle>
        </DialogHeader>

        <div className="flex md:max-h-[70vh] overflow-y-scroll flex-col">

          <div className="flex gap-1 px-4 my-4 items-end w-full">
            <Input id="edit-all-prices" label="Apply a price to all variants" icon={<Text>$</Text>} placeholder="0.00" value={priceForAll} onChange={e => setPriceForAll(Number(e.target.value))} />
            <div className="h-8 flex items-stretch">
              <OutlinedButton disabled={priceForAll === undefined} onClick={() => {
                const newVariants: ApiVariant[] = [...variants]
                newVariants.forEach(v => v.price = priceForAll!)
                setVariants(newVariants)
              }}>
                Apply to all
              </OutlinedButton>
            </div>
          </div>

          {
            variants.map(v => (
              <div key={v.name} className="flex w-full justify-between p-4 bg-white border-t border-gray-200 items-center">
                <Text className="text-gray-800">{v.name}</Text>
                <div className="w-40">
                  <Input id={v.name} value={v.price} icon={<Text>$</Text>} placeholder="0.00" onChange={(e) => {
                    const newVariants: ApiVariant[] = [...variants]
                    newVariants.find(v => v.name === e.target.id)!.price = Number(e.target.value)
                    setVariants(newVariants)
                  }} />
                </div>
              </div>
            ))
          }
        </div>

        <DialogFooter className="flex gap-2">
          <OutlinedButton onClick={() => setOpen(false)}>Cancel</OutlinedButton>
          <FilledButton onClick={() => {
            onSave(variants)
            setOpen(false)
          }}>Done</FilledButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
