"use client"
import { useEffect, useState } from 'react';
import Link from "next/link";
import Datatable from "@/components/products/collections/Datatable";
import FilledButton from "@/components/buttons/FilledButton";
import { apiUrl } from "@/lib/utils";
import { Collection } from "@/types/collection";

export const dynamic = "force-dynamic"

export default function CollectionsPage() {

  const [collections, setCollections] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchData = () => {
      fetch("/api/products/collections")
        .then(res => {
          if (!res.ok) {
            throw new Error("Failed to fetch");
          }
          return res.json();
        })
        .then(data => {
          setCollections(data);
          setIsLoading(false)
        })
        .catch(error => {
          console.error("Error fetching collections:", error);
          // Handle error state if necessary
        });
    };
  
    fetchData();
  }, []);

  

  return (
    <div className="bg-gray-100 min-h-screen md:px-8 py-8">
      <div className=" mb-8 w-full flex px-4 md:px-0 justify-between">
        <h1 className="text-xl font-bold text-[#1a1a1a]">Collections</h1>

        <FilledButton>
          <Link href="/products/collections/new">Create Collection</Link>
        </FilledButton>
      </div>

      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <Datatable initialCollections={collections} salesChannels={[]} />
      )}
      
    </div>
  );
}
