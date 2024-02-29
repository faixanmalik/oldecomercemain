import FilledButton from "@/components/buttons/FilledButton";
import Datatable from "@/components/products/Datatable";
import ExportImportButtons from "@/components/products/ExportImportButtons";
import { apiUrl } from "@/lib/utils";
import { Market } from "@/types/market";
import { SalesChannel } from "@/types/salesChannel";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export const dynamic = "force-dynamic";

const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [vendors, setVendors] = useState<any[]>([]);
  const [collections, setCollections] = useState<any[]>([]);
  const [productTypes, setProductTypes] = useState<any[]>([]);
  const [tags, setTags] = useState<any[]>([]);
  const [giftCards, setGiftCards] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const requests = [
          fetch(apiUrl("/api/products?fields=title,status,variants,createdAt,updatedAt,vendor,category,media"), { cache: "no-cache" }),
          fetch(apiUrl("/api/vendors"), { cache: "no-cache" }),
          fetch(apiUrl("/api/products/collections"), { cache: "no-cache" }),
          fetch(apiUrl("/api/products/types"), { cache: "no-cache" }),
          fetch(apiUrl("/api/products/tags"), { cache: "no-cache" }),
          fetch(apiUrl("/api/products/gift_cards"), { cache: "no-cache" }),
        ];

        const responses = await Promise.all(requests);
        const data = await Promise.all(responses.map(response => response.json()));

        const [productsData, vendorsData, collectionsData, productTypesData, tagsData, giftCardsData] = data;

        setProducts(productsData);
        setVendors(vendorsData);
        setCollections(collectionsData);
        setProductTypes(productTypesData);
        setTags(tagsData);
        setGiftCards(giftCardsData);
        setLoading(false);
      } catch (error) {
        setError("Failed to load data");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  // TODO: fetch these from the API
  const statuses = ["active", "draft"];
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
  const markets: Market[] = [
    {
      _id: "1",
      name: "US",
      createdAt: new Date().toString(),
      updatedAt: new Date().toString(),
    },
    {
      _id: "2",
      name: "CA",
      createdAt: new Date().toString(),
      updatedAt: new Date().toString(),
    },
    {
      _id: "3",
      name: "UK",
      createdAt: new Date().toString(),
      updatedAt: new Date().toString(),
    },
  ];

  return (
    <div className="bg-gray-100 min-h-screen pt-6 md:pt-8 md:p-8">
      <div className="mb-8 w-full flex justify-between px-4 md:px-0">
        <h1 className="text-xl font-bold text-[#1a1a1a]">Products</h1>

        <div className="flex gap-2">
          <ExportImportButtons />
          <FilledButton>
            <Link href="/products/new">Add Product</Link>
          </FilledButton>
        </div>
      </div>

      <Datatable
        initialProducts={products}
        giftCards={giftCards}
        vendors={vendors}
        statuses={statuses}
        tags={tags}
        markets={markets}
        salesChannels={salesChannels}
        collections={collections}
        productTypes={productTypes}
      />
    </div>
  );
};

export default ProductsPage;
