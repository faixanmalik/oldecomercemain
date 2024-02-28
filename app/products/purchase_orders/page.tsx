import React from "react";
import Card from "@/components/Card";
import Heading from "@/components/Heading";
import Image from "next/image";
import Title from "@/components/Title";
import Text from "@/components/Text";
import Datatable from "@/components/products/purchase_orders/Datatable";
import { PurchaseOrder } from "@/types/purchaseOrder";
import Link from "next/link";
import FilledButton from "@/components/buttons/FilledButton";
import { apiUrl } from "@/lib/utils";
import { Location } from "@/types/location";
import { Supplier } from "@/types/supplier";

export const dynamic = "force-dynamic";

export default async function PurchaseOrdersPage() {
  const requests = [
    fetch(apiUrl("/api/products/purchase_orders"), { cache: "no-cache" }),
    fetch(apiUrl("/api/settings/locations"), { cache: "no-cache" }),
    fetch(apiUrl("/api/suppliers"), { cache: "no-cache" }),
    // TODO:
    // fetch(apiUrl("/api/products/purchase_orders/tags"), { cache: "no-cache" }),
  ]

  const [purchaseOrderRes, locationsRes, suppliersRes] = await Promise.all(requests);
  if (!purchaseOrderRes.ok) throw new Error('Failed to load purchase orders');
  if (!locationsRes.ok) throw new Error('Failed to load locations');
  if (!suppliersRes.ok) throw new Error('Failed to load suppliers');

  const [purchaseOrders, locations, suppliers]: [PurchaseOrder[], Location[], Supplier[]] = await Promise.all([purchaseOrderRes.json(), locationsRes.json(), suppliersRes.json(),])

  //TODO:
  const tags = purchaseOrders.flatMap(po => po.tags);

  return (
    <div className="bg-gray-100 md:px-8 min-h-screen py-8">
      <div className=" flex px-4 md:px-0 items-center justify-between">
        <Heading className="!pb-0">Purchase Orders</Heading>

        <FilledButton>
          <Link href="/products/purchase_orders/new">
            Create<span className="hidden sm:inline"> Purchase Order</span>
          </Link>
        </FilledButton>
      </div>
      <div className="h-8" />

      {purchaseOrders && purchaseOrders.length > 0 ? (
        <Datatable initialPurchaseOrders={purchaseOrders} tags={tags} locations={locations} suppliers={suppliers} />
      ) : (
        <Card className="flex flex-col items-center justify-center py-16">
          <Image
            src="/orders-home-img.svg"
            width="250"
            height="250"
            alt="No Orders Image"
          />
          <Title>Manage your purchase orders</Title>
          <Text className="text-center pb-4 w-96">
            Track and receive inventory ordered from suppliers.
          </Text>

          <FilledButton>
            <Link href="/products/purchase_orders/new">
              Create Purchase Order
            </Link>
          </FilledButton>
        </Card>
      )}
    </div>
  );
}
