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
import axios from "axios";
import toast from "react-hot-toast";
import { ZodError } from "zod";
import Spinner from "@/components/Spinner";
import { Button } from "@/components/ui/button";

export default function ChangeProductStatusDialog({ text, successMessage, status, selectedProducts }: { selectedProducts: Product[], successMessage: string, status: string, text: string }) {

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSave() {
    setLoading(true)
    try {

      const res = await axios.post(`/api/products/statuses?status=${status}`, { products: selectedProducts.map(p => p._id) })
      if (res.status === 200) {
        toast.success(successMessage)
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
        <Button variant="ghost" className="p-2 bg-gray-200 rounded-lg text-black hover:bg-gray-300 h-min text-xs" onClick={() => { }}>
          Set as {status}
        </Button>
      </DialogTrigger>
      <DialogContent className="h-min">
        <DialogHeader>
          <DialogTitle>Set {selectedProducts.length} products as {status}?</DialogTitle>
        </DialogHeader>

        <Text className="text-gray-800 p-4">{text}</Text>

        <DialogFooter className="flex gap-2">
          <OutlinedButton onClick={() => setOpen(false)}>Cancel</OutlinedButton>
          {
            loading ? <Spinner /> : <FilledButton onClick={handleSave}>Set as {status}</FilledButton>
          }
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
