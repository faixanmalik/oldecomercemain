"use client";

import axios from "axios";

import Heading from "@/components/Heading";
import { ApiOrder, Order } from "@/types/order";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import Card from "@/components/Card";
import SectionTitle from "@/components/SectionTitle";
import Input from "@/components/Input";

import { useState, useEffect, use } from "react";
import Checkbox from "@/components/Checkbox";
import FilledButton from "@/components/buttons/FilledButton";

import Text from "@/components/Text";
import Image from "next/image";
import { PiImageThin } from "react-icons/pi";

import {
  FulfillmentFulfilledMajor,
  UnfulfilledMajor,
} from "@shopify/polaris-icons";

export default function FulfillItemPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  const [order, setOrder] = useState<Order>();
  const [selectedItems, setSelectedItems] = useState<any>([]);
  const [selectedCustomItems, setSelectedCustomItems] = useState<any>([]);

  const [total, setTotal] = useState(0);

  useEffect(() => {
    let customTotal = 0;

    selectedItems.forEach((item: any) => {
      customTotal += parseFloat(item.price) * parseFloat(item.quantity);
    });

    selectedCustomItems.forEach((item: any) => {
      customTotal += parseFloat(item.price) * parseFloat(item.quantity);
    });

    setTotal(customTotal);
  }, [selectedItems, selectedCustomItems]);

  const fullfilled = order?.fulfillment_status === "Fulfilled";

  useEffect(() => {
    const fetchOrder = async () => {
      const { data } = await axios.get(`/api/orders/${id}`);
      console.log(data);
      setOrder(data);
    };

    fetchOrder();
  }, [id]);

  return (
    <div className="bg-gray-100 min-h-screen md:px-5 py-5">
      <div className=" w-full flex justify-between px-4 md:px-0">
        <div className="flex gap-2">
          <Link href="/orders">
            <FaArrowLeft className="text-2xl mt-1 text-neutral-800 rounded-md p-1 hover:bg-neutral-200" />
          </Link>
          <div>
            <Heading className="whitespace-nowrap">Refund</Heading>
            <p className="text-xs"># {params.id.slice(0, 4)}</p>
          </div>
        </div>
      </div>
      <div className="h-4" />

      <Card className="flex w-full flex-col items-center justify-center py-4">
        <div className="flex w-full justify-between px-4">
          <div className="flex gap-2 items-center">
            <div
              className={`flex items-center font-normal rounded-lg p-1 px-2 gap-2 ${
                fullfilled ? "bg-green-200" : "bg-yellow-300"
              }`}
            >
              <UnfulfilledMajor
                className={`${fullfilled ? "hidden" : "fill-yellow-700"} w-5`}
              />

              <FulfillmentFulfilledMajor
                className={`${fullfilled ? "fill-green-700" : "hidden"} w-5`}
              />
              <p
                className={`text-xs font-semibold ${
                  fullfilled ? "text-green-700" : "text-yellow-700"
                }`}
              >
                {order?.fulfillment_status} (1)
              </p>
            </div>
          </div>
          <Text className="text-gray-800 flex items-center">
            {order?.customer.addresses[0].address}
          </Text>
        </div>

        <div className="px-4 w-full">
          <div
            className="border border-gray-200 rounded-xl 
            mt-4 flex flex-col w-full"
          >
            {order?.products?.map((product: any, idx) => (
              <div
                key={product._id}
                className={`flex justify-between ${
                  idx !== 0 ? "border-t" : ""
                } items-start p-3 text-sm border-gray-300`}
              >
                <div className="flex gap-2 w-[50%]">
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
                      <p className="hover:underline text-blue-500 cursor-pointer font-medium">
                        {product.title.length > 15
                          ? product.title.slice(0, 15) + "..."
                          : product.title}
                      </p>
                    </Link>
                    <p>SAR {product.price}</p>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row items-center gap-4 mt-4 md:mt-0">
                  <div className="flex text-gray-700 items-center gap-2 border border-100 rounded-lg p-2 w-32">
                    <input
                      placeholder="0"
                      onChange={(e) => {
                        setSelectedItems((prev: any) => {
                          const newItems = [...prev];
                          const index = newItems.findIndex(
                            (item: any) => item._id === idx
                          );
                          if (index === -1) {
                            newItems.push({
                              _id: idx,
                              name: product.title,
                              price: product.price,
                              quantity: e.target.value,
                            });
                          } else {
                            newItems[index].quantity = e.target.value;
                          }
                          return newItems;
                        });
                      }}
                      id={"price" + idx}
                      className="focus:outline-none w-[50%]"
                      type="number"
                    />
                    <p> / </p>
                    <p>{product.quantity}</p>
                  </div>
                  <p className="w-32 text-left">
                    SAR{" "}
                    {(
                      parseFloat(product.price) *
                      selectedItems.find((item: any) => item._id === idx)
                        ?.quantity
                    ).toFixed(2) === "NaN"
                      ? "0.00"
                      : (
                          parseFloat(product.price) *
                          selectedItems.find((item: any) => item._id === idx)
                            ?.quantity
                        ).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}

            {order?.customItems?.map((product: any, idx) => (
              <div
                key={idx}
                className={`flex justify-between border-t items-start p-3 text-sm border-gray-300`}
              >
                <div className="flex gap-2 w-[50%]">
                  <span className="w-10 h-10 rounded-md overflow-hidden border bg-gray-100 border-gray-300 grid place-items-center">
                    <PiImageThin size={14} className="text-gray-500" />
                  </span>

                  <div>
                    <p className="font-medium">
                      {product.name.length > 15
                        ? product.name.slice(0, 15) + "..."
                        : product.name}
                    </p>
                    <p>SAR {product.price}</p>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row items-center gap-4 mt-4 md:mt-0">
                  <div className="flex text-gray-700 items-center gap-2 border border-100 rounded-lg p-2 w-32">
                    <input
                      placeholder="0"
                      onChange={(e) => {
                        setSelectedCustomItems((prev: any) => {
                          const newItems = [...prev];
                          const index = newItems.findIndex(
                            (item: any) => item._id === idx
                          );
                          if (index === -1) {
                            newItems.push({
                              _id: idx,
                              name: product.name,
                              price: product.price,
                              quantity: product.quantity,
                            });
                          } else {
                            newItems[index].quantity = e.target.value;
                          }
                          return newItems;
                        });
                      }}
                      id={"price" + idx}
                      className="focus:outline-none w-[50%]"
                      type="number"
                    />
                    <p> / </p>
                    <p>{product.quantity}</p>
                  </div>
                  <p className="w-32 text-left">
                    SAR{" "}
                    {(
                      parseFloat(product.price) *
                      selectedCustomItems[idx]?.quantity
                    ).toFixed(2) === "NaN"
                      ? "0.00"
                      : (
                          parseFloat(product.price) *
                          selectedCustomItems[idx]?.quantity
                        ).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      <Card className="mt-4 p-4">
        <SectionTitle title="Reason for refund" />

        <Input id="reason" type="text" className="w-full" />
        <p className="text-gray-600 text-sm py-1">
          Only you and other staff can see this reason.
        </p>
      </Card>

      <Card className="mt-4">
        <div className="p-4">
          <SectionTitle title="Summary" />

          {selectedItems.length > 0 || selectedCustomItems.length > 0 ? (
            <div className="flex justify-between text-sm text-gray-600">
              <div className="flex flex-col gap-2">
                <p>Item subtotal</p>
                <p>Tax</p>
                <p className="text-black font-medium">Refund Total</p>
              </div>

              <div className="flex flex-col gap-2">
                <p>{total}</p>
                <p>{total * 0.15}</p>
                <p className="text-black font-medium">{total + total * 0.15}</p>
              </div>
            </div>
          ) : (
            <p className="text-sm text-gray-500 font-[500]">
              No items selected.
            </p>
          )}
        </div>

        <div className="border-t p-4">
          <SectionTitle title="Refund amount" />
          <Input
            id="amount"
            type="number"
            value={
              selectedItems.length > 0 || selectedCustomItems.length > 0
                ? total + total * 0.15
                : ""
            }
            className="w-full"
            label="Manual"
          />
          <Checkbox
            id=""
            className="mt-2"
            label="Send a notification to the customer"
          />
        </div>

        <div className="p-4 flex border-t justify-end">
          <FilledButton className="w-full">
            Refund{" "}
            {selectedItems.length > 0 || selectedCustomItems.length > 0
              ? `SAR ${total + total * 0.15}`
              : ""}
          </FilledButton>
        </div>
      </Card>
    </div>
  );
}
