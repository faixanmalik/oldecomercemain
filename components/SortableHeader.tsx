import Text from "./Text";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import React from "react";
import { HeaderItem, SortKey } from "@/types/datatable";

export default function SortableHeader<T>({
  header,
  setSortKey,
  sortKey,
  onSort,
}: {
  header: HeaderItem<T>;
  onSort: (sortedItems: T[]) => void;
  setSortKey: React.Dispatch<React.SetStateAction<SortKey>>;
  sortKey: SortKey;
}) {
  return (
    <button
      onClick={() => {
        if (!header.onSort) return;
        if (sortKey === "asc") {
          setSortKey("desc");
          onSort(header.onSort("desc") as T[]);
        } else {
          setSortKey("asc");
          onSort(header.onSort("asc") as T[]);
        }
      }}
      className="flex gap-1 z-20 items-center"
    >
      <Text className="text-gray-800 !text-sm">{header.label}</Text>
      <div className="flex flex-col">
        <IoIosArrowUp
          size={10}
          className={sortKey === "asc" ? "text-gray-800" : "text-gray-400"}
        />
        <IoIosArrowDown
          size={10}
          className={sortKey === "desc" ? "text-gray-800" : "text-gray-400"}
        />
      </div>
    </button>
  );
}
