"use client";

import Link from "next/link";
import ExportImportButtons from "@/components/products/ExportImportButtons";
import FilledButton from "@/components/buttons/FilledButton";
import { VariantWithContext } from "@/types/product";
import Image from "next/image";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Card from "../../Card";
import { Button } from "../../ui/button";
import {
  ActionCardProps,
  FilterElements,
  HeaderItem,
  RowProps,
} from "@/types/datatable";
import Datatable from "../../Datatable";
import Text from "../../Text";
import { PiImageThin } from "react-icons/pi";
import Checkbox from "../../Checkbox";
import UnavailableInventoryPopover from "./popovers/UnavailableInventoryPopover";
import { getInventoryLevel } from "@/lib/products/utils";
import { Location } from "@/types/location";
import CommittedInventoryPopover from "./popovers/CommittedInventoryPopover";
import InventoryQuantityInput from "./InventoryQuantityInput";
import IncomingInventoryPopover from "./popovers/IncomingInventoryPopover";
import AllLocationsPopover from "@/components/AllLocationsPopover";
import UpdateQuantitiesDialog from "./UpdateQuantitiesDialog";
import { IoIosArrowDown } from "react-icons/io";
import RadioGroupFilterPopover from "../popovers/RadioGroupFilterPopover";
import { SalesChannel } from "@/types/salesChannel";
import { Vendor } from "@/types/vendor";
import TagFilterPopover from "../popovers/TagFilterPopover";
import ArrowRight from "@/public/ArrowRight.svg";

import Incoming from "./modals/Incoming";
import Unavailable from "./modals/Unavailable";
import Committed from "./modals/Commited";
import Available from "./modals/Available";
import OnHand from "./modals/OnHand";

export default function InventoryDatable({
  initialVariants,
  salesChannels,
  vendors,
  productTypes,
  productTags,
  allLocations,
}: {
  initialVariants: VariantWithContext[];
  salesChannels: SalesChannel[];
  vendors: Vendor[];
  productTypes: string[];
  productTags: string[];
  allLocations: Location[];
}) {
  const [variants, setVariants] =
    useState<VariantWithContext[]>(initialVariants);

  const quantities = {
    incoming: 0,
    committed: 0,
    available: 0,
    onHand: 0,
    unavailable: 0,
  };

  const router = useRouter();
  const [selectedLocation, setSelectedLocation] = useState<Location>(
    allLocations[0]
  );

  function MobileRow({ item: v }: RowProps<VariantWithContext>) {
    function QuantityDiv({
      label,
      quantity,
    }: {
      label: string;
      quantity: number;
    }) {
      return (
        <>
          <div className="flex bg-white py-4 border-b flex-col hover:bg-gray-100 rounded-lg">
            <div className="px-2 flex w-full justify-between items-center">
              <Text className="text-gray-800 capitalize">{label}</Text>
              <div className="flex gap-2 items-center">
                <Text className="text-gray-800">{quantity}</Text>
                <Image
                  style={{
                    maxWidth: "100%",
                    maxHeight: "100%",
                  }}
                  src={ArrowRight}
                  alt="Arrow right"
                />
              </div>
            </div>
          </div>
        </>
      );
    }

    return (
      <div className="flex px-4 border-t bg-white border-gray-300 py-4 gap-4 w-full">
        {v.image ? (
          <div className="w-12 h-12 rounded-md overflow-hidden">
            <Image
              src={v.image}
              alt={v.name}
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
        <div className="flex w-full flex-col px-3 gap-6">
          <div className="flex flex-col gap-1">
            <Link
              href={
                v.productId === null
                  ? `/products/${v._id}`
                  : `/products/${v.productId}/variants/${v._id}`
              }
              className="text-gray-800 font-bold text-sm hover:underline"
            >
              {v.title}
            </Link>
            <Text className="text-gray-800 bg-gray-200 px-1 w-min whitespace-nowrap py-0.5 rounded-lg">
              {v.name}
            </Text>
            <Text className="text-gray-500 text-xs">{v.sku ?? "No SKU"}</Text>
          </div>
          <div className="flex flex-col">
            <Incoming />
            <Unavailable />
            <Committed />
            <Available variant={v} />
            <OnHand />
          </div>
        </div>
      </div>
    );
  }

  function Row({
    item: v,
    isSelected,
    setSelected,
  }: RowProps<VariantWithContext>) {
    return (
      <tr
        key={v._id}
        className={`border-b inventory-table-row transition-all ${
          isSelected
            ? "bg-gray-100 hover:bg-gray-200 "
            : "bg-white hover:bg-gray-50 "
        }`}
      >
        <td className="w-4 p-4">
          <Checkbox
            id={"select-" + v._id}
            checked={isSelected}
            label=""
            onChange={(e) => setSelected(e.target.checked)}
          />
        </td>

        <th
          scope="row"
          onClick={() =>
            router.push(
              v.productId === null
                ? `/products/${v._id}`
                : `/products/${v.productId}/variants/${v._id}`
            )
          }
          className="flex gap-1 items-center xl:min-w-[240px] py-4 font-medium text-gray-900 whitespace-nowrap cursor-pointer"
        >
          {v.image && (
            <div className=" aspect-square h-8 bg-gray-200 rounded-md overflow-hidden">
              <Image
                width="32"
                height="32"
                src={v.image}
                alt={v.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="flex flex-col gap-1">
            <Text className="text-gray-800 text-base font-bold">{v.title}</Text>
            <Text className="text-gray-800 bg-gray-200 px-1 py-0.5 w-min whitespace-nowrap rounded-lg">
              {v.name}
            </Text>
          </div>
        </th>

        <td className="px-6 py-2">{v.sku ?? "No SKU"}</td>
        <td className="px-6 py-2">
          <UnavailableInventoryPopover
            inventoryLevel={getInventoryLevel(
              v.inventoryLevels,
              selectedLocation
            )}
          />
        </td>
        <td className="px-6 py-2">
          <CommittedInventoryPopover quantity={quantities.committed} />
        </td>
        <td className="px-6 py-2">
          <InventoryQuantityInput
            value={v.inventoryLevels[0]?.available ?? 0}
            onChange={(e) => {}}
            extendedPopover={true}
          />
        </td>
        <td className="px-6 py-2">
          <InventoryQuantityInput
            value={quantities.onHand}
            onChange={(e) => {}}
          />
        </td>
        <td className="px-6 py-2">
          <IncomingInventoryPopover quantity={quantities.incoming} />
        </td>
      </tr>
    );
  }

  const views = ["all", "active", "draft", "archived", "some", "more"];

  const [selectedSalesChannel, setSelectedSalesChannel] = useState<
    string | null
  >(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [selectedProductType, setSelectedProductType] = useState<string | null>(
    null
  );
  const [selectedVendor, setSelectedVendor] = useState<string | null>(null);

  return (
    <>
      <div className=" mb-8 w-full flex px-4 md:px-0 flex-col-reverse md:flex-row justify-between">
        <div className="font-bold flex flex-col md:flex-row text-[#1a1a1a] text-xl">
          <h1 className="mr-2">Inventory:</h1>
          <AllLocationsPopover
            locations={allLocations}
            selectedLocation={selectedLocation}
            showDefaultOption={false}
            setSelectedLocation={(l) =>
              l
                ? setSelectedLocation(l as Location)
                : setSelectedLocation(allLocations[0])
            }
            button={
              <p className="font-bold text-[#1a1a1a] text-xl flex gap-2 cursor-pointer items-center">
                {selectedLocation.name} <IoIosArrowDown />{" "}
              </p>
            }
          />
        </div>

        <div className=" flex items-start gap-2 self-end">
          <ExportImportButtons />

          <FilledButton>
            <Link href="/products">View Products</Link>
          </FilledButton>
        </div>
      </div>
      <Datatable<VariantWithContext>
        initialItems={initialVariants}
        sortPopoverProps={{
          //TODO: fecth new `initialProducts` from API
          onSelect: (value) => {
            console.log(value);
          },
          options: [
            { label: "Product title", value: "title" },
            { label: "Created", value: "createdAt" },
            { label: "Updated", value: "updatedAt" },
            { label: "Inventory", value: "inventory" },
            { label: "Product type", value: "productType" },
            { label: "Vendor", value: "vendor" },
          ],
        }}
        ActionsCard={ActionsCard}
        Row={Row}
        MobileRow={MobileRow}
        headerItems={getHeaderItems(initialVariants)}
        views={views}
        filters={getAllFilters(
          salesChannels,
          productTags,
          vendors,
          productTypes,
          selectedProductType,
          setSelectedProductType,
          selectedSalesChannel,
          selectedVendor,
          setSelectedVendor,
          selectedTag,
          setSelectedTag,
          setSelectedSalesChannel
        )}
      />
    </>
  );
}

function ActionsCard({
  selectedItems: selectedProducts,
}: ActionCardProps<VariantWithContext>) {
  // TODO: use selectedLocation from context
  const selectedLocation: Location = {
    _id: "1",
    name: "Main warehouse",
    apartment: "Apt 1",
    address: "123 Main St",
    city: "San Francisco",
    country: "USA",
    phone: {
      countryCode: "145",
      number: "1234567890",
    },
    fulfilOrders: true,
    status: "active",
    isDefault: true,
    postalCode: "12345",
    createdAt: new Date().toString(),
    updatedAt: new Date().toString(),
  };

  return (
    <div className="py-4 min-w-full w-full grid bg-white place-items-center">
      <Card className="px-4 py-2 flex gap-2">
        <Button
          variant="ghost"
          className="p-2 bg-gray-200 text-black hover:bg-gray-300 h-min text-xs"
        >
          Bulk edit
        </Button>
        <UpdateQuantitiesDialog
          selectedVariants={selectedProducts}
          selectedLocation={selectedLocation}
          onSave={(res) => {}}
        />
        <Link href={"/products/transfers/new"}>
          <Button
            variant="ghost"
            className="p-2 bg-gray-200 text-black hover:bg-gray-300 h-min text-xs"
          >
            Create transfer
          </Button>
        </Link>
        <Link href="products/purchase_orders/new">
          <Button
            variant="ghost"
            className="p-2 bg-gray-200 text-black hover:bg-gray-300 h-min text-xs"
          >
            Create purchase order
          </Button>
        </Link>
      </Card>
    </div>
  );
}

function getHeaderItems(
  variants: VariantWithContext[]
): HeaderItem<VariantWithContext>[] {
  return [
    {
      label: "Product",
      sortable: true,
      onSort: (sortKey) => {
        let sortedVariants = [...variants];
        switch (sortKey) {
          case "desc":
            sortedVariants.sort((a, b) => a.title.localeCompare(b.title));
            break;
          case "asc":
            sortedVariants.sort((a, b) => b.title.localeCompare(a.title));
            break;
          default:
            throw new Error("Sort type not allowed");
        }
        return sortedVariants;
      },
    },

    {
      label: "SKU",
      sortable: true,
      onSort: (sortKey) => {
        let sortedVariants = [...variants];
        switch (sortKey) {
          case "desc":
            sortedVariants.sort((a, b) =>
              (a.sku ?? "").localeCompare(b.sku ?? "")
            );
            break;
          case "asc":
            sortedVariants.sort((a, b) =>
              (b.sku ?? "").localeCompare(a.sku ?? "")
            );
            break;
          default:
            throw new Error("Sort type not allowed");
        }
        return sortedVariants;
      },
    },

    //TODO: compare actual quantities
    {
      label: "Unavailable",
      sortable: true,
      onSort: (sortKey) => {
        let sortedVariants = [...variants];
        switch (sortKey) {
          case "desc":
            sortedVariants.sort(
              (a, b) =>
                (a.inventoryLevels.reduce(
                  (acc, curr) => acc + curr.unavailable,
                  0
                ) ?? 0) -
                (b.inventoryLevels.reduce(
                  (acc, curr) => acc + curr.unavailable,
                  0
                ) ?? 0)
            );
            break;
          case "asc":
            sortedVariants.sort(
              (a, b) =>
                (b.inventoryLevels.reduce(
                  (acc, curr) => acc + curr.unavailable,
                  0
                ) ?? 0) -
                (a.inventoryLevels.reduce(
                  (acc, curr) => acc + curr.unavailable,
                  0
                ) ?? 0)
            );
            break;
          default:
            throw new Error("Sort type not allowed");
        }
        return sortedVariants;
      },
    },

    {
      label: "Committed",
      sortable: true,
      onSort: (sortKey) => {
        let sortedVariants = [...variants];
        switch (sortKey) {
          case "desc":
            sortedVariants.sort(
              (a, b) =>
                (a.inventoryLevels.reduce(
                  (acc, curr) => acc + curr.committed,
                  0
                ) ?? 0) -
                (b.inventoryLevels.reduce(
                  (acc, curr) => acc + curr.committed,
                  0
                ) ?? 0)
            );
            break;
          case "asc":
            sortedVariants.sort(
              (a, b) =>
                (b.inventoryLevels.reduce(
                  (acc, curr) => acc + curr.committed,
                  0
                ) ?? 0) -
                (a.inventoryLevels.reduce(
                  (acc, curr) => acc + curr.committed,
                  0
                ) ?? 0)
            );
            break;
          default:
            throw new Error("Sort type not allowed");
        }
        return sortedVariants;
      },
    },

    {
      label: "Available",
      sortable: true,
      onSort: (sortKey) => {
        let sortedVariants = [...variants];
        switch (sortKey) {
          case "desc":
            sortedVariants.sort(
              (a, b) =>
                (a.inventoryLevels.reduce(
                  (acc, curr) => acc + curr.available,
                  0
                ) ?? 0) -
                (b.inventoryLevels.reduce(
                  (acc, curr) => acc + curr.available,
                  0
                ) ?? 0)
            );
            break;
          case "asc":
            sortedVariants.sort(
              (a, b) =>
                (b.inventoryLevels.reduce(
                  (acc, curr) => acc + curr.available,
                  0
                ) ?? 0) -
                (a.inventoryLevels.reduce(
                  (acc, curr) => acc + curr.available,
                  0
                ) ?? 0)
            );
            break;
          default:
            throw new Error("Sort type not allowed");
        }
        return sortedVariants;
      },
    },

    {
      label: "On hand",
      sortable: true,
      onSort: (sortKey) => {
        let sortedVariants = [...variants];
        switch (sortKey) {
          case "desc":
            sortedVariants.sort(
              (a, b) =>
                (a.inventoryLevels.reduce(
                  (acc, curr) => acc + curr.onHand,
                  0
                ) ?? 0) -
                (b.inventoryLevels.reduce(
                  (acc, curr) => acc + curr.onHand,
                  0
                ) ?? 0)
            );
            break;
          case "asc":
            sortedVariants.sort(
              (a, b) =>
                (b.inventoryLevels.reduce(
                  (acc, curr) => acc + curr.onHand,
                  0
                ) ?? 0) -
                (a.inventoryLevels.reduce(
                  (acc, curr) => acc + curr.onHand,
                  0
                ) ?? 0)
            );
            break;
          default:
            throw new Error("Sort type not allowed");
        }
        return sortedVariants;
      },
    },

    {
      label: "Incoming",
      sortable: true,
      onSort: (sortKey) => {
        let sortedVariants = [...variants];
        switch (sortKey) {
          case "desc":
            sortedVariants.sort(
              (a, b) =>
                (a.inventoryLevels.reduce(
                  (acc, curr) => acc + curr.incoming,
                  0
                ) ?? 0) -
                (b.inventoryLevels.reduce(
                  (acc, curr) => acc + curr.incoming,
                  0
                ) ?? 0)
            );
            break;
          case "asc":
            sortedVariants.sort(
              (a, b) =>
                (b.inventoryLevels.reduce(
                  (acc, curr) => acc + curr.incoming,
                  0
                ) ?? 0) -
                (a.inventoryLevels.reduce(
                  (acc, curr) => acc + curr.incoming,
                  0
                ) ?? 0)
            );
            break;
          default:
            throw new Error("Sort type not allowed");
        }
        return sortedVariants;
      },
    },
  ];
}

function getAllFilters(
  salesChannels: SalesChannel[],
  tags: string[],
  vendors: Vendor[],
  types: string[],
  selectedProductType: any,
  setSelectedProductType: any,
  selectedSalesChannel: any,
  selectedVendor: any,
  setSelectedVendor: any,
  selectedTag: any,
  setSelectedTag: any,
  setSelectedSalesChannel: any
): FilterElements {
  return {
    "Sales channel": (
      <RadioGroupFilterPopover
        text="Sales channel"
        selectedItem={selectedSalesChannel}
        onChange={(v) => setSelectedSalesChannel(v)}
        items={salesChannels.map((sc) => ({ value: sc._id, label: sc.name }))}
      />
    ),
    "Product type": (
      <RadioGroupFilterPopover
        text="Product type"
        selectedItem={selectedProductType}
        onChange={setSelectedProductType}
        items={types.map((t) => ({ value: t, label: t }))}
      />
    ),
    "Product vendor": (
      <RadioGroupFilterPopover
        text="Product vendor"
        selectedItem={selectedVendor}
        onChange={setSelectedVendor}
        items={vendors.map((v) => ({ value: v._id, label: v.name }))}
      />
    ),
    "Tagged with": (
      <TagFilterPopover
        tags={tags}
        selectedTag={selectedTag}
        onChange={setSelectedTag}
      />
    ),
    Incoming: <div>Incoming</div>,
    Committed: <div>Committed</div>,
    Available: <div>Available</div>,
    "On hand": <div>On hand</div>,
    Unavailable: <div>Unavailable</div>,
  };
}
