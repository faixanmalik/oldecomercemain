'use client'

import React, { useEffect } from "react";
import { Product, ApiVariant, ApiVariantSchema } from "@/types/product";
import Card from "@/components/Card";
import SectionTitle from "@/components/SectionTitle";
import Input from "@/components/Input";
import EditVariantImagesDialog from "./EditVariantImagesDialog";
import Image from "next/image";
import OutlinedButton from "@/components/buttons/OutlinedButton";
import TextButton from "@/components/buttons/TextButton";
import FilledButton from "@/components/buttons/FilledButton";
import { ZodError } from "zod";
import toast from "react-hot-toast";
import axios from "axios";
import { Location } from "@/types/location";
import Spinner from "@/components/Spinner";
import { useRouter } from "next/navigation";
import Inventory from "./form/Inventory";
import Shipping from "./form/Shipping";
import Pricing from "./form/Pricing";

export default function CreateVariantForm({ product, locations }: { product: Product, locations: Location[] }) {

  const defaultVariant: ApiVariant = {
    _id: product.variants.length.toString(),
    name: "",
    values: product.variantOptions.reduce((acc, vo) => ({ ...acc, [vo.name]: "" }), {}),
    price: product.price,
    continueSellingWhenOutOfStock: product.continueSellingWhenOutOfStock,
    trackQuantity: product.trackQuantity,
    inventoryLevels: product.inventoryLevels
  }

  const router = useRouter()
  const [variant, setVariant] = React.useState(defaultVariant)
  const [loading, setLoading] = React.useState(false)
  const [newImages, setNewImages] = React.useState<string[]>([])

  useEffect(() => {
    setVariant(v => ({ ...v, name: Object.values(v.values).join(" / ") }))
  }, [variant.values])

  function capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  async function handleSave() {
    setLoading(true)

    try {

      ApiVariantSchema.parse(variant)
      const requests = [
        axios.post(`/api/products/${product._id}/variants`, variant),
        axios.post(`/api/products/${product._id}/variants/images`, { images: newImages })
      ]

      const responses = await Promise.all(requests)
      for (const response of responses) {
        if (response.status !== 200) {
          toast.error("Failed to create variant")
          console.log(response)
          return
        }
      }

      toast.success("Variant created")
      router.push(`/products/${product._id}/variants/${product.variants.length}`)

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


  return (
    <div className="flex flex-col gap-6 w-full">

      <Card className="p-4 flex flex-col gap-4">
        <SectionTitle title="Options" />
        {
          product.variantOptions.map(vo => (
            <Input key={vo.name} id={product.title + vo} label={capitalize(vo.name)} value={variant.values[vo.name]} onChange={e => setVariant({ ...variant, values: { ...variant.values, [vo.name]: e.target.value } })} />
          ))
        }

        {
          variant.image ? (
            <div className="flex flex-col gap-2">
              <Image alt={product.title} src={variant.image} width={16} height={16} />
              <EditVariantImagesDialog altText={product.title} initialImages={product.variantImages} onSave={(selectedImage, _newImages) => {
                setVariant({ ...variant, image: selectedImage })
                setNewImages([...newImages, ..._newImages])
              }} />
            </div>
          ) : (
            <EditVariantImagesDialog altText={product.title} initialImages={product.variantImages} onSave={(selectedImage, _newImages) => {
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

      <Inventory loading={false} variant={variant} setVariant={setVariant} locations={locations} />

      <Shipping loading={false} variant={variant} setVariant={setVariant} />

      <div className="flex gap-2 self-end px-4 md:px-0">
        {
          loading ? (
            <Spinner />
          ) : (
            <FilledButton onClick={handleSave}>Save</FilledButton>
          )
        }
      </div>

    </div>
  )
}



