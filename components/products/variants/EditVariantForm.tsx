'use client'

import React from "react";
import { Product, ApiVariantSchema, ApiVariant } from "@/types/product";
import Card from "@/components/Card";
import SectionTitle from "@/components/SectionTitle";
import Input from "@/components/Input";
import EditVariantImagesDialog from "./EditVariantImagesDialog";
import Image from "next/image";
import OutlinedButton from "@/components/buttons/OutlinedButton";
import TextButton from "@/components/buttons/TextButton";
import FilledButton from "@/components/buttons/FilledButton";
import { ZodError } from "zod";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Spinner from "@/components/Spinner";
import Shipping from "./form/Shipping";
import Inventory from "./form/Inventory";
import Pricing from "./form/Pricing";
import { Location } from "@/types/location";

export default function EditVariantForm({ initialProduct, vi, locations }: { locations: Location[], initialProduct: Product, vi: number }) {

  const [loading, setLoading] = React.useState(false)
  const [newImages, setNewImages] = React.useState<string[]>([])
  const [variant, setVariant] = React.useState<ApiVariant>({ ...initialProduct.variants[vi], inventoryLevels: initialProduct.variants[vi].inventoryLevels.map(il => ({ ...il, location: il.location._id })) })
  const router = useRouter()

  function capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  async function handleSave() {
    setLoading(true)

    try {

      ApiVariantSchema.parse(variant)
      const requests = [
        axios.put(`/api/products/${initialProduct._id}/variants/${vi}`, variant),
      ]
      if (newImages.length > 0) {
        requests.push(axios.post(`/api/products/${initialProduct._id}/variants/images`, { images: newImages }))
      }

      const responses = await Promise.all(requests)
      for (const response of responses) {
        if (response.status !== 200) {
          toast.error("Failed to create variant")
          console.log(response)
          return
        }
      }

      toast.success("Variant created")
    }
    catch (error) {

      if (error instanceof ZodError) {
        toast.error(error.issues[0].message)
      } else {
        toast.error("Something went wrong")
      }
      console.error(error)

    } finally {
      setLoading(false)
    }
  }

  async function handleDelete() {
    setLoading(true)
    try {
      const { status } = await axios.delete(`/api/products/${initialProduct._id}/variants/${vi}`)
      if (status === 200) {
        toast.success("Variant deleted")
        router.push(`/products/${initialProduct._id}`)
      } else {
        toast.error("Failed to delete variant")
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
    <div className="flex flex-col gap-6 w-full">

      <Card className="p-4 flex flex-col gap-4">
        <SectionTitle title="Options" />
        {
          initialProduct.variantOptions.map(vo => (
            <Input key={vo.name} id={initialProduct.title + vo} label={capitalize(vo.name)} value={variant.values[vo.name]} />
          ))
        }

        {
          variant.image ? (
            <div className="flex flex-col gap-2">
              <Image alt={initialProduct.title} src={variant.image} width={16} height={16} />
              <EditVariantImagesDialog altText={initialProduct.title} initialImages={initialProduct.variantImages} onSave={(selectedImage, _newImages) => {
                setVariant({ ...variant, image: selectedImage })
                setNewImages([...newImages, ..._newImages])
              }} />
            </div>
          ) : (
            <EditVariantImagesDialog altText={initialProduct.title} initialImages={initialProduct.variantImages} onSave={(selectedImage, _newImages) => {
              setVariant({ ...variant, image: selectedImage })
              setNewImages([...newImages, ..._newImages])
            }}
              text="Select variant image"
              button={
                <div className="w-full flex gap-4 items-center justify-center border border-gray-400 border-dashed hover:border-gray-500 hover:bg-gray-50 transition-all h-40 rounded-md cursor-pointer">
                  <OutlinedButton>Add image</OutlinedButton>
                  <TextButton>Choose Existing</TextButton>
                </div>
              }
            />
          )
        }

      </Card>

      <Pricing loading={false} variant={variant} setVariant={setVariant} />

      <Inventory loading={false} variant={variant} locations={locations} setVariant={setVariant} showDatatable={true} />

      <Shipping loading={false} variant={variant} setVariant={setVariant} />

      {
        loading ? (
          <Spinner />
        ) : (
          <div className="flex gap-2 self-end px-4 md:px-0">
            <FilledButton bgClass="bg-red-500 hover:bg-red-700" onClick={handleDelete}>Delete variant</FilledButton>
            <FilledButton onClick={handleSave}>Save</FilledButton>
          </div>
        )
      }

    </div>
  )
}
