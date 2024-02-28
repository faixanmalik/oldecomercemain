import React from "react";
import EditProductForm from "@/components/products/EditProductForm";
import { apiUrl } from "@/lib/utils";

export const dynamic = "force-dynamic"

export default async function ProductPage({ params }: { params: { id: string } }) {

  const requests = [
    fetch(apiUrl(`/api/products/${params.id}`), { cache: "no-cache" }),
    fetch(apiUrl("/api/settings/locations"), { cache: "no-cache" }),
  ]
  const [productRes, locationsRes] = await Promise.all(requests)
  if (!productRes.ok) throw new Error("Failed to load product")
  if (!locationsRes.ok) throw new Error("Failed to load locations")

  const [product, locations] = await Promise.all([productRes.json(), locationsRes.json()])

  return (
    <div className=" w-full bg-gray-100 items-center flex flex-col">
      <EditProductForm locations={locations} initialProduct={product} />
    </div>
  )
}
