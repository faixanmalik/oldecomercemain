"use client";
import { useState, useRef } from "react";
import Input from "../Input";

import { FaPlus } from "react-icons/fa";

import NewCustomer from "../customers/modals/NewCustomer";

import { Customer } from "@/types/customer";

const CustomerPopover = ({
  handleCustomerChange,
}: {
  handleCustomerChange: any;
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Customer[]>([]);
  const [popoverPosition, setPopoverPosition] = useState({ top: 0, left: 0 });
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const searchTimeout = useRef<NodeJS.Timeout | null>(null);

  const searchCustomers = async (query: string) => {
    const response = await fetch(`/api/customers/search/${query}`);
    const customers: any[] = await response.json();

    console.log(customers);

    setSearchResults(customers);
    setIsPopoverOpen(true);
  };

  const handleSearch = (value: any) => {
    setSearchQuery(value);
    if (value.trim() === "") {
      setSearchResults([]);
      setIsPopoverOpen(false);
    } else {
      if (searchTimeout.current) {
        clearTimeout(searchTimeout.current);
      }
      searchTimeout.current = setTimeout(() => {
        searchCustomers(value);
      }, 800);
    }
  };

  const handleAddCustomer = () => {
    // TODO: Add logic to handle adding a new customer
  };

  const handleInputFocus = () => {
    const inputElement = document.getElementById("searchInput");
    if (inputElement) {
      const inputRect = inputElement.getBoundingClientRect();
      setPopoverPosition({
        top: inputRect.bottom + window.scrollY + 5,
        left: inputRect.left + window.scrollX,
      });
      setIsPopoverOpen(true);
    }
  };

  return (
    <div className="relative">
      <Input
        id="searchInput"
        placeholder="Search for a customer"
        value={searchQuery}
        onChange={(e: any) => handleSearch(e.target.value)}
      />

      {isPopoverOpen && (
        <div
          className="absolute mt-10 rounded-lg w-full bg-white border border-gray-300 shadow-md z-10"
          style={{ top: popoverPosition.top, left: popoverPosition.left }}
        >
          <div className="flex flex-col text-sm rounded-lg text-gray-700">
            <NewCustomer />
            <div className="h-[1px] bg-gray-300"></div>
            {searchResults.length > 0 && (
              <div className="flex flex-col gap-3 py-3 m-1.5 rounded-lg hover:bg-gray-100 cursor-pointer">
                {searchResults.map((customer) => (
                  <div
                    key={customer._id}
                    onClick={() => {
                      handleCustomerChange(customer);
                      setIsPopoverOpen(false);
                    }}
                    className="pl-3"
                  >
                    <p className="font-medium">
                      {customer.firstName} {customer.lastName}
                    </p>

                    <p>{customer.email}</p>
                  </div>
                ))}
              </div>
            )}
            {searchResults.length === 0 && (
              <div className="p-3">No customers found</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerPopover;
