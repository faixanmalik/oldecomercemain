"use client";

import React, { useState } from "react";

import Checkbox from "../Checkbox";
import OutlinedButton from "../buttons/OutlinedButton";
import { Button } from "../ui/button";
import Text from "../Text";
import { IoClose, IoSearchOutline } from "react-icons/io5";
import { MdOutlineFilterList } from "react-icons/md";
import Input from "../Input";
import FilledButton from "../buttons/FilledButton";
import AddViewDialog from "../AddViewDialog";
import AddFilterPopover from "../AddFilterPopover";
import OrderCard from "./OrderCard";
import Link from "next/link";
import { Order } from "@/types/order";

import SortPopover from "../SortPopover";

import Dot from "../Small/Dot";
import HollowDot from "../Small/HollowDot";
import PillTag from "../Small/Pill";
import MoreOptionsOrders from "./popovers/MoreOptionsOrders";

const Datatable = ({ orders }: { orders: Order[] }) => {
  const views = ["All", "Unfulfilled", "Unpaid", "Open", "Closed"];

  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);

  const toggleSelectAll = () => {
    if (selectedOrders.length === orders.length) {
      setSelectedOrders([]);
    } else {
      setSelectedOrders(orders.map((o) => o._id));
    }
  };

  const toggleSelect = (id: string) => {
    if (selectedOrders.includes(id)) {
      setSelectedOrders([...selectedOrders.filter((o) => o !== id)]);
    } else {
      setSelectedOrders([...selectedOrders, id]);
    }

    console.log(selectedOrders);
  };

  const [selectedView, setSelectedView] = useState(views[0]);

  const handleViewChange = (view: string) => {
    setSelectedView(view);
  };

  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [filters, setFilters] = useState<string[]>([]);

  const allFilters = [
    "Drafts",
    "Open",
    "Paid",
    "Unpaid",
    "Overdue",
    "Cancelled",
  ];

  return (
    <div className="shadow-sm shadow-black/10 rounded-xl lg:w-full md:w-[100%]">
      <div className="hidden md:flex rounded-t-xl overflow-x- justify-between items-start bg-white px-2 py-1">
        {isSearching ? (
          <div className="flex mr-2 flex-col w-full">
            <div className="flex flex-1 items-center ">
              <Input
                id="search"
                className="flex-1"
                placeholder="Searching all products"
                value={search}
                icon={<IoSearchOutline size={16} className="text-gray-800" />}
                onChange={(e) => setSearch(e.target.value)}
              />
              <div className="w-4" />
              <Button
                variant="ghost"
                className="px-2 mr-2 h-min py-1 text-gray-800 text-xs hover:bg-gray-200/75"
                onClick={() => setIsSearching(false)}
              >
                Cancel
              </Button>
              <FilledButton>Save as</FilledButton>
            </div>

            <div className=" border-t border-gray-300 pt-2 mt-2 mb-1 flex gap-1">
              {filters.map((f) => (
                <Button
                  key={f}
                  variant="outline"
                  className="px-2 rounded-lg h-min py-1 text-gray-800 text-xs hover:bg-gray-200/75"
                  onClick={() => {}}
                >
                  {f}
                  <IoClose
                    size={12}
                    className="inline-block ml-1"
                    onClick={() => setFilters(filters.filter((_f) => f !== _f))}
                  />
                </Button>
              ))}

              <AddFilterPopover
                disabled={filters}
                filters={allFilters}
                onSelect={(f) => setFilters([...filters, f])}
              />

              <Button
                variant="ghost"
                className="px-2 rounded-lg h-min py-1 text-gray-800 text-xs hover:bg-gray-200/75"
                onClick={() => setFilters([])}
              >
                Clear all
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex mr-2 w-full justify-between items-center">
            <div className="flex gap-2 items-center">
              {views.map((v) => (
                <Button
                  key={v}
                  variant="ghost"
                  className={`hover:bg-gray-200/75 px-3 py-1.5 h-min ${
                    v === selectedView ? "bg-gray-200" : "bg-transparent"
                  }`}
                  onClick={() => setSelectedView(v)}
                >
                  <Text className="text-gray-800 capitalize">{v}</Text>
                </Button>
              ))}
              <AddViewDialog onSave={(name) => {}} />
            </div>

            <OutlinedButton
              className="p-1.5 flex gap-0.5"
              onClick={() => setIsSearching(true)}
            >
              <IoSearchOutline size={16} className="text-black" />
              <MdOutlineFilterList size={20} className="text-black" />
            </OutlinedButton>
          </div>
        )}
      </div>

      <div className="flex md:hidden flex-col w-screen">
        <div className="flex py-1 bg-white gap-2 px-2 mr-2 w-full justify-between items-center">
          <div className="flex gap-2 overflow-x-scroll border-r items-center">
            {views.map((v) => (
              <Button
                key={v}
                variant="ghost"
                className={`hover:bg-gray-200/75 px-3 py-1.5 h-min ${
                  v === selectedView ? "bg-gray-200" : "bg-transparent"
                }`}
                onClick={() => setSelectedView(v)}
              >
                <Text className="text-gray-800 capitalize">{v}</Text>
              </Button>
            ))}
            <AddViewDialog onSave={(name) => {}} />
          </div>

          <div className="flex gap-2 justify-between items-center">
            <OutlinedButton
              className="p-1.5 flex gap-0.5"
              onClick={() => setIsSearching(true)}
            >
              <IoSearchOutline size={16} className="text-black" />
              <MdOutlineFilterList size={20} className="text-black" />
            </OutlinedButton>

            {/* <SortPopover /> */}
          </div>
        </div>
      </div>

      <div className="hidden text-sm md:block overflow-x-auto overflow-y-hidden bg-white rounded-b-lg">
        <div className="bg-gray-100 min-w-fit">
          <div className="grid text-gray-600 px-4 grid-cols-11 p-1 py-1.5 font-medium gap-1 gap-x-32 lg:gap-x-0 pr-8">
            <div className="flex gap-1">
              <Checkbox
                checked={selectedOrders.length === orders.length}
                id="select-all"
                onChange={toggleSelectAll}
              />
              Order
            </div>
            <div className="whitespace-nowrap">Date</div>
            <div className="whitespace-nowrap">Customer</div>
            <div className="whitespace-nowrap">Channel</div>
            <div className="whitespace-nowrap">Total</div>
            <div className="whitespace-nowrap">Payment status</div>
            <div className="whitespace-nowrap">Fulfillment status</div>
            <div className="whitespace-nowrap">Items</div>
            <div className="whitespace-nowrap">Delivery status</div>
            <div className="whitespace-nowrap">Delivery method</div>
            <div className="whitespace-nowrap">Tags</div>
          </div>
        </div>

        {orders &&
          orders.map((order, idx) => (
            <Link key={order._id} href={`/orders/${order._id}`}>
              <div
                className={`grid min-w-fit lg:gap-x-0 border-t font-medium text-gray-600 border-0.5 border-gray-200 
                hover:bg-gray-100 grid-cols-11 p-1 w-full gap-1 gap-x-32 px-4 pr-8 ${
                  selectedOrders.includes(order._id) && "bg-gray-100"
                } cursor-pointer`}
              >
                <div
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  className="flex items-center gap-1"
                >
                  <Checkbox
                    checked={selectedOrders.includes(order._id)}
                    id={order._id}
                    onChange={(e: any) => {
                      e.preventDefault();
                      e.stopPropagation();
                      toggleSelect(order._id);
                    }}
                  />
                  <Link
                    href={`/orders/${order._id}`}
                    className="text-[0.9em] text-black font-semibold"
                  >
                    #{order._id.slice(0, 4)}
                  </Link>
                </div>
                <div className="whitespace-nowrap">
                  {order.createdAt.slice(3, 10)}
                </div>
                <div className="whitespace-nowrap">
                  {order.customer ? order.customer.firstName : "No customer"}
                </div>
                <div className="whitespace-nowrap">{order.channel}</div>
                <div className="whitespace-nowrap">
                  {order.total && `Rs. ${order.total}`}
                </div>

                <PillTag bgColor="bg-gray-200">
                  <Dot />
                  <p className="text-gray-500 text-[0.8em] font-medium">
                    {order.payment_status}
                  </p>
                </PillTag>

                <div className="w-24">
                  <PillTag
                    bgColor={
                      order.fulfillment_status === "Fulfilled"
                        ? ""
                        : order.fulfillment_status === "Unfulfilled"
                        ? "bg-yellow-300"
                        : "bg-orange-200"
                    }
                  >
                    {order.fulfillment_status === "Fulfilled" ? (
                      <Dot />
                    ) : (
                      <HollowDot color="border-orange-900" />
                    )}

                    <p
                      className={`whitespace-nowrap ${
                        order.fulfillment_status === "Fulfilled"
                          ? "text-gray-500"
                          : order.fulfillment_status === "Unfulfilled"
                          ? "text-yellow-700"
                          : "text-orange-700"
                      } font-medium text-[0.8em]`}
                    >
                      {order?.fulfillment_status
                        ? order.fulfillment_status.charAt(0).toUpperCase() +
                          order.fulfillment_status.slice(1)
                        : ""}
                    </p>
                  </PillTag>
                </div>

                <div className="whitespace-nowrap">
                  {order.customItems.length + order.products.length}
                </div>
                <div className="whitespace-nowrap">{order.delivery_status}</div>

                <div className="whitespace-nowrap">{order.delivery_method}</div>
                <div className={`whitespace-nowrap`}>
                  {order.tags && order.tags[0]}
                </div>
              </div>
            </Link>
          ))}

        {selectedOrders.length > 0 && (
          <div className="flex h-20 justify-center items-center border-t">
            <div className="rounded-xl absolute flex gap-2 p-2 border shadow-sm shadow-black/20">
              <OutlinedButton className="bg-gray-200 !shadow-none hover:!bg-gray-300 text-sm">
                Mark as fulfilled
              </OutlinedButton>

              <OutlinedButton className="bg-gray-200 !shadow-none hover:!bg-gray-300 text-sm">
                Capture payments
              </OutlinedButton>

              <MoreOptionsOrders />
            </div>
          </div>
        )}
      </div>

      <div>
        {orders.map((order, i) => (
          <OrderCard
            key={order._id}
            order={order}
            last={i === orders.length - 1}
          />
        ))}
      </div>
    </div>
  );
};

export default Datatable;
