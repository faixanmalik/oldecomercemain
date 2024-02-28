"use client";

import Card from "@/components/Card";
import Image from "next/image";
import Text from "@/components/Text";
import { Order } from "@/types/order";
import StatusText from "../StatusText";
import Link from "next/link";
import { PiImageThin } from "react-icons/pi";
import Input from "../Input";
import SectionTitle from "../SectionTitle";
import TextButton from "../buttons/TextButton";
import React from "react";
import Checkbox from "../Checkbox";
import {
  DeleteMajor,
  ShipmentMajor,
  UnfulfilledMajor,
} from "@shopify/polaris-icons";
import FilledButton from "../buttons/FilledButton";
import { RiDeleteBinLine } from "react-icons/ri";
import axios from "axios";
import EditShippingAddress from "./modals/EditShippingAddress";

export default function FulfillItemForm({
  order,
  setOrder,
}: {
  order: Order;
  setOrder: any;
}) {
  const [trackingNumbers, setTrackingNumbers] = React.useState<string[]>([]);
  const [shippingCarrier, setShippingCarrier] = React.useState<string>("");
  const [notifyCustomer, setNotifyCustomer] = React.useState<boolean>(false);

  const location = "Block 6-C2 Park";
  const selectedItems = order.products;

  const handleFullfillItem = async () => {
    if (order.fulfillment_status === "Fulfilled") {
      return;
    }

    const newOrder = await axios.patch(`/api/orders/${order._id}`, {
      field: "fulfillment_status",
      value: "Fulfilled",
    });

    console.log(newOrder.data);
    setOrder({ ...order, fulfillment_status: "Fulfilled" });
  };

  const handleFieldChange = async (field: string, value: any) => {
    const newOrder = await axios.patch(`/api/orders/${order._id}`, {
      field,
      value,
    });

    console.log(newOrder.data);
    setOrder({ ...order, [field]: value });
  };

  return (
    <div className="flex justify-center w-full">
      <div className="w-full max-w-5xl flex flex-col lg:flex-row gap-4">
        <Card className="flex w-full flex-col items-center justify-center py-4">
          <div className="flex w-full justify-between px-4">
            <div className="flex gap-2 items-center">
              <div
                className={`flex items-center font-normal rounded-lg p-1 px-2 gap-2 ${
                  order?.fulfillment_status === "Fulfilled"
                    ? "bg-green-200"
                    : "bg-yellow-300"
                }`}
              >
                <UnfulfilledMajor
                  className={`${
                    order?.fulfillment_status === "Fulfilled"
                      ? "hidden"
                      : "fill-yellow-700"
                  } w-5`}
                />

                <ShipmentMajor
                  className={`${
                    order?.fulfillment_status === "Fulfilled"
                      ? "fill-green-700"
                      : "hidden"
                  } w-5`}
                />
                <p
                  className={`text-xs font-medium ${
                    order?.fulfillment_status === "Fulfilled"
                      ? "text-green-700"
                      : "text-yellow-700"
                  }`}
                >
                  {order?.fulfillment_status
                    ? order.fulfillment_status.charAt(0).toUpperCase() +
                      order.fulfillment_status.slice(1)
                    : ""}{" "}
                  (1)
                </p>
              </div>
              <Text className="text-gray-800">#{order._id.slice(-4)}</Text>
            </div>
            <Text className="text-gray-800 flex items-center">
              {order.customer.addresses[0].address}
            </Text>
          </div>

          <div className="px-4 w-full">
            <div
              className="border border-gray-200 rounded-xl 
            mt-4 flex flex-col w-full"
            >
              <div className="flex text-sm p-3 items-center text-gray-700">
                {order.customer?.firstName} {order.customer?.lastName}
              </div>

              {order.products?.map((product: any) => (
                <div
                  key={product._id}
                  className="flex justify-between border-t items-start p-3 text-sm border-gray-300"
                >
                  <div className="flex gap-2">
                    {product.media?.length > 0 ? (
                      <div className="w-10 h-10 rounded-xl overflow-hidden">
                        <Image
                          src={product.media[0].url}
                          alt={product.title}
                          width={0}
                          height={0}
                          sizes="100vw"
                          style={{ width: "100%", height: "100%" }}
                        />
                      </div>
                    ) : (
                      <Link
                        href={`/products/${product._id}`}
                        className="w-10 h-10 rounded-md overflow-hidden border bg-gray-100 border-gray-300 grid place-items-center"
                      >
                        <PiImageThin size={14} className="text-gray-500" />
                      </Link>
                    )}
                    <div>
                      <Link href={`/products/${product._id}`}>
                        <p className="hover:underline w-32 text-blue-500 cursor-pointer font-medium">
                          {product.title.length > 30
                            ? product.title.slice(0, 30) + "..."
                            : product.title}
                        </p>
                      </Link>
                      <p className="md:hidden">
                        {product.weight} {product.weightUnit}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="hidden sm:block">
                      {product.weight} {product.weightUnit}
                    </div>
                    <Input
                      id={"quantity" + product._id}
                      type="number"
                      value={product.quantity}
                      onChange={(e) => {
                        handleFieldChange(
                          `products.${product._id}.quantity`,
                          e.target.value
                        );
                      }}
                      className="border border-gray-300 rounded-lg text-sm w-32"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex mt-6 px-4 gap-4 items-start w-full flex-col">
            <SectionTitle title="Tracking information" />
            {trackingNumbers.map((t, i) => (
              <div
                key={i}
                className="flex flex-col sm:flex-row w-full gap-2 items-center"
              >
                <Input
                  id={"trackingNumber" + i}
                  label="Tracking number"
                  value={trackingNumbers[i]}
                  onChange={(e) => {
                    trackingNumbers[0] = e.target.value;
                    setTrackingNumbers([...trackingNumbers]);
                  }}
                />
                <div className="flex items-center w-full md:w-[50%] gap-2">
                  <Input
                    id={"shippingCarrier" + i}
                    label="Shipping carrier"
                    value={shippingCarrier}
                    disabled={i !== 0}
                    onChange={(e) => setShippingCarrier(e.target.value)}
                  />
                  {i !== 0 && (
                    <button
                      className="text-gray-500 hover:text-gray-800 transition-all"
                      onClick={() => {
                        trackingNumbers.splice(i, 1);
                        setTrackingNumbers([...trackingNumbers]);
                      }}
                    >
                      <DeleteMajor className="fill-gray-600 w-5 mt-5" />
                    </button>
                  )}
                </div>
              </div>
            ))}
            <p
              onClick={() => setTrackingNumbers([...trackingNumbers, ""])}
              className="mt-2 font-medium text-sm text-blue-500 hover:underline cursor-pointer"
            >
              + Add another tracking number
            </p>
          </div>

          <div className="justify-start w-full pt-4 px-4 mt-4 border-t border-gray-200">
            <SectionTitle title="Notify customer of shipment" />
            <Checkbox
              id="notifyCustomer"
              label="Send shipment details to your customer now"
              checked={notifyCustomer}
              onChange={(e) => setNotifyCustomer(e.target.checked)}
            />
          </div>
        </Card>

        <div className="flex flex-col gap-4 w-full xl:max-w-[280px]">
          <Card className="flex flex-col p-4">
            <div className="text-sm">
              <p className="text-gray-800 font-semibold py-1 flex items-center justify-between">
                Shipping address
                <EditShippingAddress
                  oldAddress={order.customer?.addresses[0]}
                  editAddress={(address: any, idx: number) => {
                    handleFieldChange("customer.addresses.0", address);
                  }}
                  idx={0}
                />
              </p>
              <p className="">{order.customer?.addresses[0]?.address}</p>
              <p className="">{order.customer?.addresses[0]?.city}</p>
              <p className="pb-2">{order.customer?.addresses[0]?.country}</p>
              <a
                className="text-blue-500 underline font-semibold"
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  order.customer?.addresses[0]?.address
                )}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                View map
              </a>
            </div>
          </Card>

          <Card className="flex p-4 flex-col">
            <SectionTitle title="Summary" />
            <Text className=" text-gray-800">Filfilling from {location}</Text>
            <Text className=" text-gray-800 mb-4">
              {selectedItems.length} of {order.products.length} item
            </Text>
            {order.fulfillment_status === "Fulfilled" ? (
              <FilledButton disabled={true}>Items fulfilled</FilledButton>
            ) : (
              <FilledButton onClick={handleFullfillItem}>
                Fulfill items
              </FilledButton>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
