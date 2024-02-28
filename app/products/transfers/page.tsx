import React from "react"
import Card from "@/components/Card";
import Image from "next/image";
import Title from "@/components/Title";
import Text from "@/components/Text";
import Link from "next/link";
import Heading from "@/components/Heading";
import LinkMini from "@/components/LinkMini";
import { apiUrl } from "@/lib/utils";
import { Transfer } from "@/types/transfer";
import Datatable from "@/components/products/transfers/Datatable";
import { Supplier } from "@/types/supplier";
import { Location } from "@/types/location";

export const dynamic = "force-dynamic"

export default async function TransfersPage() {

  const requests = [
    fetch(apiUrl("/api/settings/locations"), { cache: "no-cache" }),
    fetch(apiUrl("/api/products/transfers"), { cache: "no-cache" }),
    fetch(apiUrl("/api/suppliers"), { cache: "no-cache" }),
  ]

  const [locationsRes, transfersRes, suppliersRes] = await Promise.all(requests)
  if (!locationsRes.ok) throw new Error("Failed to fetch locations")
  if (!transfersRes.ok) throw new Error("Failed to fetch transfers")
  if (!suppliersRes.ok) throw new Error("Failed to fetch suppliers")

  const [locations, transfers, suppliers]: [Location[], Transfer[], Supplier[]] = await Promise.all([locationsRes.json(), transfersRes.json(), suppliersRes.json()])
  //TODO:
  const tags = transfers.flatMap(po => po.tags);

  return (
    <div className="bg-gray-100 min-h-screen h-full md:px-8 py-8">
      <div className=" w-full flex px-4 md:px-0 justify-between">
        <Heading>Transfers</Heading>
      </div>
      <div className="h-8" />

      {
        locations && locations.length > 0 && transfers && transfers.length > 0 ? (
          <Datatable initialTransfers={transfers} locations={locations} suppliers={suppliers} tags={tags} />
        ) : (
          <Card className="flex flex-col items-center justify-center py-16">
            <Image
              src="/orders-home-img.svg"
              width="250"
              height="250"
              alt="No Orders Image"
            />
            <Title>Move inventory between locations</Title>
            <Text className="text-center pb-4 w-96">
              Move and track inventory between your business locations.
            </Text>
            {
              locations && locations.length > 0 ? (
                <LinkMini href="/products/transfers/new" >
                  Add Transfer
                </LinkMini>
              ) : (
                <Text className="">
                  To create a transfer you’ll need more than one location.&nbsp;
                  <Link href="/setting/locations/new" className="text-blue-700 hover:underline">Add Location</Link>
                </Text>
              )
            }
          </Card>
        )
      }
    </div>
  )
}
