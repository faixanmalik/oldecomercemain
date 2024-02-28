"use client";

import React from "react";
import { useState, useEffect } from "react";
import Link from "next/link";
import FilledButton from "@/components/buttons/FilledButton";
import EmptyPage from "@/components/EmptyPage";
import DataTable from "@/components/customers/Datatable";
import Heading from "@/components/Heading";
import ExportImportButtons from "@/components/products/ExportImportButtons";
import { Customer } from "@/types/customer";

const DraftOrders = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);

  useEffect(() => {
    const fetchCustomers = async () => {
      const res = await fetch(`api/customers`);
      const data = await res.json();
      setCustomers(data);
    };

    fetchCustomers();
  }, []);

  const handleDelete = async (id: string) => {
    const res: any = await fetch(`api/customers/${id}`, {
      method: "DELETE",
      cache: "no-cache",
    });

    if (res.status === 200) {
      setCustomers(customers.filter((c) => c._id !== id));
    }
  };

  if (customers.length === 0) {
    return (
      <EmptyPage
        heading="Customers"
        title="Everything customers-related in one place"
        text="Manage customer details, see customer order history, and group customers into segments."
        img="/customers-img.svg"
      >
        <Link href="/customers/new">
          <FilledButton>Add Customer</FilledButton>
        </Link>
      </EmptyPage>
    );
  }

  return (
    <div className="md:p-5">
      <div className="flex items-center justify-between mb-5 p-5 pb-0 md:p-0">
        <Heading className="!pb-0">Customers</Heading>
        <div className="flex gap-2">
          <ExportImportButtons />
          <Link href="/customers/new">
            <FilledButton>Add Customer</FilledButton>
          </Link>
        </div>
      </div>
      <DataTable customers={customers} handleDelete={handleDelete} />
    </div>
  );
};

export default DraftOrders;
