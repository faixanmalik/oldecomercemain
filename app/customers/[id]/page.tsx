/* eslint-disable @next/next/no-img-element */
"use client";

import { Customer } from "@/types/customer";
import { Address } from "@/types/address";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";

import Heading from "@/components/Heading";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import Card from "@/components/Card";
import Title from "@/components/Title";

import Input from "@/components/Input";
import { IoIosClose } from "react-icons/io";
import { PiImageThin } from "react-icons/pi";

import CustomerOptionsPopover from "@/components/customers/CustomerOptionsPopover";
import OutlinedButton from "@/components/buttons/OutlinedButton";

import MoreActionsPopover from "@/components/customers/single/MoreActionsPopover";
import EditNotes from "@/components/customers/modals/EditNotes";
import { Order } from "@/types/order";
import FilledButton from "@/components/buttons/FilledButton";
import { CalendarMinor } from "@shopify/polaris-icons";

import Dot from "@/components/Small/Dot";
import HollowDot from "@/components/Small/HollowDot";
import PillTag from "@/components/Small/Pill";

const SingleCustomerPage = () => {
  const { id } = useParams();

  const [customer, setCustomer] = useState<Customer>();
  const [customerOrders, setCustomerOrders] = useState<any>();

  useEffect(() => {
    const fetchCustomer = async () => {
      const res = await fetch(`/api/customers/${id}`);
      const data = await res.json();
      setCustomer(data);
    };

    fetchCustomer();
  }, [id]);

  useEffect(() => {
    const fetchCustomerOrders = async () => {
      const res = await fetch(`/api/get-orders-by/customer/${customer?._id}`);
      const data = await res.json();
      if (data.status === 404) {
        return;
      }
      setCustomerOrders(data);
    };

    fetchCustomerOrders();
  }, [customer?._id]);

  const fullfilled = customerOrders?.fulfillment_status === "Fulfilled";
  const unfulfilled = customerOrders?.fulfillment_status === "Unfulfilled";

  const handleFieldChange = async (field: string, value: any) => {
    const res = await fetch(`/api/customers/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ field: field, value: value }),
    });

    const data = await res.json();
    setCustomer(data);
  };

  const addAddress = async (address: Address) => {
    const res = await fetch(`/api/customers/${id}/address`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ address }),
    });

    const data = await res.json();
    setCustomer(data);
  };

  const editAddress = async (address: Address, idx: number) => {
    const addresses = customer?.addresses || [];
    addresses[idx] = address;

    const res = await fetch(`/api/customers/${id}/address`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ addresses }),
    });

    const data = await res.json();
    setCustomer(data);
  };

  const addTag = async (tag: string) => {
    const res = await fetch(`/api/customers/${id}/tags`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ tag }),
    });

    const data = await res.json();
    setCustomer(data);
  };

  const makeDefault = async (idx: number) => {
    const addresses = customer?.addresses || [];
    const tempAddress = addresses[0];
    addresses[0] = addresses[idx];
    addresses[idx] = tempAddress;

    const res = await fetch(`/api/customers/${id}/address/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ addresses }),
    });

    const data = await res.json();
    setCustomer(data);
  };

  const removeTag = async (tag: string) => {
    const res = await fetch(`/api/customers/${id}/tags`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ tag }),
    });

    const data = await res.json();
    setCustomer(data);
  };

  const editContact = async (contact: any) => {
    const newCustomer = { ...customer };
    newCustomer.email = contact.email;
    newCustomer.phone = contact.phone;
    newCustomer.language = contact.language;
    newCustomer.firstName = contact.firstName;
    newCustomer.lastName = contact.lastName;

    const res = await fetch(`/api/customers/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...newCustomer }),
    });

    const data = await res.json();
    setCustomer(data);
  };

  return (
    <div className="min-h-screen md:p-5 md:w-[100%] lg:px-[20%]">
      <div className="flex flex-col gap-4">
        <div className="flex gap-4 justify-between p-5 md:p-0">
          <div className="flex gap-4">
            <Link href="/customers">
              <FaArrowLeft className="text-xs mt-2.5 text-neutral-800" />
            </Link>
            <div>
              <Heading>{customer?.firstName}</Heading>
              <p className="text-xs text-neutral-500">
                {customer?.addresses[0]?.city}, {customer?.addresses[0].country}{" "}
                • customer for {customer?.createdAt || "1"} days
              </p>
            </div>
          </div>

          <MoreActionsPopover />
        </div>

        {customerOrders && (
          <Card className="px-5 flex gap-4">
            <div className="flex py-5 w-16 md:w-32 items-center text-gray-500 font-medium gap-2">
              <CalendarMinor className="w-6 fill-gray-500" />
              <p className="whitespace-nowrap text-xs">All time</p>
            </div>

            <div className="w-[1px] bg-gray-300"></div>

            <div className="flex-1 py-5">
              <p className="text-xs font-medium text-gray-500">Ammount spent</p>
              <div className="h-[1px] mt-0.5 w-24 border-t-2 border-dotted border-gray-300"></div>
              <p className="font-medium">SAR {customerOrders.total}</p>
            </div>

            <div className="w-[1px] bg-gray-300"></div>

            <div className="flex-1 py-5">
              <p className="text-xs font-medium text-gray-500">Order</p>
              <div className="h-[1px] mt-0.5 w-8 border-t-2 border-dotted border-gray-300"></div>
              <p className="font-medium">{customerOrders.length}</p>
            </div>
          </Card>
        )}

        <Card className="p-5">
          {customerOrders ? (
            <>
              <Title>Last order placed</Title>
              <div className="border text-sm border-gray-300 rounded-lg">
                <div className="border-b flex border-gray-300">
                  <div className="flex w-full p-4 justify-between">
                    <div className="flex items-center gap-2">
                      <p className="hover:underline font-medium text-blue-500">
                        # {customerOrders?._id?.slice(0, 4)}
                      </p>

                      <div className="flex gap-4 items-center">
                        <PillTag
                          bgColor={
                            fullfilled
                              ? ""
                              : unfulfilled
                              ? "bg-gray-300"
                              : "bg-gray-200"
                          }
                        >
                          <Dot />
                          <p className="text-gray-500 text-xs font-semibold">
                            {customerOrders?.payment_status}
                          </p>
                        </PillTag>
                        <PillTag
                          bgColor={
                            fullfilled
                              ? ""
                              : unfulfilled
                              ? "bg-yellow-300"
                              : "bg-orange-200"
                          }
                        >
                          {fullfilled ? (
                            <Dot />
                          ) : (
                            <HollowDot
                              color={
                                unfulfilled
                                  ? "border-[#998a00]"
                                  : "border-orange-700"
                              }
                            />
                          )}

                          <p
                            className={`${
                              fullfilled
                                ? "text-gray-500"
                                : unfulfilled
                                ? "text-yellow-700"
                                : "text-orange-700"
                            } text-xs whitespace-nowrap font-medium`}
                          >
                            {customerOrders?.fulfillment_status
                              ? customerOrders.fulfillment_status
                                  .charAt(0)
                                  .toUpperCase() +
                                customerOrders.fulfillment_status.slice(1)
                              : ""}
                          </p>
                        </PillTag>
                      </div>
                    </div>

                    <p className="font-medium">SAR {customerOrders.total}</p>
                  </div>
                  <p>{customerOrders.date}</p>
                </div>

                {customerOrders.products?.map((product: any, idx: number) => (
                  <div
                    key={idx}
                    className="flex justify-between items-start p-3 text-sm border-b border-gray-300"
                  >
                    <div className="flex gap-2">
                      {product.media?.length > 0 ? (
                        <div className="min-w-10 h-10 rounded-md object-contain overflow-hidden">
                          <img
                            src={product.media[0].url}
                            alt={product.title}
                            style={{ width: "100%", height: "100%" }}
                          />
                        </div>
                      ) : (
                        <Link
                          href={`/products/${product._id}`}
                          className="w-10 h-10 rounded-md overflow-hidden border bg-gray-100 border-gray-300 grid place-items-center"
                        >
                          <PiImageThin size={14} className="text-gray-500" />
                        </Link>
                      )}
                      <div>
                        <Link href={`/products/${product._id}`}>
                          <p className="hover:underline mr-14 text-blue-500 cursor-pointer font-medium">
                            {product.title}
                          </p>
                        </Link>
                      </div>
                    </div>
                    <div className="whitespace-nowrap mr-4">
                      x {product.quantity}
                    </div>
                    <div className="whitespace-nowrap">
                      SAR {product.price && product.quantity * product.price}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-2 pt-4 justify-end">
                <OutlinedButton>
                  <Link href={`/orders/${customerOrders._id}`}>
                    View all orders
                  </Link>
                </OutlinedButton>

                <FilledButton>
                  <Link href={`/orders/new`}>Create order</Link>
                </FilledButton>
              </div>
            </>
          ) : (
            <>
              <Title>Last order placed</Title>
              <p className="text-sm text-gray-500 font-medium">
                This customer has not placed any orders yet
              </p>

              <OutlinedButton className="mt-2">
                <Link href={`/orders/new`}>Create order</Link>
              </OutlinedButton>
            </>
          )}
        </Card>

        <Card className="p-5">
          <div className="flex flex-col gap-4 text-sm text-gray-500 font-medium">
            <div className="flex justify-between">
              <Title className="!mb-0">Customer</Title>
              {customer && (
                <CustomerOptionsPopover
                  customer={customer}
                  addAddress={addAddress}
                  handleFieldChange={handleFieldChange}
                  editAddress={editAddress}
                  editContact={editContact}
                  makeDefault={makeDefault}
                />
              )}
            </div>

            <div className="flex flex-col">
              <Title>Contact Information</Title>
              <p className="text-blue-500 hover:underline cursor-pointer">
                {customer?.email}
              </p>
              <p>{customer?.phone}</p>
              <p>Will receive notifications in English</p>
            </div>

            <div className="flex flex-col">
              <Title>Default Addresses</Title>
              <p>{customer?.addresses[0].address}</p>
              <p>
                {customer?.addresses[0].city},{" "}
                {customer?.addresses[0].postalCode}
              </p>
              <p>{customer?.addresses[0].country}</p>
            </div>

            <div className="flex flex-col">
              <Title>Marketing</Title>
              {customer?.marketing ? (
                <div className="flex gap-2 items-center">
                  <span className="bg-green-700 w-3 h-3 rounded-[5px]" />
                  <p>Email Subscribed</p>
                </div>
              ) : (
                <div className="flex gap-2 items-center">
                  <span className="bg-red-500 w-3 h-3 rounded-full" />
                  <p>Email Unsubscribed</p>
                </div>
              )}

              {customer?.smsMarketing ? (
                <div className="flex gap-2 items-center">
                  <span className="bg-green-700 w-3 h-3 rounded-[5px]" />
                  <p>SMS Subscribed</p>
                </div>
              ) : (
                <div className="flex gap-2 items-center">
                  <span className="bg-red-500 w-3 h-3 rounded-[5px]" />
                  <p>SMS Unsubscribed</p>
                </div>
              )}
            </div>

            <div className="flex flex-col">
              <Title>Tax exemptions</Title>
              {customer?.taxExempt ? <p>Tax exempt</p> : <p>No Exemptions</p>}
            </div>
          </div>
        </Card>

        <Card className="p-5">
          <Input
            id="tags"
            label="Tags"
            placeholder=""
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                console.log(e.currentTarget.value);
                addTag(e.currentTarget.value);
                console.log(customer);
                e.currentTarget.value = "";
              }
            }}
          />

          <div className="flex gap-2">
            {customer?.tags.map((tag) => (
              <div
                key={tag}
                className="bg-slate-200 mt-2 text-gray-900 px-2 py-1 rounded-md text-sm flex items-center gap-1"
              >
                {tag}
                <button
                  onClick={() => {
                    {
                      removeTag(tag);
                    }
                  }}
                >
                  <IoIosClose size={20} />
                </button>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex justify-between">
            <Title>Notes</Title>
            {customer && (
              <EditNotes
                customerNote={customer.note}
                handleFieldChange={handleFieldChange}
              />
            )}
          </div>

          <p className="text-sm text-gray-500">
            {customer?.note || "No notes"}
          </p>
        </Card>
      </div>
    </div>
  );
};

export default SingleCustomerPage;
