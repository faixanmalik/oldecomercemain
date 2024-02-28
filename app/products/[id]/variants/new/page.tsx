import { apiUrl } from "@/lib/utils";
import CreateVariantForm from "@/components/products/variants/CreateVariantForm";
import { Location } from "@/types/location";
import { Product } from "@/types/product";
import React from "react";
import { Taskbar } from "@/components/products/variants/Taskbar";
import { VariantsList } from "@/components/products/variants/VariantsList";

export const dynamic = "force-dynamic";

export default async function CreateVariantPage({
  params,
}: {
  params: { id: string };
}) {
  const requests = [
    fetch(apiUrl(`/api/products/${params.id}`), { cache: "no-cache" }),
    fetch(apiUrl(`/api/settings/locations`), { cache: "no-cache" }),
  ];
  const [productRes, locationsRes] = await Promise.all(requests);
  if (!productRes.ok) throw new Error("Failed to fetch product");
  if (!locationsRes.ok) throw new Error("Failed to fetch locations");

  const product: Product = await productRes.json();
  const locations: Location[] = await locationsRes.json();

  return (
    <div className="flex justify-center w-full py-6 bg-gray-100 min-h-screen ">
      <div className="max-w-5xl w-full flex gap-4 flex-col">
        <Taskbar title="Add Variant" />

        <div className="flex flex-col md:flex-row gap-4 w-full">
          <VariantsList product={product} />
          <CreateVariantForm product={product} locations={locations} />
        </div>
      </div>
    </div>
  );
}
