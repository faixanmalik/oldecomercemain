"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Checkbox from "@/components/Checkbox";
import { useRouter } from "next/navigation";
import Card from "@/components/Card";
import { Button } from "@/components/ui/button";
import { Collection } from "@/types/collection";
import { FilterElements, HeaderItem, RowProps } from "@/types/datatable";
import Datatable from "../../Datatable";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { useState } from "react";
import Link from "next/link";
import Text from "@/components/Text";
import Image from "next/image";
import { PiImageThin } from "react-icons/pi";
import RadioGroupFilterPopover from "../popovers/RadioGroupFilterPopover";
import { SalesChannel } from "@/types/salesChannel";

export default function Datable({
  initialCollections,
  salesChannels
}: {
  initialCollections: Collection[];
  salesChannels: SalesChannel[];
}) {
  const router = useRouter();

  function MobileRow({ item: c }: RowProps<Collection>) {
    return (
      <Link
        href={`/products/collections/${c._id}`}
        key={c._id}
        className="flex bg-white py-4 border-t border-gray-200 w-full gap-2 px-3"
      >
        {c.image ? (
          <div className="w-12 h-12 rounded-md overflow-hidden">
            <Image
              src={c.image}
              alt={c.title}
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: "100%", height: "100%" }}
            />
          </div>
        ) : (
          <div className="w-12 h-12 rounded-md overflow-hidden border border-gray-300 grid place-items-center">
            <PiImageThin size={14} className="text-gray-500" />
          </div>
        )}

        <div className="flex flex-col gap-1">
          <Text className="text-[#303030] font-medium text-xs hover:underline">{c.title}</Text>
          <Text className="text-gray-500 font-medium text-xs">
            {c.products.length} products
          </Text>
          <Text className="text-gray-500 font-medium text-xs">
            {c.conditions
              .map(
                (condition) =>
                  condition.field +
                  " is " +
                  condition.operator +
                  " " +
                  condition.value
              )
              .join(",\n")}
          </Text>
        </div>
      </Link>
    );
  }

  function Row({ item: c, isSelected, setSelected }: RowProps<Collection>) {
    return (
      <tr className="bg-white border-b hover:bg-gray-50 ">
        <td className="w-4 p-4">
          <Checkbox
            id={"select-" + c._id}
            checked={isSelected}
            onChange={(e) => setSelected(e.target.checked)}
          />
        </td>

        <th
          scope="row"
          onClick={() => router.push(`/products/collections/${c._id}`)}
          className="px-6 flex gap-1 items-center xl:min-w-[240px] py-4 font-medium text-gray-900 whitespace-nowrap  cursor-pointer"
        >
          {c.title}
        </th>
        <td className="px-6 py-4">{c.products.length}</td>
        <td className="px-6 py-4">
          <p className="capitalize">
            {c.conditions
              .map(
                (condition) =>
                  condition.field +
                  " is " +
                  condition.operator +
                  " " +
                  condition.value
              )
              .join(",\n")}
          </p>
        </td>
      </tr>
    );
  }

  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedSalesChannel, setSelectedSalesChannel] = useState<string | null>(null);

  const filters = {
    Type: selectedType,
    "Sales channel": selectedSalesChannel,
  }
  const setFilters = {
    Type: setSelectedType,
    "Sales channel": setSelectedSalesChannel,
  }


  return (
    <Datatable<Collection>
      initialItems={initialCollections}
      sortPopoverProps={{
        //TODO: fecth new `initialCollections` from API
        onSelect: (value) => {
          console.log(value);
        },
        options: [
          { label: "Collection title", value: "title" },
          { label: "Updated", value: "updatedAt" },
        ],
      }}
      ActionsCard={ActionsCard}
      Row={Row}
      MobileRow={MobileRow}
      headerItems={getHeaderItems(initialCollections)}
      views={["all"]}
      filters={getAllFilters(salesChannels, filters, setFilters)}
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
          Bulk edit
        </Button>

        <Button
          variant="ghost"
          className="p-2 bg-gray-200 text-black hover:bg-gray-300 h-min text-xs"
          onClick={() => { }}
        >
          Include in sales channels
        </Button>

        <Button
          variant="ghost"
          className="p-2 bg-gray-200 text-black hover:bg-gray-300 h-min text-xs"
          onClick={() => { }}
        >
          Exclude from sales channels
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
      <PopoverContent className="rounded-xl p-1.5 bg-white flex flex-col">
        <Button
          variant="ghost"
          className="py-1 px-2 flex items-start text-xs text-gray-800 rounded-lg"
        >
          Delete collections
        </Button>
      </PopoverContent>
    </Popover>
  );
}

function getHeaderItems(products: Collection[]): HeaderItem<Collection>[] {
  return [
    {
      label: "Title",
      sortable: true,
      onSort: (sortKey) => {
        let sortedCollections = [...products];
        switch (sortKey) {
          case "desc":
            sortedCollections.sort((a, b) => a.title.localeCompare(b.title));
            break;
          case "asc":
            sortedCollections.sort((a, b) => b.title.localeCompare(a.title));
            break;
          default:
            throw new Error("Sort type not allowed");
        }
        return sortedCollections;
      },
    },

    { label: "Products", sortable: false },
    { label: "Product conditions", sortable: false },
  ];
}

function getAllFilters(salesChannels: SalesChannel[], filters: any, setFilters: any): FilterElements {

  return {
    "Sales channel": <RadioGroupFilterPopover text="Sales channel" selectedItem={filters["Sales channel"]} onChange={setFilters["Sales channel"]} items={salesChannels.map(sc => ({ value: sc._id, label: sc.name }))} />,
    Type: <RadioGroupFilterPopover text="Type" selectedItem={filters["Type"]} onChange={setFilters["Type"]} items={[
      { label: 'Automated', value: 'automated' },
      { label: 'Manual', value: 'manual' },
    ]} />,
  };
}
