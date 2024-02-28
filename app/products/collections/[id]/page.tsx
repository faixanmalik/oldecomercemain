import React from "react";
import { Collection } from "@/types/collection";
import { apiUrl } from "@/lib/utils";
import EditCollectionForm from "@/components/products/collections/EditCollectionForm";

export const dynamic = "force-dynamic"

export default async function NewCollectionPage({
  params,
}: {
  params: { id: string };
}) {
  const res = await fetch(apiUrl(`/api/products/collections/${params.id}`), { cache: "no-cache" });
  if (res.status !== 200) throw new Error("Failed to fetch");
  const collection: Collection = await res.json();

  return (
    <div className=" w-full bg-gray-100 items-center flex flex-col">
      <EditCollectionForm initialCollection={collection} />
    </div>
  );
}
