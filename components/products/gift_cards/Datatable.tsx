"use client";

import Checkbox from "@/components/Checkbox";
import StatusText from "@/components/StatusText";
import { useRouter } from "next/navigation";
import Card from "@/components/Card";
import { Button } from "@/components/ui/button";
import { FilterElements, HeaderItem, RowProps } from "@/types/datatable";
import Datatable from "../../Datatable";
import { GiftCard } from "@/types/giftCard";
import Link from "next/link";
import Text from "@/components/Text";
import { CiStickyNote } from "react-icons/ci";
import { FaCircle } from "react-icons/fa";
import RadioGroupFilterPopover from "../popovers/RadioGroupFilterPopover";
import { useState } from "react";
import StatusFilterPopover from "../popovers/StatusFilterPopover";
import Image from "next/image";
import report from "@/public/ReportSvg.svg";

export default function GiftCardsDatable({
  initialGiftCards,
}: {
  initialGiftCards: GiftCard[];
}) {
  const router = useRouter();

  function MobileRow({ item: gc }: RowProps<GiftCard>) {
    return (
      <Link href={`/products/gift_cards/${gc._id}`} key={gc._id} className="flex bg-white py-4 border-t border-gray-200 w-full gap-2 px-3" >
        <div className="flex flex-col w-full gap-1">
          <Text className="text-gray-800 flex items-center gap-1 text-base">
            {gc.code} <FaCircle size={5} /> <span className="text-sm">{gc.createdAt.substring(0, 10)}</span>
          </Text>
          <div className="flex w-full items-center justify-between">
            <div className="flex flex-col gap-2">
              <Text className="text-gray-500">
                {gc.customer?.firstName ?? "No customer"}
              </Text>
              <StatusText status={gc.status} />
            </div>
            <div className="flex flex-col gap-2">
              <Text className="text-gray-500">$ {gc.initialValue}</Text>
              <Text className="text-gray-500">
                <Image style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                }} src={report} alt="Gift Card" />
              </Text>
            </div>
          </div>
          <Text className="text-gray-500">
            {gc.recipient?.firstName ?? "No recipient"}
          </Text>
        </div>
      </Link>
    );
  }

  function Row({ item: gc, isSelected, setSelected }: RowProps<GiftCard>) {
    return (
      <tr className="bg-white border-b text-gray-800 hover:bg-gray-50 ">
        <td className="w-4 px-4 py-2">
          <Checkbox id={"select-" + gc._id} checked={isSelected} onChange={(e) => setSelected(e.target.checked)} />
        </td>
        <th scope="row" onClick={() => router.push(`/products/gift_cards/${gc._id}`)} className="px-6 flex gap-1 items-center xl:min-w-[240px] py-4 font-medium text-gray-900 whitespace-nowrap cursor-pointer" >
          {gc.code.substring(gc.code.length - 4)}
        </th>
        <td className="px-6 py-2">
          <StatusText status={gc.status} />
        </td>
        <td className="px-6 py-2">
          {gc.customer.firstName} {gc.customer.lastName}
        </td>
        <td className="px-6 py-2">No Recipient</td>
        <td className="px-6 py-2">{gc.createdAt.substring(0, 10)}</td>
        <td className="px-6 py-2">$ {gc.initialValue}</td>
      </tr>
    );
  }


  const [selectedBalance, setSelectedBalance] = useState<string | null>(null)
  const [selectedDateCreated, setSelectedDateCreated] = useState<string | null>(null)
  const [selectedIssueMethod, setSelectedIssueMethod] = useState<string | null>(null)
  const [statuses, setStatuses] = useState<string[]>([])

  const filters = {
    Balance: selectedBalance,
    "Date created": selectedDateCreated,
    "Issue method": selectedIssueMethod,
    "Status": statuses
  }

  const setFilters = {
    Balance: setSelectedBalance,
    "Date created": setSelectedDateCreated,
    "Issue method": setSelectedIssueMethod,
    "Status": setStatuses
  }

  return (
    <Datatable<GiftCard>
      initialItems={initialGiftCards}
      sortPopoverProps={{
        //TODO: fecth new `initialGiftCards` from API
        onSelect: (value) => {
          console.log(value);
        },
        options: [
          { label: "Gift code ending", value: "code" },
          { label: "Customer last name", value: "customer.lastName" },
          { label: "recipient last name", value: "recipient.lastName" },
          { label: "Date created", value: "createdAt" },
          { label: "Date edited", value: "updatedAt" },
          { label: "Expiry date", value: "expiresAt" },
          { label: "Total balance", value: "balance" },
        ],
      }}
      ActionsCard={ActionsCard}
      Row={Row}
      MobileRow={MobileRow}
      headerItems={getHeaderItems(initialGiftCards)}
      views={["all", "redeemable", "full", "partial", "empty", "deactivated"]}
      filters={getAllFilters(filters, setFilters)}
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

function getHeaderItems(giftCards: GiftCard[]): HeaderItem<GiftCard>[] {
  return [
    {
      label: "Code ending",
      sortable: true,
      onSort: (sortKey) => {
        let sortedGiftCards = [...giftCards];
        switch (sortKey) {
          case "desc": sortedGiftCards.sort((a, b) => a.code.localeCompare(b.code)); break;
          case "asc": sortedGiftCards.sort((a, b) => b.code.localeCompare(a.code)); break;
          default: throw new Error("Sort type not allowed");
        }
        return sortedGiftCards;
      },
    },

    { label: "Status", sortable: false },

    {
      label: "Supplier",
      sortable: true,
      onSort: (sortKey) => {
        let sortedGiftCards = [...giftCards];
        switch (sortKey) {
          case "desc":
            sortedGiftCards.sort((a, b) =>
              a.customer.firstName.localeCompare(b.customer.firstName)
            );
            break;
          case "asc":
            sortedGiftCards.sort((a, b) =>
              b.customer.firstName.localeCompare(a.customer.firstName)
            );
            break;
          default:
            throw new Error("Sort type not allowed");
        }
        return sortedGiftCards;
      },
    },

    {
      label: "Recipient",
      sortable: true,
      onSort: (sortKey) => {
        let sortedGiftCards = [...giftCards];
        switch (sortKey) {
          case "desc": sortedGiftCards.sort((a, b) => a.recipient.firstName.localeCompare(b.recipient.firstName)); break;
          case "asc": sortedGiftCards.sort((a, b) => b.recipient.firstName.localeCompare(a.recipient.firstName)); break;
          default: throw new Error("Sort type not allowed");
        }
        return sortedGiftCards;
      },
    },

    {
      label: "Date issued",
      sortable: true,
      onSort: (sortKey) => {
        let sortedGiftCards = [...giftCards];
        switch (sortKey) {
          case "desc":
            sortedGiftCards.sort((a, b) => {
              if (a.createdAt && b.createdAt) {
                return (
                  new Date(a.createdAt).getTime() -
                  new Date(b.createdAt).getTime()
                );
              }
              return 0;
            });
            break;
          case "asc":
            sortedGiftCards.sort((a, b) => {
              if (a.createdAt && b.createdAt) {
                return (
                  new Date(b.createdAt).getTime() -
                  new Date(a.createdAt).getTime()
                );
              }
              return 0;
            });
            break;
          default:
            throw new Error("Sort type not allowed");
        }
        return sortedGiftCards;
      },
    },

    {
      label: "Current / Initial",
      sortable: true,
      onSort: (sortKey) => {
        let sortedGiftCards = [...giftCards];
        switch (sortKey) {
          case "desc": sortedGiftCards.sort((a, b) => a.initialValue - b.initialValue); break;
          case "asc": sortedGiftCards.sort((a, b) => a.initialValue - b.initialValue); break;
          default: throw new Error("Sort type not allowed");
        }
        return sortedGiftCards;
      },
    }
  ];
}

function getAllFilters(filters: any, setFilters: any): FilterElements {

  return {
    Balance: <RadioGroupFilterPopover text="Balance" selectedItem={filters["Balance"]} onChange={setFilters["Balance"]} items={[
      { value: 'full or partial', label: 'Full or partial' },
      { value: 'full', label: 'Full' },
      { value: 'partial', label: 'Partial' },
      { value: 'empty', label: 'Empty' },
    ]} />,
    "Date created": <RadioGroupFilterPopover text="Balance" selectedItem={filters["Date created"]} onChange={setFilters["Date created"]} items={[
      { value: 'last 7 days', label: 'Last 7 days' },
      { value: 'last 30 days', label: 'Last 30 days' },
      { value: 'last 90 days', label: 'Last 90 days' },
      { value: 'last 12 months', label: 'Last 12 months' },
      { value: 'last month', label: 'Last month' },
      { value: 'this month', label: 'This month' },
    ]} />,
    "Issue method": <RadioGroupFilterPopover text="Balance" selectedItem={filters["Issue method"]} onChange={setFilters["Issue method"]} items={[
      { value: 'manually issued', label: 'Manually issued' },
      { value: 'automatically issued', label: 'Automatically issued' },
      { value: 'third-party app', label: 'Third-party app' },
    ]} />,
    "Status": <StatusFilterPopover statuses={['Darft', 'Partial', 'Ordered', 'Received', 'Closed']} selectedStatuses={filters["Status"]} onChange={setFilters["Status"]} />,
  };
}
