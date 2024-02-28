import { apiUrl } from "@/lib/utils"
import { Product } from "@/types/product"
import React from "react"
import EditVariantForm from "@/components/products/variants/EditVariantForm"
import { Location } from "@/types/location"
import { Taskbar } from "@/components/products/variants/Taskbar"
import { VariantsList } from "@/components/products/variants/VariantsList"

// export const dynamic = "force-dynamic"

export default async function EditVariantPage({ params }: { params: { id: string, variant: string } }) {

    const requests = [
        fetch(apiUrl(`/api/products/${params.id}`), { cache: "no-cache" }),
        fetch(apiUrl("/api/settings/locations"), { cache: "no-cache" }),
    ]
    const [productRes, locationsRes] = await Promise.all(requests)
    if (!productRes.ok) throw new Error("Failed to fetch product")
    if (!locationsRes.ok) throw new Error("Failed to fetch locations")

    const [product, locations]: [Product, Location[]] = await Promise.all([productRes.json(), locationsRes.json()])

    const vi = Number(params.variant)
    const variant = product.variants[vi]

    console.log("product:", product, "variant:", variant)

    return (
        <div className="flex justify-center w-full py-6 bg-gray-100 min-h-screen ">
            <div className="md:max-w-5xl w-full flex gap-4 flex-col">

                <Taskbar title={variant.name} product={product} vi={vi} />

                <div className="flex flex-col md:flex-row gap-4 w-full">
                    <VariantsList product={product} />
                    <EditVariantForm initialProduct={product} vi={vi} locations={locations} />
                </div>

            </div>
        </div>
    )
}
