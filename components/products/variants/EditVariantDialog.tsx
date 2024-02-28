import React from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Input from "@/components/Input";
import OutlinedButton from "../../buttons/OutlinedButton";
import FilledButton from "../../buttons/FilledButton";
import { ApiVariant } from "@/types/product";
import Text from "../../Text";
import { AiOutlineSearch } from "react-icons/ai";

export default function EditVariantDialog({ initialVariant, onSave, button }: { initialVariant: ApiVariant, onSave: (initialVariant: ApiVariant) => void; button: React.ReactNode }) {

  const [variant, setVariant] = React.useState<ApiVariant>(initialVariant)
  const [open, setOpen] = React.useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {button}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit {variant.name}</DialogTitle>
        </DialogHeader>

        <div className=" flex flex-col px-4 gap-6 my-4">

          <div className="flex gap-4 flex-col w-full">
            <Input id="variant-price" value={variant.price} label="Price" onChange={e => setVariant({ ...variant, price: Number(e.target.value) })} type="number" />
            <div className="flex w-full gap-4">
              <Input id="variant-cost-per-item" value={variant.costPerItem} label="Cost per item" onChange={e => setVariant({ ...variant, costPerItem: Number(e.target.value) })} type="number" />
              <Input id="variant-profit" value={variant.profit} label="Profit" onChange={e => setVariant({ ...variant, profit: Number(e.target.value) })} type="number" />
              <Input id="variant-margin" value={variant.margin} label="Margin" onChange={e => setVariant({ ...variant, margin: Number(e.target.value) })} type="number" />
            </div>
          </div>

          <div className="flex flex-col w-full gap-4 border-t border-gray-200 pt-4">
            <Text className="text-gray-800 font-bold ">Inventory</Text>
            <Input id="variant-sku" value={variant.sku} label="SKU (Stock Keeping Unit)" onChange={e => setVariant({ ...variant, sku: e.target.value })} />
            <Input id="variant-barcode" value={variant.barcode} label="Barcode (ISBN, UPC, GTIN, etc.)" onChange={e => setVariant({ ...variant, barcode: e.target.value })} />
          </div>

          <div className="border-t pt-4 border-gray-200 felx flex-col">
            <Text className="text-gray-800 font-bold mb-4">Custom Information</Text>
            <Input id="variant-hscode" value={variant.hsCode} label="Harmonized System (HS) code" placeholder="Search or enter a HS code" onChange={e => setVariant({ ...variant, sku: e.target.value })} icon={<AiOutlineSearch />} />
            <Text className="text-neutral-500 mt-1">Manually enter codes that are longer than 6 numbers.</Text>
          </div>

        </div>

        <DialogFooter>
          <OutlinedButton onClick={() => setOpen(false)}>Cancel</OutlinedButton>
          <FilledButton onClick={() => {
            onSave(variant)
            setOpen(false)
          }}>Done</FilledButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
