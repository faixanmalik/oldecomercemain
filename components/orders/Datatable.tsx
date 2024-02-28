"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Checkbox from "@/components/Checkbox";
import StatusText from "@/components/StatusText";
import { useRouter } from "next/navigation";
import Card from "@/components/Card";
import { Button } from "@/components/ui/button";
import { FilterElements, HeaderItem, RowProps } from "@/types/datatable";
import Datatable from "../Datatable";
import { Order } from "@/types/order";
import { useState } from "react";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import Link from "next/link";
import Text from "../Text";
import { FaCircle } from "react-icons/fa";

export default function OrdersDatable({
  initialOrders,
}: {
  initialOrders: Order[];
}) {
  const router = useRouter();

  function MobileRow({ item: o }: RowProps<Order>) {
    return (
      <Link href={`/orders/${o._id}`} key={o._id} className="flex w-full px-4">
        <div className="flex items-center justify-between w-full">
          <div className="flex gap-1 flex-col">
            <Text className="text-gray-800 font-bold flex items-center gap-1 text-base">
              #{o._id.slice(-4)}{" "}
              <span className="text-gray-500 flex items-center gap-1 text-xs">
                <FaCircle size={5} /> {o.date ?? "No Date"}
              </span>
            </Text>
            <Text className="text-gray-500 flex items-center gap-1 text-xs">
              {o.customer?.firstName + " " + o.customer?.lastName}
            </Text>
            <Text
              as="div"
              className="text-gray-500 flex items-center gap-1 text-xs"
            >
              {" "}
              <FaCircle size={8} className="text-gray-800" /> {o.payment_status}

              <div className="flex w-24 items-center rounded-xl px-2 py-1 gap-2 bg-yellow-100">
                <span className="rounded-full outline-1 p-1.5 bg-yellow-500"></span>
                <p className="text-gray-500 text-xs">{o.fulfillment_status}</p>
              </div>
            </Text>
            <Text className="text-gray-800 flex items-center gap-1">
              {(o.customItems?.length ?? 0) + o.products.length} item{" "}
              <FaCircle size={4} className="text-gray-800" />{" "}
            </Text>
          </div>
          <Text className="text-base text-gray-800">
            ${" "}
            {o.products.reduce((acc, p) => acc + (p.price ?? 0), 0) +
              (o.customItems?.reduce((acc, p) => acc + (p.price ?? 0), 0) ?? 0)}
          </Text>
        </div>
      </Link>
    );
  }

  function Row({ item: p, isSelected, setSelected }: RowProps<Order>) {
    return (
      <tr className="bg-white border-b hover:bg-gray-50 ">
        <td className="w-4 p-4">
          <Checkbox
            id={"select-" + p._id}
            checked={isSelected}
            onChange={(e) => setSelected(e.target.checked)}
          />
        </td>

        <th
          scope="row"
          onClick={() => router.push(`/orders/${p._id}`)}
          className="flex gap-1 items-center xl:min-w-[240px] py-4 font-medium text-gray-900 whitespace-nowrap cursor-pointer"
        >
          <p className="ml-4">#{p._id.substring(0, 4)}</p>
        </th>

        <td className="px-6 py-2">{p.date}</td>
        <td className="px-6 py-2">
          {(p.customer?.firstName ?? "") + " " + (p.customer?.lastName ?? "")}
        </td>
        <td className="px-6 py-2">{p.channel}</td>
        <td className="px-6 py-2">{p.total}</td>
        <td className="px-6 py-2">{p.payment_status}</td>
        <td className="px-6 py-2">
          {p.fulfillment_status && <StatusText status={p.fulfillment_status} />}
        </td>
        <td className="px-6 py-2">
          {p.products.length + (p.customItems?.length ?? 0)} items
        </td>
        <td className="px-6 py-2">{p.delivery_status}</td>
        <td className="px-6 py-2">{p.delivery_method}</td>
        <td className="px-6 py-2">{p.tags?.join(", ")}</td>
      </tr>
    );
  }

  return (
    <Datatable<Order>
      initialItems={initialOrders}
      sortPopoverProps={{
        //TODO: fecth new `initialOrders` from API
        onSelect: (value) => {
          console.log(value);
        },
        options: [
          { label: "Order number", value: "_id" },
          { label: "Date", value: "date" },
          { label: "Customer name", value: "customer.firstName" },
          { label: "Channel", value: "channel" },
          { label: "Total", value: "total" },
          { label: "Payment status", value: "payment_status" },
          { label: "Fulfillment status", value: "fulfillment_status" },
          { label: "Items", value: "items.length" },
          { label: "Destination", value: "destination.name" },
        ],
      }}
      ActionsCard={ActionsCard}
      Row={Row}
      MobileRow={MobileRow}
      headerItems={getHeaderItems(initialOrders)}
      views={["all", "active", "draft", "archived"]}
      filters={getAllFilters()}
    />
  );
}

function ActionsCard() {
  return (
    <div className="py-4 min-w-full w-full grid bg-white place-items-center">
      <Card className="px-4 py-2 flex gap-2">
        <Button
          variant="ghost"
          className="p-2 bg-gray-200 text-black hover:bg-gray-300 h-min text-xs"
          onClick={() => { }}
        >
          Mark as fulfilled
        </Button>
        <Button
          variant="ghost"
          className="p-2 bg-gray-200 text-black hover:bg-gray-300 h-min text-xs"
          onClick={() => { }}
        >
          Capture payments
        </Button>
        <MoreActionsPopover />
      </Card>
    </div>
  );
}

function MoreActionsPopover() {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          className="p-2 bg-gray-200 text-black hover:bg-gray-300 h-min text-xs"
          onClick={() => { }}
        >
          <HiOutlineDotsHorizontal size={14} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="rounded-xl p-1.5 bg-white flex flex-col gap-1">
        <Button
          variant="ghost"
          className="flex justify-start rounded-lg hover:bg-gray-100 bg-white transition-all h-min text-xs whitespace-nowrap px-2 py-1"
        >
          Request fullfilment
        </Button>
        <Button
          variant="ghost"
          className="flex justify-start rounded-lg hover:bg-gray-100 bg-white transition-all h-min text-xs whitespace-nowrap px-2 py-1"
        >
          Cancel fullfilment requests
        </Button>
        <Button
          variant="ghost"
          className="flex w-full justify-start rounded-lg hover:bg-gray-100 bg-white transition-all h-min text-xs whitespace-nowrap px-2 py-1"
        >
          Mark as unfulfilled
        </Button>
        <Button
          variant="ghost"
          className="flex justify-start rounded-lg hover:bg-gray-100 bg-white transition-all h-min text-xs whitespace-nowrap px-2 py-1"
        >
          Change fullfilment location
        </Button>

        <div className="my-2 h-px bg-gray-200 w-full" />

        <Button
          variant="ghost"
          className="flex justify-start rounded-lg hover:bg-gray-100 bg-white transition-all h-min text-xs whitespace-nowrap px-2 py-1"
        >
          Print packing slip
        </Button>
        <Button
          variant="ghost"
          className="flex justify-start rounded-lg hover:bg-gray-100 bg-white transition-all h-min text-xs whitespace-nowrap px-2 py-1"
        >
          Archive orders
        </Button>
        <Button
          variant="ghost"
          className="flex justify-start rounded-lg hover:bg-gray-100 bg-white transition-all h-min text-xs whitespace-nowrap px-2 py-1"
        >
          Unarchive orders
        </Button>
        <Button
          variant="ghost"
          className="flex justify-start rounded-lg hover:bg-gray-100 bg-white transition-all h-min text-xs whitespace-nowrap px-2 py-1"
        >
          Cancel orders
        </Button>

        <div className="my-2 h-px bg-gray-200 w-full" />

        <Button
          variant="ghost"
          className="flex justify-start rounded-lg hover:bg-gray-100 bg-white transition-all h-min text-xs whitespace-nowrap px-2 py-1"
        >
          Add tags
        </Button>
        <Button
          variant="ghost"
          className="flex justify-start rounded-lg hover:bg-gray-100 bg-white transition-all h-min text-xs whitespace-nowrap px-2 py-1"
        >
          Remove tags
        </Button>
      </PopoverContent>
    </Popover>
  );
}

function getHeaderItems(orders: Order[]): HeaderItem<Order>[] {
  return [
    {
      label: "Order",
      sortable: true,
      onSort: (sortKey) => {
        let sortedOrders = [...orders];
        switch (sortKey) {
          case "desc":
            sortedOrders.sort((a, b) =>
              (a._id ?? "").localeCompare(b._id ?? "")
            );
            break;
          case "asc":
            sortedOrders.sort((a, b) =>
              (b._id ?? "").localeCompare(a._id ?? "")
            );
            break;
          default:
            throw new Error("Sort type not allowed");
        }
        return sortedOrders;
      },
    },

    {
      label: "Expected arrival",
      sortable: true,
      onSort: (sortKey) => {
        let sortedOrders = [...orders];
        switch (sortKey) {
          case "desc":
            sortedOrders.sort((a, b) => {
              if (a.date && b.date) {
                return new Date(a.date).getTime() - new Date(b.date).getTime();
              }
              return 0;
            });
            break;
          case "asc":
            sortedOrders.sort((a, b) => {
              if (a.date && b.date) {
                return new Date(b.date).getTime() - new Date(a.date).getTime();
              }
              return 0;
            });
            break;
          default:
            throw new Error("Sort type not allowed");
        }
        return sortedOrders;
      },
    },

    {
      label: "Customer",
      sortable: true,
      onSort: (sortKey) => {
        let sortedOrders = [...orders];
        switch (sortKey) {
          case "desc":
            sortedOrders.sort((a, b) =>
              a.customer.firstName.localeCompare(b.customer.firstName)
            );
            break;
          case "asc":
            sortedOrders.sort((a, b) =>
              b.customer.firstName.localeCompare(a.customer.firstName)
            );
            break;
          default:
            throw new Error("Sort type not allowed");
        }
        return sortedOrders;
      },
    },

    {
      label: "Channel",
      sortable: true,
      onSort: (sortKey) => {
        let sortedOrders = [...orders];
        switch (sortKey) {
          case "desc":
            sortedOrders.sort((a, b) =>
              (a.channel ?? "").localeCompare(b.channel ?? "")
            );
            break;
          case "asc":
            sortedOrders.sort((a, b) =>
              (b.channel ?? "").localeCompare(a.channel ?? "")
            );
            break;
          default:
            throw new Error("Sort type not allowed");
        }
        return sortedOrders;
      },
    },

    {
      label: "Total",
      sortable: true,
      onSort: (sortKey) => {
        let sortedOrders = [...orders];
        switch (sortKey) {
          case "desc":
            sortedOrders.sort((a, b) => (a.total ?? 0) - (b.total ?? 0));
            break;
          case "asc":
            sortedOrders.sort((a, b) => (b.total ?? 0) - (a.total ?? 0));
            break;
          default:
            throw new Error("Sort type not allowed");
        }
        return sortedOrders;
      },
    },

    {
      label: "Payment status",
      sortable: true,
      onSort: (sortKey) => {
        let sortedOrders = [...orders];
        switch (sortKey) {
          case "desc":
            sortedOrders.sort((a, b) =>
              (a.payment_status ?? "").localeCompare(b.payment_status ?? "")
            );
            break;
          case "asc":
            sortedOrders.sort((a, b) =>
              (b.payment_status ?? "").localeCompare(a.payment_status ?? "")
            );
            break;
          default:
            throw new Error("Sort type not allowed");
        }
        return sortedOrders;
      },
    },

    {
      label: "Fullfilment status",
      sortable: true,
      onSort: (sortKey) => {
        let sortedOrders = [...orders];
        switch (sortKey) {
          case "desc":
            sortedOrders.sort((a, b) =>
              (a.fulfillment_status ?? "").localeCompare(
                b.fulfillment_status ?? ""
              )
            );
            break;
          case "asc":
            sortedOrders.sort((a, b) =>
              (b.fulfillment_status ?? "").localeCompare(
                a.fulfillment_status ?? ""
              )
            );
            break;
          default:
            throw new Error("Sort type not allowed");
        }
        return sortedOrders;
      },
    },

    {
      label: "Items",
      sortable: true,
      onSort: (sortKey) => {
        let sortedOrders = [...orders];
        switch (sortKey) {
          case "desc":
            sortedOrders.sort(
              (a, b) => (a.products?.length ?? 0) - (b.products?.length ?? 0)
            );
            break;
          case "asc":
            sortedOrders.sort(
              (a, b) => (b.products?.length ?? 0) - (a.products?.length ?? 0)
            );
            break;
          default:
            throw new Error("Sort type not allowed");
        }
        return sortedOrders;
      },
    },

    { label: "Delivery status", sortable: false },
    { label: "Delivery method", sortable: false },
    { label: "Tags", sortable: false },
  ];
}

function getAllFilters(): FilterElements {
  // TODO: create popovers
  return {
    "Delivery method": <div>Delivery method</div>,
    Destination: <div>Destination</div>,
    Status: <div>Status</div>,
    "Payment status": <div>Payment status</div>,
    Product: <div>Product</div>,
    "Fullfilment status": <div>Fullfilment status</div>,
    "Delivery status": <div>Delivery status</div>,
    "Return status": <div>Return status</div>,
    "Tagged with": <div>Tagged with</div>,
    "Not tagged with": <div>Not tagged with</div>,
    App: <div>App</div>,
    Channel: <div>Channel</div>,
    "Chargeback and inquiry status": <div>Chargeback and inquiry status</div>,
    "Risk level": <div>Risk level</div>,
    Date: <div>Date</div>,
    "Credit card (Last four digits)": <div>Credit card (Last four digits)</div>,
    "Label status": <div>Label status</div>,
    "Discount code": <div>Discount code</div>,
  };
}
