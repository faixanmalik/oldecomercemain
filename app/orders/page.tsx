// pages/orders.tsx
"use client";
import { Order } from "@/types/order";
import { Location } from "@/types/location";

import Heading from "@/components/Heading";
import FilledButton from "@/components/buttons/FilledButton";
import OutlinedButton from "@/components/buttons/OutlinedButton";
import Link from "next/link";
import DatatableAlt from "@/components/orders/DatatableAlt";

import { useEffect, useState } from "react";
import AllLocationsPopover from "@/components/AllLocationsPopover";

import { IoIosArrowDown } from "react-icons/io";

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<Location>();

  useEffect(() => {
    const fetchLocations = async () => {
      const res = await fetch("/api/settings/locations");
      const data = await res.json();
      setLocations(data);
      setSelectedLocation(data[0]);
      console.log(data);
    };

    fetchLocations();
  }, []);

  useEffect(() => {
    const fetchOrders = async () => {
      const res = await fetch("/api/orders");
      const data = await res.json();
      setOrders(data);
      console.log(data);
    };

    fetchOrders();
  }, []);

  return (
    <div className="p-0 md:p-5">
      <div className="flex flex-col-reverse gap-4 md:gap-0 md:flex-row p-5 md:p-0 md:pb-5 justify-between">
        <div className="font-bold flex text-xl">
          <h1 className="mr-2">Orders:</h1>
          <AllLocationsPopover
            locations={locations}
            selectedLocation={selectedLocation || locations[0]}
            showDefaultOption={false}
            setSelectedLocation={(l) =>
              l
                ? setSelectedLocation(l as Location)
                : setSelectedLocation(locations[0])
            }
            button={
              <p className="font-bold text-[#1a1a1a] text-xl flex gap-2 cursor-pointer items-center">
                {selectedLocation?.name} <IoIosArrowDown />{" "}
              </p>
            }
          />
        </div>

        <div className="self-end">
          <OutlinedButton className="mr-2">Export</OutlinedButton>
          <Link href="/orders/new">
            <FilledButton>Create Order</FilledButton>
          </Link>
        </div>
      </div>

      <DatatableAlt orders={orders} />
    </div>
  );
}
