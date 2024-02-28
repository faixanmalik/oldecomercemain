"use client";

import Checkbox from "@/components/Checkbox";
import StatusText from "@/components/StatusText";
import { useRouter } from "next/navigation";
import Card from "@/components/Card";
import { Button } from "@/components/ui/button";
import { FilterElements, HeaderItem, RowProps } from "@/types/datatable";
import Datatable from "../../Datatable";
import { Transfer } from "@/types/transfer";
import { FaCircle } from "react-icons/fa";
import Link from "next/link";
import Text from "@/components/Text";
import StatusFilterPopover from "../popovers/StatusFilterPopover";
import TagFilterPopover from "../popovers/TagFilterPopover";
import { useState } from "react";
import SearchItemFilterPopover from "../popovers/SearchItemFilterPopover";
import { Location } from "@/types/location";
import { Supplier } from "@/types/supplier";
import Image from "next/image";
import ArrowDown from "@/public/ArrowDown.svg";

export default function TransfersDatable({ initialTransfers, locations, suppliers, tags }: { initialTransfers: Transfer[], locations: Location[], suppliers: Supplier[], tags: string[] }) {
  const router = useRouter();

  function MobileRow({ item: t }: RowProps<Transfer>) {
    return (
      <Link
        href={`/products/transfers/${t._id}`}
        key={t._id}
        className="flex bg-white py-4 border-t border-gray-200 w-full gap-2 px-3"
      >
        <div className="flex items-center justify-between w-full">
          <div className="flex gap-1 flex-col">
            <Text className="text-gray-800 font-bold text-base">
              #{t.referenceNumber}
            </Text>
            <Text className="text-gray-500 flex items-center gap-1 text-xs">
              {t.origin.name} <FaCircle size={5} className="text-gray-500" />{" "}
              {t.destination.name}
            </Text>
          </div>
          <div className="flex flex-col gap-1 items-end">
            <div className="flex md:hidden items-center rounded-md px-2 py-0.5 gap-2 bg-[#e9e9e9]">
              <span className="rounded-full outline-1 p-1 bg-gray-500"></span>
              <p className="text-gray-500 text-xs">Recieved</p>
            </div>
            <div className="flex flex-row items-center">
              <Text >1 of 1</Text>
              <Image style={{
                maxWidth: "100%",
                maxHeight: "100%",
              }} src={ArrowDown} alt="Arrow Down" />
            </div>
          </div>
        </div>
      </Link>
    );
  }

  function Row({ item: t, isSelected, setSelected }: RowProps<Transfer>) {
    return (
      <tr
        key={t._id}
        className={`border-b transition-all ${isSelected
          ? "bg-gray-100 hover:bg-gray-200 "
          : "bg-white hover:bg-gray-50 "
          }`}
      >
        <td className="w-4 p-4">
          <Checkbox
            id={"select-" + t._id}
            checked={isSelected}
            label=""
            onChange={(e) => setSelected(e.target.checked)}
          />
        </td>

        <th
          scope="row"
          onClick={() => router.push(`/products/transfers/${t._id}`)}
          className="flex gap-1 items-center xl:min-w-[240px] py-4 font-medium text-gray-900 whitespace-nowrap cursor-pointer"
        >
          <p className="ml-4">#{t.referenceNumber}</p>
        </th>

        <td className="px-6 py-2">{t.origin.name}</td>
        <td className="px-6 py-2">{t.destination.name}</td>
        <td className="px-6 py-2">
          <StatusText status={t.status} />
        </td>
        <td className="px-6 py-2">0 of 0</td>
        <td className="px-6 py-2">
          {t.shipping.arrivalDate
            ? new Date(t.shipping.arrivalDate).toISOString().slice(0, 10)
            : ""}
        </td>
      </tr>
    );
  }

  const [statuses, setStatuses] = useState<string[]>([])
  const [selectedTag, setSelectedTag] = useState<string | null>(null)

  const filters = {
    "Status": statuses,
    "Tagged with": selectedTag,
  }
  const setFilters = {
    "Status": setStatuses,
    "Tagged with": setSelectedTag,
  }

  return (
    <Datatable<Transfer>
      initialItems={initialTransfers}
      sortPopoverProps={{
        //TODO: fecth new `initialTransfers` from API
        onSelect: (value) => {
          console.log(value);
        },
        options: [
          { label: "Created", value: "createdAt" },
          { label: "Expected arrival date", value: "shipping.arrivalDate" },
          { label: "Origin", value: "origin.name" },
          { label: "Destination", value: "destination.name" },
          { label: "Status", value: "status" },
        ],
      }}
      ActionsCard={ActionsCard}
      Row={Row}
      MobileRow={MobileRow}
      headerItems={getHeaderItems(initialTransfers)}
      views={["all", "active", "draft", "archived"]}
      filters={getAllFilters(suppliers, tags, locations, filters, setFilters)}
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
          Add tags
        </Button>
        <Button
          variant="ghost"
          className="p-2 bg-gray-200 text-black hover:bg-gray-300 h-min text-xs"
          onClick={() => { }}
        >
          Remove tags
        </Button>
      </Card>
    </div>
  );
}

function getHeaderItems(products: Transfer[]): HeaderItem<Transfer>[] {
  return [
    {
      label: "Transfer",
      sortable: true,
      onSort: (sortKey) => {
        let sortedTransfers = [...products];
        switch (sortKey) {
          case "desc":
            sortedTransfers.sort((a, b) =>
              a.referenceNumber.localeCompare(b.referenceNumber)
            );
            break;
          case "asc":
            sortedTransfers.sort((a, b) =>
              b.referenceNumber.localeCompare(a.referenceNumber)
            );
            break;
          default:
            throw new Error("Sort type not allowed");
        }
        return sortedTransfers;
      },
    },
    {
      label: "Origin",
      sortable: true,
      onSort: (sortKey) => {
        let sortedTransfers = [...products];
        switch (sortKey) {
          case "desc":
            sortedTransfers.sort((a, b) =>
              a.origin.name.localeCompare(b.origin.name)
            );
            break;
          case "asc":
            sortedTransfers.sort((a, b) =>
              b.origin.name.localeCompare(a.origin.name)
            );
            break;
          default:
            throw new Error("Sort type not allowed");
        }
        return sortedTransfers;
      },
    },

    {
      label: "Destination",
      sortable: true,
      onSort: (sortKey) => {
        let sortedTransfers = [...products];
        switch (sortKey) {
          case "desc":
            sortedTransfers.sort((a, b) =>
              a.destination.name.localeCompare(b.destination.name)
            );
            break;
          case "asc":
            sortedTransfers.sort((a, b) =>
              b.destination.name.localeCompare(a.destination.name)
            );
            break;
          default:
            throw new Error("Sort type not allowed");
        }
        return sortedTransfers;
      },
    },

    {
      label: "Status",
      sortable: true,
      onSort: (sortKey) => {
        let sortedTransfers = [...products];
        switch (sortKey) {
          case "desc":
            sortedTransfers.sort((a, b) => a.status.localeCompare(b.status));
            break;
          case "asc":
            sortedTransfers.sort((a, b) => b.status.localeCompare(a.status));
            break;
          default:
            throw new Error("Sort type not allowed");
        }
        return sortedTransfers;
      },
    },

    { label: "Recieved", sortable: false },

    {
      label: "Expected arrival",
      sortable: true,
      onSort: (sortKey) => {
        let sortedTransfers = [...products];
        switch (sortKey) {
          case "desc":
            sortedTransfers.sort((a, b) => {
              if (a.shipping.arrivalDate && b.shipping.arrivalDate) {
                return (
                  new Date(a.shipping.arrivalDate).getTime() -
                  new Date(b.shipping.arrivalDate).getTime()
                );
              }
              return 0;
            });
            break;
          case "asc":
            sortedTransfers.sort((a, b) => {
              if (a.shipping.arrivalDate && b.shipping.arrivalDate) {
                return (
                  new Date(b.shipping.arrivalDate).getTime() -
                  new Date(a.shipping.arrivalDate).getTime()
                );
              }
              return 0;
            });
            break;
          default:
            throw new Error("Sort type not allowed");
        }
        return sortedTransfers;
      },
    },
  ];
}

function getAllFilters(suppliers: Supplier[], tags: string[], locations: Location[], filters: any, setFilters: any): FilterElements {

  return {
    "Status": <StatusFilterPopover statuses={['Darft', 'Partial', 'Ordered', 'Received', 'Closed']} selectedStatuses={filters["Status"]} onChange={setFilters["Status"]} />,
    "Supplier": <SearchItemFilterPopover items={suppliers.map(s => ({ _id: s._id, name: s.name }))} listHeading="Suppliers" selectedItem={null} onChange={() => { }} />,
    "Tagged with": <TagFilterPopover tags={tags} selectedTag={filters["Tagged with"]} onChange={setFilters["Status"]} />,
    "Destination": <SearchItemFilterPopover items={locations.map(s => ({ _id: s._id, name: s.name }))} listHeading="Suppliers" selectedItem={null} onChange={() => { }} />,
  };
}
