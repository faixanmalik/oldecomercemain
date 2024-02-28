
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
import Select from "@/components/Select";
import countries from "@/data/countries";

export default function EditVariantsRegionsDialog({ initialVariants, onSave }: { initialVariants: ApiVariant[], onSave: (variants: ApiVariant[]) => void }) {

  const [open, setOpen] = React.useState(false);
  const [variants, setVariants] = React.useState<ApiVariant[]>(initialVariants)
  const [country, setCountry] = React.useState<string | undefined>(undefined)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button onClick={() => { }} className="p-2 bg-white hover:bg-gray-100 rounded-xl w-full flex justify-start text-xs text-gray-800">Edit Country/Region of origin</button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit country/region of origin</DialogTitle>
        </DialogHeader>

        <div className="flex max-h-[70vh] overflow-y-scroll flex-col">

          <div className="flex gap-1 px-4 my-4 items-end w-full">
            <Select onChange={e => setCountry(e.target.value)} value={country} options={countries} label="Country/Region of origin" />
            <div className="h-8 flex items-stretch">
              <OutlinedButton disabled={country === undefined} onClick={() => {
                const newVariants: ApiVariant[] = [...variants]
                newVariants.forEach(v => v.countryOfOrigin = country!)
                setVariants(newVariants)
              }}>
                <p className="whitespace-nowrap">
                  Apply to all
                </p>
              </OutlinedButton>
            </div>
          </div>

          {
            variants.map(v => (
              <div key={v.name} className="flex w-full justify-between p-4 bg-white border-t border-gray-200 items-center">
                <Text className="text-gray-800">{v.name}</Text>
                <div className="w-60">
                  <Select onChange={e => {
                    const newVariants: ApiVariant[] = [...variants]
                    newVariants.find(v => v.name === e.target.id)!.countryOfOrigin = e.target.value
                    setVariants(newVariants)
                  }} value={country} options={countries} label="Country/Region of origin" />
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
