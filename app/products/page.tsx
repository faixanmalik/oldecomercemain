"use client"
import FilledButton from "@/components/buttons/FilledButton";
import Datatable from "@/components/products/Datatable";
import ExportImportButtons from "@/components/products/ExportImportButtons";
import { apiUrl } from "@/lib/utils";
import Link from "next/link";
import React, { useEffect, useState } from "react";

type SalesChannel = {
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
};

type Market = {
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
};

export const dynamic = "force-dynamic";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [collections, setCollections] = useState([]);
  const [productTypes, setProductTypes] = useState([]);
  const [tags, setTags] = useState([]);
  const [giftCards, setGiftCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const requests = [
          // fetch(
          //   apiUrl(
          //     "/api/products?fields=title,status,variants,createdAt,updatedAt,vendor,category,media"
          //   ),
          //   { cache: "no-cache" }
          // ),
          // fetch(apiUrl("/api/vendors"), { cache: "no-cache" }),
          fetch(apiUrl("/api/products/collections"), { cache: "no-cache" }),
          // fetch(apiUrl("/api/products/types"), { cache: "no-cache" }),
          // fetch(apiUrl("/api/products/tags"), { cache: "no-cache" }),
          // fetch(apiUrl("/api/products/gift_cards"), { cache: "no-cache" }),
        ];

        const [
          productsRes,
          vendorsRes,
          collectionsRes,
          typesRes,
          tagsRes,
          giftCardsRes,
        ] = await Promise.all(requests);

        if (!productsRes.ok) throw new Error("Failed to load products");
        if (!vendorsRes.ok) throw new Error("Failed to load vendors");
        if (!collectionsRes.ok) throw new Error("Failed to load collections");
        if (!typesRes.ok) throw new Error("Failed to load product types");
        if (!tagsRes.ok) throw new Error("Failed to load tags");
        if (!giftCardsRes.ok) throw new Error("Failed to load gift cards");

        const productsData = await productsRes.json();
        const vendorsData = await vendorsRes.json();
        const collectionsData = await collectionsRes.json();
        const productTypesData = await typesRes.json();
        const tagsData = await tagsRes.json();
        const giftCardsData = await giftCardsRes.json();

        setProducts(productsData);
        setVendors(vendorsData);
        setCollections(collectionsData);
        setProductTypes(productTypesData);
        setTags(tagsData);
        setGiftCards(giftCardsData);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    }

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
      <div className=" mb-8 w-full flex justify-between px-4 md:px-0">
        <h1 className="text-xl font-bold text-[#1a1a1a]">Products</h1>

        <div className=" flex gap-2">
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
}
