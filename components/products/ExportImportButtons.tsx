"use client";

import { MobileHorizontalDotsMajor } from "@shopify/polaris-icons";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import OutlinedButton from "../buttons/OutlinedButton";

import PopoverButton from "../buttons/PopoverButton";

export default function ExportImportButtons() {
  return (
    <>
      <div className="hidden sm:flex gap-2">
        <OutlinedButton className="bg-gray-200 border-none shadow-none hover:!bg-gray-300">
          Export
        </OutlinedButton>
        <OutlinedButton className="bg-gray-200 border-none shadow-none hover:!bg-gray-300">
          Import
        </OutlinedButton>
      </div>

      <Popover>
        <PopoverTrigger className="sm:hidden">
          <MobileHorizontalDotsMajor className="w-7 bg-neutral-200 p-1.5 sm:hidden hover:bg-neutral-200 rounded-lg" />
        </PopoverTrigger>

        <PopoverContent className="w-[100%] p-1.5 rounded-xl">
          <div className="flex flex-col p-0">
            <PopoverButton>Export</PopoverButton>
            <PopoverButton>Import</PopoverButton>
          </div>
        </PopoverContent>
      </Popover>
    </>
  );
}
