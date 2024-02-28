import React from "react";
import Link from "next/link";
import { CiLocationOn } from "react-icons/ci";
import Heading from "@/components/Heading";
import SectionTitle from "@/components/SectionTitle";
import Text from "@/components/Text";
import FilledButton from "@/components/buttons/FilledButton";
import { Location } from "@/types/location";
import Card from "@/components/Card";
import ChangeLocationDialog from "@/components/settings/locations/DefaultLocationDialog";
import { apiUrl } from "@/lib/utils";

export const dynamic = "force-dynamic"

export default async function LocationsPage() {

  const res = await fetch(apiUrl("/api/settings/locations"), {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    },
    cache: "no-cache"
  });
  if (res.status !== 200) {
    throw new Error("Failed to fetch locations");
  }

  const locations: Location[] = await res.json();

  return (
    <div className="bg-gray-100 min-h-screen w-full px-4 flex flex-col">
      <div className="max-w-5xl w-full py-8 flex flex-col gap-6 self-center">
        <div className="flex w-full items-center justify-between">
          <Heading>Locations</Heading>
          <FilledButton>
            <Link href="/settings/locations/new">Add Location</Link>
          </FilledButton>
        </div>

        <div className="flex flex-col w-full">
          <SectionTitle title="Locations" />
          <Text className="text-gray-800">
            Manage the places you stock inventory, fulfill orders, and sell
            products.
          </Text>
        </div>

        <Card className="rounded-xl overflow-hidden">
          {locations.map((l) => (
            <Link
              key={l._id}
              href={`/settings/locations/${l._id}`}
              className="w-full p-3 flex items-center justify-between border-b border-gray-300 hover:bg-gray-100 transition-all bg-white"
            >
              <div className="flex w-full gap-4 items-center">
                <div className="rounded-md border border-gray-300 grid place-items-center h-10 w-10">
                  <CiLocationOn size={24} />
                </div>

                <div className="flex h-full flex-col items-start">
                  <SectionTitle title={l.name} />
                  <Text>{l.address}</Text>
                </div>
              </div>

              {l.isDefault && (
                <Text className="text-gray-600 py-1 px-2 h-min rounded-full bg-gray-200">
                  Default
                </Text>
              )}
            </Link>
          ))}
        </Card>

        <Card className="p-4">
          <SectionTitle title="Default Loaction" />
          <Text className="text-neutral-500 mb-4">
            Manage which location is used by Shopify and apps when no other
            location is specified.
          </Text>

          <ChangeLocationDialog />
        </Card>
      </div>
    </div>
  );
}
