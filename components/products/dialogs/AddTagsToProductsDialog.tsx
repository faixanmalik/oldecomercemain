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
import Text from "@/components/Text";
import Checkbox from "@/components/Checkbox";
import axios from "axios";

export default function AddTagsToProductsDialog({ selectedProducts }: { selectedProducts: Product[] }) {

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [tags, setTags] = useState<string[]>([])
  const [selectedTags, setSelectedTags] = useState<string[]>([])

  useEffect(() => {
    fetchTags()
  }, [])

  async function fetchTags() {

    try {
      const { data } = await axios.get('/api/products/tags')
      setTags(data)
    } catch (error) {
      toast.error("Failed to load tags")
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
          Add tags
        </button>
      </DialogTrigger>
      <DialogContent className="h-min">
        <DialogHeader>
          <DialogTitle>Add tags to {selectedProducts.length} product(s)</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col p-4">
          <Input id="search-tags" placeholder="Search to find or create tags" onChange={e => handleSearch(e.target.value)} icon={<FaSearch size={14} className="text-gray-800" />} />

          <Text className="text-gray-800 font-bold mt-4 mb-2">Available</Text>

          {
            loading ? (
              <Spinner />
            ) : (
              <div className="flex flex-col gap-2">
                {
                  tags.map(t => (
                    <Checkbox key={t} id={t} label={t} checked={selectedTags.includes(t)} onChange={e => {
                      if (e.target.checked) {
                        setSelectedTags([...selectedTags, t])
                      } else {
                        setSelectedTags(selectedTags.filter(tag => tag !== t))
                      }
                    }} />
                  ))
                }
              </div>
            )
          }
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
