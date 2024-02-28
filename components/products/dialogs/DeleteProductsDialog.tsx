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

export default function DeleteProductsDialog({
  selectedProducts,
}: {
  selectedProducts: Product[];
}) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  console.log(selectedProducts);

  async function handleSave() {
    setLoading(true);
    try {
      const { status } = await axios.delete(`/api/products?ids=${selectedProducts.map((p) => p._id).join(",")}`);

      if (status === 200) {
        toast.success(`${selectedProducts.length} products archived`);
        setOpen(false);
      } else {
        toast.error("Failed to save products");
      }
    } catch (error) {
      if (error instanceof ZodError) {
        toast.error(error.issues[0].message);
      } else {
        toast.error("Something went wrong");
      }
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          onClick={() => setOpen(true)}
          className="w-full p-2 text-start bg-white hover:bg-gray-100 rounded-md transition-all text-gray-800 text-xs"
        >
          Delete products
        </button>
      </DialogTrigger>
      <DialogContent className="h-min">
        <DialogHeader>
          <DialogTitle>Delete {selectedProducts.length} products?</DialogTitle>
        </DialogHeader>

        <Text className="text-gray-800 p-4">This can’t be undone.</Text>

        <DialogFooter className="flex gap-2">
          <OutlinedButton onClick={() => setOpen(false)}>Cancel</OutlinedButton>
          {loading ? (
            <Spinner />
          ) : (
            <FilledButton
              bgClass="bg-red-500 hover:bg-red-700"
              onClick={handleSave}
            >
              Delete
            </FilledButton>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
