"use client";

import React, { useState } from "react";

import Card from "@/components/Card";
import Select from "@/components/Select";

import Checkbox from "../../Checkbox";
import StatusText from "../../StatusText";
import { useRouter } from "next/navigation";
import OutlinedButton from "../../buttons/OutlinedButton";
import { Button } from "../../ui/button";
import Text from "../../Text";
import { IoClose, IoSearchOutline } from "react-icons/io5";
import { MdOutlineFilterList } from "react-icons/md";
import SortPopover from "../SortPopover";
import Input from "../../Input";
import FilledButton from "../../buttons/FilledButton";
import AddViewDialog from "../../AddViewDialog";
import SortableHeader from "../../SortableHeader";
import { Order } from "@/types/order";
import AddFilterPopover from "../../AddFilterPopover";
import DraftCard from "./DraftCard";

const orders = [
  {
    _id: "1",
    customer: {
      name: "John Doe",
      email: "jonhdoe@gmail.com",
    },
    total: "$100",
    createdAt: "2021-09-22",
    status: "Draft",
  },
];

const Datatable = () => {
  const views = [
    "All",
    "Open and invoice sent",
    "Open",
    "Invoice sent",
    "Completed",
  ];

  const [selectedView, setSelectedView] = useState(views[0]); // Corrected order of useState arguments

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
    <div className="shadow-sm shadow-black/40 md:rounded-xl">
      <div className=" flex md:rounded-t-xl overflow-x-auto justify-between items-start bg-white px-2 py-1">
        {isSearching ? (
          <div className="flex mr-2 flex-col w-full">
            <div className="flex items-center w-full">
              <Input
                id="search"
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

            <div className="w-full border-t border-gray-300 pt-2 mt-2 mb-1 flex gap-1">
              {filters.map((f) => (
                <Button
                  key={f}
                  variant="outline"
                  className="px-2 rounded-lg h-min py-1 text-gray-800 text-xs hover:bg-gray-200/75"
                  onClick={() => { }}
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
                disabled={[]}
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
                  className={`hover:bg-gray-200/75 px-3 py-1.5 h-min ${v === selectedView ? "bg-gray-200" : "bg-transparent"
                    }`}
                  onClick={() => setSelectedView(v)}
                >
                  <Text className="text-gray-800 capitalize">{v}</Text>
                </Button>
              ))}
              <AddViewDialog onSave={(name) => { }} />
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

      <div>
        <div className="hidden md:flex text-gray-600 font-semibold items-center text-sm justify-between px-4 py-2 bg-gray-100 border-y">
          <div className="flex">
            <Checkbox checked={false} id="selectAll" onChange={() => { }} />
s             <p>Draft order</p>
          </div>
          <p>Status</p>
          <p>Total</p>
        </div>
        {orders.map((order) => (
          <DraftCard
            key={order._id}
            order={order}
            last={order._id === orders[orders.length - 1]._id}
          />
        ))}
      </div>
    </div>
  );
};

export default Datatable;
