import { useState, useEffect, useRef } from "react";
import Image from "next/image";

import { FaArrowUp, FaArrowDown } from "react-icons/fa";

export function SortPopover() {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("last_update");
  const [sortOrder, setSortOrder] = useState("asc");

  const radioOptions = [
    { value: "last_update", label: "Last Update" },
    { value: "amount_spent", label: "Amount Spent" },
    { value: "total_orders", label: "Total Orders" },
    { value: "last_order_date", label: "Last order date" },
    { value: "first_order_date", label: "First order date" },
    { value: "date_as_customer", label: "Date added as customer" },
    { value: "last_abandoned_order", label: "Last abandoned order date" },
  ];

  const handleChange = (e: any) => {
    setSelectedOption(e.target.value);
    // setIsPopoverOpen(false);
  };

  const popoverRef = useRef<HTMLDivElement>(null);

  const closePopover = (e: any) => {
    if (popoverRef.current && !popoverRef.current.contains(e.target)) {
      setIsPopoverOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mouseup", closePopover);
    return () => {
      document.removeEventListener("mouseup", closePopover);
    };
  }, []);

  const togglePopover = () => {
    setIsPopoverOpen((prevState) => !prevState);
  };

  return (
    <div className="inline-block overflow-visible">
      <button
        onClick={togglePopover}
        className="p-0.5 rounded-md border shadow-xs focus:shadow-lg focus:bg-neutral-200 shadow-neutral-500/50"
      >
        <Image
          src="/BothArrows.svg"
          alt="Plus button Image"
          width={20}
          height={20}
        />
      </button>
      {isPopoverOpen && (
        <div
          ref={popoverRef}
          className="z-50 absolute right-4 mt-2 bg-white border border-neutral-300 rounded-2xl shadow-lg"
        >
          <div className="p-3">
            <p className="text-sm font-normal text-neutral-600">Sort by</p>
            <div className="flex flex-col items-start gap-2 pt-3">
              {radioOptions.map((option) => (
                <label
                  key={option.value}
                  className="flex items-center text-[1.1em] space-x-2.5 text-neutral-600"
                >
                  <input
                    type="radio"
                    value={option.value}
                    checked={selectedOption === option.value}
                    onChange={handleChange}
                    className="appearance-none border border-neutral-400 rounded-full h-[15px] w-[15px] 
                    checked:w-[10px] checked:h-[10px] hover:border-neutral-600 checked:border-none
                    checked:bg-white checked:border-transparent checked:ring-[4px]
                    checked:ring-neutral-800 focus:outline-none checked:mx-[2.5px]"
                  />

                  <span>{option.label}</span>
                </label>
              ))}
            </div>

            <div className="flex flex-col items-start mt-4">
              <span
                onClick={() => setSortOrder("asc")}
                className={`flex cursor-pointer items-center text-gray-700 py-1 rounded-md pl-1 w-full ${sortOrder === "asc" ? "bg-neutral-50" : ""
                  }`}
              >
                <FaArrowUp
                  className={`inline-block mr-2 ${sortOrder === "asc" ? "text-blue-500" : "text-gray-500"
                    }`}
                />
                <span
                  className={`text-sm ${sortOrder === "asc" ? "text-blue-500" : ""
                    }`}
                >
                  Oldest to newest
                </span>
              </span>

              <span
                onClick={() => setSortOrder("desc")}
                className={`flex cursor-pointer items-center text-gray-700 py-1 rounded-md pl-1 w-full ${sortOrder === "desc" ? "bg-neutral-50" : ""
                  }`}
              >
                <FaArrowDown
                  className={`inline-block mr-2 ${sortOrder === "desc" ? "text-blue-500" : "text-gray-500"
                    }`}
                />
                <span
                  className={`text-sm ${sortOrder === "desc" ? "text-blue-500" : ""
                    }`}
                >
                  Newest to oldest
                </span>
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SortPopover;
