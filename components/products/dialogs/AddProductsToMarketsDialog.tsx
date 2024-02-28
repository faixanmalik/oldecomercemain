// TODO: implament Market types and routes.
// idk about pages

import React, { useEffect, useState } from "react";
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
import { Product } from "@/types/product";
import toast from "react-hot-toast";
import { ZodError } from "zod";
import Spinner from "@/components/Spinner";
import Input from "@/components/Input";
import { FaSearch } from "react-icons/fa";
import Checkbox from "@/components/Checkbox";
import Text from "@/components/Text";
import TextButton from "@/components/buttons/TextButton";

type Market = {
  _id: string
  title: string
}

export default function AddProductsToMarketsDialog({ selectedProducts }: { selectedProducts: Product[] }) {

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [markets, setMarkets] = useState<Market[]>([])
  const [selectedMarkets, setSelectedMarkets] = useState<Market[]>([])

  useEffect(() => {
    fetchMarkets()
  }, [])

  async function fetchMarkets() {

    try {
      //TODO:
    } catch (error) {
      toast.error("Failed to load markets")
      console.log(error)
    }

  }


  async function handleSave() {
    setLoading(true)
    try {

      // TODO:

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

  async function handleSearch(q: string) {
    if (!q) return

    // TODO: 
  }


  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button onClick={() => setOpen(true)} className="w-full p-2 text-start bg-white hover:bg-gray-100 rounded-md transition-all text-gray-800 text-xs">
          Add to collection(s)
        </button>
      </DialogTrigger>
      <DialogContent className="h-min">
        <DialogHeader>
          <DialogTitle>Add {selectedProducts.length} product(s) to collecitons</DialogTitle>
        </DialogHeader>

        <div className="p-4 flex flex-col gap-4">

          <div className=" flex justify-between w-full">
            <TextButton onClick={() => {
              if (selectedMarkets.length > 0) {
                setSelectedMarkets([])
              } else {
                setSelectedMarkets(markets)
              }
            }}>
              {
                selectedMarkets.length > 0 ? "Deselect all" : "Select all"
              }
            </TextButton>
            <Text>{selectedMarkets.length} of {markets.length} selected</Text>
          </div>

          <Input id="search-tags" placeholder="Search for collections" onChange={e => handleSearch(e.target.value)} icon={<FaSearch size={14} className="text-gray-500" />} />

          <div className="flex flex-col gap-2">
            {
              markets.map(c => (
                <Checkbox key={c._id} id={c._id} label={c.title} checked={selectedMarkets.includes(c)} onChange={e => {
                  if (e.target.checked) {
                    setSelectedMarkets([...selectedMarkets, c])
                  } else {
                    setSelectedMarkets(selectedMarkets.filter(tag => tag !== c))
                  }
                }} />
              ))
            }
          </div>
        </div>

        <DialogFooter className="flex gap-2">
          <OutlinedButton onClick={() => setOpen(false)}>Cancel</OutlinedButton>
          {
            loading ? <Spinner /> : <FilledButton onClick={handleSave}>Include products</FilledButton>
          }
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
