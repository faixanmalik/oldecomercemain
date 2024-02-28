"use client";

import { useState, useEffect } from "react";
import axios from "axios";

import Heading from "@/components/Heading";
import { ApiOrder, Order } from "@/types/order";
import Link from "next/link";
import FulfillItemForm from "@/components/orders/FulfillItemForm";
import OutlinedButton from "@/components/buttons/OutlinedButton";
import { FaArrowLeft } from "react-icons/fa";

export default function FulfillItemPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  const [order, setOrder] = useState<Order>();

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
        <div className="flex items-center gap-2">
          <Link href="/orders">
            <FaArrowLeft className="text-2xl text-neutral-800 rounded-md p-1 hover:bg-neutral-200" />
          </Link>
          <Heading className="whitespace-nowrap">Fulfill Item</Heading>
        </div>
        <div className="flex items-center gap-2">
          <OutlinedButton className="text-sm">
            Print packing slip
          </OutlinedButton>
        </div>
      </div>
      <div className="h-4" />

      {order && <FulfillItemForm order={order} setOrder={setOrder} />}
    </div>
  );
}
