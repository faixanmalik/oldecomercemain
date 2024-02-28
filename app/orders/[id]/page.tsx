"use client";

import { FaArrowLeft } from "react-icons/fa";
import Link from "next/link";
import Heading from "@/components/Heading";
import MoreActionsPopover from "@/components/orders/single/MoreActionsPopover";
import OutlinedButton from "@/components/buttons/OutlinedButton";
import EditOrderForm from "@/components/orders/EditOrderForm";

import { Order } from "@/types/order";
import { useState, useEffect } from "react";
import HollowDot from "@/components/Small/HollowDot";
import PillTag from "@/components/Small/Pill";
import Dot from "@/components/Small/Dot";

export default function OrderPage({ params }: { params: { id: string } }) {
  const [order, setOrder] = useState<Order>();

  useEffect(() => {
    fetch(`/api/orders/${params.id}`, { cache: "no-cache" })
      .then((res) => res.json())
      .then((order) => setOrder(order));

    console.log(order);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fullfilled = order?.fulfillment_status === "Fulfilled";
  const unfulfilled = order?.fulfillment_status === "Unfulfilled";

  return (
    <div className="min-h-screen md:p-5 md:w-[100%] lg:px-[20%]">
      <div className="flex flex-col-reverse sm:flex-row gap-4 justify-between p-5 md:p-0 md:pb-5">
        <div className="flex gap-4">
          <Link href="/orders" className="hidden sm:block">
            <FaArrowLeft className="text-xs mt-2.5 text-neutral-800" />
          </Link>
          <div>
            <div className="flex gap-4 items-center">
              <Heading>#{params.id.slice(0, 4)}</Heading>
              <PillTag bgColor="bg-gray-200">
                <Dot />
                <p className="text-gray-500 text-xs font-medium">
                  {order?.payment_status}
                </p>
              </PillTag>
              <PillTag
                bgColor={
                  fullfilled
                    ? ""
                    : unfulfilled
                    ? "bg-yellow-300"
                    : "bg-orange-200"
                }
              >
                {fullfilled ? (
                  <Dot />
                ) : (
                  <HollowDot color={unfulfilled ? "border-[#998a00]" : "border-orange-700"} />
                )}

                <p
                  className={`${
                    fullfilled
                      ? "text-gray-500"
                      : unfulfilled
                      ? "text-yellow-700"
                      : "text-orange-700"
                  } text-xs font-medium whitespace-nowrap`}
                >
                  {order?.fulfillment_status
                    ? order.fulfillment_status.charAt(0).toUpperCase() +
                      order.fulfillment_status.slice(1)
                    : ""}
                </p>
              </PillTag>
            </div>
            <p className="text-xs py-1 text-neutral-500">
              {order?.createdAt?.slice(0, 31) ?? ""}
            </p>
          </div>
        </div>

        <div className="flex items-center md:items-start justify-between">
          <Link href="/orders" className="sm:hidden">
            <FaArrowLeft className="w-6 h-6 p-[5px] hover:bg-gray-200 rounded-lg text-neutral-800" />
          </Link>
          <div className="flex items-center gap-2">
            <Link href={`/orders/${params.id}/refund`}>
              <OutlinedButton>Refund</OutlinedButton>
            </Link>
            <Link href={`/orders/${params.id}/edit`}>
              <OutlinedButton>Edit</OutlinedButton>
            </Link>
            <MoreActionsPopover />
          </div>
        </div>
      </div>

      {order && <EditOrderForm setOrder={setOrder} order={order} />}
    </div>
  );
}
