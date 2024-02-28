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
import Text from "@/components/Text";
import { Product } from "@/types/product";
import toast from "react-hot-toast";
import { ZodError } from "zod";
import axios from "axios";
import Spinner from "@/components/Spinner";

export default function ArchiveProductsDialog({ selectedProducts }: { selectedProducts: Product[] }) {

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSave() {
    setLoading(true)
    try {

      const { status } = await axios.post("/api/products/statuses?status=archive", { products: selectedProducts.map(p => p._id) })
      if (status === 200) {
        toast.success(`${selectedProducts.length} products archived`)
        setOpen(false)
      } else {
        toast.error("Failed to save products")
      }

    }
    catch (error) {

      if (error instanceof ZodError) {
        toast.error(error.issues[0].message)
      } else {
        toast.error("Something went wrong")
      }
      console.log(error)

    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button onClick={() => setOpen(true)} className="w-full p-2 text-start bg-white hover:bg-gray-100 rounded-md transition-all text-gray-800 text-xs">
          Archive products
        </button>
      </DialogTrigger>
      <DialogContent className="h-min">
        <DialogHeader>
          <DialogTitle>Archive {selectedProducts.length} products?</DialogTitle>
        </DialogHeader>

        <Text className="text-gray-800 p-4">Archiving products will hide them from your sales channels and Shopify admin. You’ll find them using the status filter in your product list. </Text>

        <DialogFooter className="flex gap-2">
          <OutlinedButton onClick={() => setOpen(false)}>Cancel</OutlinedButton>
          {
            loading ? <Spinner /> : <FilledButton onClick={handleSave}>Archive products</FilledButton>
          }
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
