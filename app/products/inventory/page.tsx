import Datatable from "@/components/products/inventory/Datatable";
import { apiUrl } from "@/lib/utils";
import { Product, VariantWithContext } from "@/types/product";
import React from "react";
import { Location } from "@/types/location";
import { Vendor } from "@/types/vendor";
import { SalesChannel } from "@/types/salesChannel";
import { productsToVariantsWithContext } from "@/lib/products/utils";

export const dynamic = "force-dynamic";

export default async function InventoryPage() {
  const requests = [
    fetch(apiUrl("/api/products"), { cache: "no-cache" }),
    fetch(apiUrl("/api/settings/locations"), { cache: "no-cache" }),
    fetch(apiUrl("/api/vendors"), { cache: "no-cache" }),
    fetch(apiUrl("/api/products/types"), { cache: "no-cache" }),
    fetch(apiUrl("/api/products/tags"), { cache: "no-cache" }),
    // TODO:
    // fetch(apiUrl("/api/sales_channels"), { cache: "no-cache" }),
  ];

  const [productsRes, locationsRes, vendorsRes, typesRes, tagsRes] =
    await Promise.all(requests);
  if (!productsRes.ok) throw new Error("Failed to fetch products");
  if (!locationsRes.ok) throw new Error("Failed to fetch locations");
  if (!vendorsRes.ok) throw new Error("Failed to fetch vendors");
  if (!typesRes.ok) throw new Error("Failed to fetch types");
  if (!tagsRes.ok) throw new Error("Failed to fetch tags");

  const [products, locations, vendors, types, tags]: [
    Product[],
    Location[],
    Vendor[],
    string[],
    string[]
  ] = await Promise.all([
    productsRes.json(),
    locationsRes.json(),
    vendorsRes.json(),
    typesRes.json(),
    tagsRes.json(),
  ]);

  const variants: VariantWithContext[] =
    productsToVariantsWithContext(products);

  //TODO:
  const salesChannels: SalesChannel[] = [
    {
      _id: "1",
      name: "Online Store",
      createdAt: new Date().toString(),
      updatedAt: new Date().toString(),
    },
    {
      _id: "2",
      name: "POS",
      createdAt: new Date().toString(),
      updatedAt: new Date().toString(),
    },
  ];

  return (
    <div className="bg-gray-100 min-h-screen md:px-8 py-8">
      <Datatable
        initialVariants={variants}
        allLocations={locations}
        vendors={vendors}
        productTags={tags}
        productTypes={types}
        salesChannels={salesChannels}
      />
    </div>
  );
}
