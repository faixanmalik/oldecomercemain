import React from "react";
import { PromiseOr, RadioItem } from ".";

interface DataItem {
  _id: string;
}

type View = string;
type FilterElements = { [key: string]: React.ReactNode }

type HeaderItem<T> = {
  label: string;
  sortable: boolean;
  onSort?: (sortKey: SortKey) => PromiseOr<T[]>
}

type SortKey = "asc" | "desc" | "none"

type RowProps<T> = {
  item: T;
  index: number;
  view: View;
  filterElements: FilterElements;
  isSelected: boolean;
  setSelected: (b: boolean) => void;
}
type RowComponent<T> = React.FC<RowProps<T>>

type ActionCardProps<T> = {
  selectedItems: T[];
}
type ActionCardComponent<T> = React.FC<ActionCardProps<T>>

type SortPopoverProps = {
  options: RadioItem[];
  onSelect: (value: string) => void;
}


export type { HeaderItem, DataItem, SortPopoverProps, SortKey as SortKey, ActionCardProps, ActionCardComponent, RowComponent, RowProps, FilterElements, View }

