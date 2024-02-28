import Text from "@/components/Text";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Location } from "@/types/location";
import React from "react";
import { FaCheck } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";

export default function AllLocationsPopover({
  locations,
  button,
  showDefaultOption = true,
  selectedLocation,
  setSelectedLocation,
}: {
  locations: Location[];
  button?: React.ReactNode;
  showDefaultOption?: boolean;
  selectedLocation: Location | null;
  setSelectedLocation: React.Dispatch<React.SetStateAction<Location | null>>;
}) {
  const [open, setOpen] = React.useState(false);

  function ListItem({ location }: { location: Location | null }) {
    function isChecked(): boolean {
      return selectedLocation === location;
    }

    function handleClick() {
      setSelectedLocation(location);
      setOpen(false);
    }

    return (
      <div
        className={`w-full flex cursor-pointer items-center px-3 py-2 justify-between rounded-md ${
          isChecked()
            ? "bg-gray-200/80 text-neutral-800 font-bold"
            : "hover:bg-gray-200/40 text-neutral-800"
        }`}
        onClick={handleClick}
      >
        {location === null ? (
          <>
            <Text className={`text-gray-800 ${isChecked() ? "font-bold" : ""}`}>
              All locations
            </Text>
            {isChecked() && <FaCheck size={14} />}
          </>
        ) : (
          <>
            <Text className={`text-gray-800 ${isChecked() ? "font-bold" : ""}`}>
              {location.name}
            </Text>
            {isChecked() && <FaCheck size={14} />}
          </>
        )}
      </div>
    );
  }

  return (
    <Popover onOpenChange={setOpen} open={open}>
      <PopoverTrigger asChild>
        {button ? (
          button
        ) : (
          <button
            className="flex items-center gap-1 text-blue-700 hover:underline"
            onClick={() => setOpen((b) => !b)}
          >
            <Text className="text-blue-700">
              {selectedLocation === null
                ? "All locations"
                : selectedLocation.name}
            </Text>
            <IoIosArrowDown size={14} />
          </button>
        )}
      </PopoverTrigger>
      <PopoverContent className=" p-2 min-w-[256px] rounded-xl">
        {showDefaultOption && <ListItem location={null} />}
        {locations.map((l) => (
          <ListItem key={l._id} location={l} />
        ))}
      </PopoverContent>
    </Popover>
  );
}
