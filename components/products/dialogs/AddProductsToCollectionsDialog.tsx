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
import axios from "axios";
import { Collection } from "@/types/collection";

export default function AddProductsToCollectionsDialog({ selectedProducts }: { selectedProducts: Product[] }) {

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [collections, setCollections] = useState<Collection[]>([])
  const [selectedCollections, setSelectedCollections] = useState<Collection[]>([])

  useEffect(() => {
    fetchCollections()
  }, [])

  async function fetchCollections() {

    try {
      const { data } = await axios.get('/api/products/collections?fields=_id,title')
      setCollections(data)
    } catch (error) {
      toast.error("Failed to load collections")
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
          <Input id="search-tags" placeholder="Search for collections" onChange={e => handleSearch(e.target.value)} icon={<FaSearch size={14} className="text-gray-500" />} />

          <div className="flex flex-col gap-2">
            {
              collections.map(c => (
                <Checkbox key={c._id} id={c._id} label={c.title} checked={selectedCollections.includes(c)} onChange={e => {
                  if (e.target.checked) {
                    setSelectedCollections([...selectedCollections, c])
                  } else {
                    setSelectedCollections(selectedCollections.filter(tag => tag !== c))
                  }
                }} />
              ))
            }
          </div>
        </div>

        <DialogFooter className="flex gap-2">
          <OutlinedButton onClick={() => setOpen(false)}>Cancel</OutlinedButton>
          {
            loading ? <Spinner /> : <FilledButton onClick={handleSave}>Save</FilledButton>
          }
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
