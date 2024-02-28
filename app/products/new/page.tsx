import { IoIosArrowRoundBack } from "react-icons/io";
import Link from "next/link";
import Heading from "@/components/Heading";
import CreateProductForm from "@/components/products/CreateProductForm";
import { apiUrl } from "@/lib/utils";
import { Location } from "@/types/location";
import { SalesChannel } from "@/types/salesChannel";

export const dynamic = "force-dynamic";

import { useHeaderStore } from "@/store/HeaderStore";

export default async function NewProductPage() {
  const requests = [
    fetch(apiUrl("/api/settings/locations"), { cache: "no-cache" }),
    fetch(apiUrl("/api/sales_channels"), { cache: "no-cache" }),
  ];
  const [locationsRes, salesChannelsRes] = await Promise.all(requests);
  if (!locationsRes) throw new Error("unable to fetch locations");
  if (!salesChannelsRes) throw new Error("unable to fetch sales channels");

  const [locations, salesChannels]: [Location[], SalesChannel[]] =
    await Promise.all([locationsRes.json(), salesChannelsRes.json()]);

  return (
    <div className=" w-full bg-gray-100 items-center mt-6 md:mt-0 flex flex-col">
      <div className="flex-col max-w-5xl w-full flex gap-6 md:p-8 ">
        <div className="flex flex-col md:flex-row gap-3 items-start  px-4 md:px-0">
          <Link
            href="/products"
            className="p-0.5 rounded-md hover:bg-black/10 transition-all"
          >
            <IoIosArrowRoundBack size={24} className="text-black" />
          </Link>
          <Heading>Add Product</Heading>
        </div>

        <CreateProductForm
          locations={locations}
          salesChannels={salesChannels}
        />
      </div>
    </div>
  );
}
