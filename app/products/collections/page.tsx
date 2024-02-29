import Link from "next/link";
import Datatable from "@/components/products/collections/Datatable";
import FilledButton from "@/components/buttons/FilledButton";
import { apiUrl } from "@/lib/utils";
import { Collection } from "@/types/collection";

export const dynamic = "force-dynamic"

export default async function CollectionsPage() {
  try {
    const res = await fetch(apiUrl("/api/products/collections"), {
      cache: "no-cache",
    });
  
    if (!res.ok) {
      throw new Error("Failed to fetch");
    }
  
    const collections: Collection[] = await res.json();
    
    // Process collections data
  
  } catch (error) {
    console.error("An error occurred while fetching collections:", error);
    // Handle the error gracefully, display a message to the user, or take other appropriate action
  }
  

  return (
    <div className="bg-gray-100 min-h-screen md:px-8 py-8">
      <div className=" mb-8 w-full flex px-4 md:px-0 justify-between">
        <h1 className="text-xl font-bold text-[#1a1a1a]">Collections</h1>

        <FilledButton>
          <Link href="/products/collections/new">Create Collection</Link>
        </FilledButton>
      </div>

      <Datatable initialCollections={collections} salesChannels={[]} />
    </div>
  );
}
