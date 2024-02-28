"use client";

import { Order } from "@/types/order";
import Card from "../Card";
import Image from "next/image";
import Link from "next/link";
import { PiImageThin } from "react-icons/pi";
import FilledButton from "../buttons/FilledButton";
import { useState } from "react";
import Input from "../Input";
import { IoIosClose } from "react-icons/io";
import AddNotesModal from "../modals/general/AddNotesModal";
import MoreOptionsProducts from "./popovers/MoreOptionsProducts";
import OutlinedButton from "../buttons/OutlinedButton";
import AddTracking from "./modals/AddTracking";
import EditShippingAddress from "./modals/EditShippingAddress";
import EditContact from "./modals/EditContact";
import Select from "../Select";
import {
  UnfulfilledMajor,
  FulfillmentOnHoldMajor,
  ShipmentMajor,
  ReceiptMajor,
} from "@shopify/polaris-icons";
import Checkbox from "../Checkbox";
import PillTag from "../Small/Pill";
import { Timeline } from "../timeline/Timeline";
import CustomerPopover from "../popovers/Customer";
import { Cross, XIcon } from "lucide-react";

export default function EditOrderForm({
  order,
  setOrder,
}: {
  order: Order;
  setOrder: any;
}) {
  const [holdFulfillment, setHoldFulfillment] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const fullfilled = order?.fulfillment_status === "Fulfilled";
  const unfulfilled = order?.fulfillment_status === "Unfulfilled";
  const holdFulfillmentStatus = order?.fulfillment_status === "On hold";

  const handleSelectProduct = (id: string) => {
    if (selectedProducts.includes(id)) {
      setSelectedProducts(selectedProducts.filter((p) => p !== id));
    } else {
      setSelectedProducts([...selectedProducts, id]);
    }
  };

  const handleFieldChange = async (field: string, value: any) => {
    const res = await fetch(`/api/orders/${order._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ field: field, value: value }),
    });

    const data = await res.json();
    setOrder({ ...order, [field]: data[field] });
  };

  const addTag = async (tag: string) => {
    const tags = [...(order.tags ?? []), tag];
    handleFieldChange("tags", tags);
  };

  const removeTag = async (tag: string) => {
    const tags = order.tags?.filter((t) => t !== tag);
    handleFieldChange("tags", tags);
  };

  const formatDate = (date: any) => {
    const dt = new Date(date);
    const day = dt.getDate();
    const month = dt.toLocaleString("default", { month: "long" });

    let suffix = "th";
    if (day % 10 === 1 && day !== 11) {
      suffix = "st";
    } else if (day % 10 === 2 && day !== 12) {
      suffix = "nd";
    } else if (day % 10 === 3 && day !== 13) {
      suffix = "rd";
    }

    return `${day}${suffix} ${month}, ${dt.getFullYear()}`;
  };

  const dateToShow = order?.fulfillment_date
    ? formatDate(order.fulfillment_date)
    : formatDate(new Date());

  return (
    <div className="flex flex-col sm:flex-row gap-6">
      <div className="flex-1 flex flex-col gap-6">
        <Card className="p-4 flex flex-col gap-4">
          <div className="flex justify-between">
            <div
              className={`flex items-center font-normal rounded-lg p-1 px-2 gap-2 ${
                fullfilled
                  ? "bg-green-200"
                  : unfulfilled
                  ? "bg-yellow-300"
                  : "bg-orange-200"
              }`}
            >
              {fullfilled ? (
                <ShipmentMajor className={`fill-green-700 w-5`} />
              ) : unfulfilled ? (
                <UnfulfilledMajor className={`fill-yellow-700 w-5`} />
              ) : (
                <FulfillmentOnHoldMajor className={`fill-orange-700 w-5`} />
              )}
              <p
                className={`text-xs font-medium ${
                  fullfilled
                    ? "text-green-700"
                    : unfulfilled
                    ? "text-yellow-700"
                    : "text-orange-700"
                }`}
              >
                {order?.fulfillment_status
                  ? order.fulfillment_status.charAt(0).toUpperCase() +
                    order.fulfillment_status.slice(1)
                  : ""}{" "}
                (1)
              </p>
            </div>

            {!holdFulfillmentStatus && (
              <MoreOptionsProducts
                fulfillment_status={order.fulfillment_status || "unfulfilled"}
                setHoldFulfillment={setHoldFulfillment}
                handleFieldChange={handleFieldChange}
              />
            )}
          </div>

          <div className="border border-gray-200 rounded-lg">
            <div className="p-3 border-b text-[0.75em] border-gray-200 text-gray-700">
              <div className="hidden sm:block">
                <p className="text-gray-500">Location</p>
                <p>{order.customer?.addresses[0].address}</p>
              </div>

              {fullfilled && (
                <>
                  <p className="text-gray-500 mt-2">Fullfilled</p>
                  <p>{dateToShow}</p>
                </>
              )}
            </div>

            {!holdFulfillment &&
              order.products?.map((product: any, idx) => (
                <div
                  key={product._id}
                  className={`flex justify-between items-start p-3 text-[0.8em] ${
                    idx !== order.products.length - 1
                      ? "border-b border-gray-200"
                      : ""
                  }`}
                >
                  <div className="flex gap-2">
                    {product.media?.length > 0 ? (
                      <div className="w-10 h-10 rounded-xl overflow-hidden">
                        <Image
                          src={product.media[0].url}
                          alt={product.title}
                          width={0}
                          height={0}
                          sizes="100vw"
                          style={{ width: "100%", height: "100%" }}
                          objectFit="contain"
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
                    <div className="w-[65%]">
                      <Link href={`/products/${product._id}`}>
                        <p className="hover:underline text-blue-600 cursor-pointer font-semibold">
                          {product.title.length > 40
                            ? product.title.slice(0, 40) + "..."
                            : product.title}
                        </p>
                      </Link>
                      <PillTag bgColor="bg-gray-200 my-1.5">
                        <p className="text-gray-500 text-xs font-medium">30</p>
                      </PillTag>
                      <p>
                        SAR {product.price} x {product.quantity}
                      </p>
                    </div>
                  </div>
                  <div className="hidden sm:block">
                    SAR {product.price} x {product.quantity}
                  </div>
                  <div className="whitespace-nowrap">
                    SAR {product.price && product.quantity * product.price}
                  </div>
                </div>
              ))}

            {holdFulfillment &&
              order.products?.map((product: any, idx) => (
                <div
                  key={product._id}
                  className={`flex items-center p-3 text-sm ${
                    idx !== order.products.length - 1
                      ? "border-b border-gray-300"
                      : ""
                  }hover:bg-gray-100 cursor-pointer
                  ${
                    selectedProducts.includes(product._id) ? "bg-gray-100" : ""
                  }`}
                >
                  <div className={`flex justify-center items-center mr-2`}>
                    <Checkbox
                      id="product"
                      checked={selectedProducts.includes(product._id)}
                      onChange={() => handleSelectProduct(product._id)}
                    />
                  </div>
                  <div className="flex gap-2">
                    {product.media?.length > 0 ? (
                      <div className="w-10 h-10 rounded-xl overflow-hidden">
                        <Image
                          src={product.media[0].url}
                          alt={product.title}
                          width={0}
                          height={0}
                          sizes="100vw"
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
                        <p className="hover:underline text-blue-500 cursor-pointer font-medium">
                          {product.title.length > 15
                            ? product.title.slice(0, 15) + "..."
                            : product.title}
                        </p>
                      </Link>
                      <p>
                        SAR {product.price} x {product.quantity}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
          </div>

          {holdFulfillment && (
            <div>
              <p className="text-gray-800 font-medium py-1 text-sm flex justify-between">
                Hold reason
              </p>

              <Select
                options={[
                  {
                    label: "Select the reason for holding this order",
                    value: "",
                    disabled: true,
                  },
                  { label: "Inventory out of stock", value: "out_of_stock" },
                  { label: "Address incorrect", value: "incorrect_address" },
                  { label: "High risk of fraud", value: "risk_of_fraud" },
                  { label: "Awaiting payment", value: "awaiting_payment" },
                  { label: "Other", value: "other" },
                ]}
                onChange={(e) => {
                  console.log("meow");
                }}
              />
              <p className="text-sm pt-1 text-gray-500">
                Only you and your staff can see this reason.
              </p>
            </div>
          )}

          <div
            className={`flex justify-end ${
              holdFulfillment ? "" : "hidden"
            } gap-2`}
          >
            <OutlinedButton onClick={() => setHoldFulfillment(false)}>
              Cancel
            </OutlinedButton>
            <FilledButton
              onClick={() => {
                handleFieldChange("fulfillment_status", "On hold");
                setHoldFulfillment(false);
              }}
            >
              Hold fulfillment
            </FilledButton>
          </div>

          <div
            className={`flex justify-end ${holdFulfillment ? "hidden" : ""}`}
          >
            {fullfilled ? (
              <AddTracking />
            ) : unfulfilled ? (
              <Link href={`/orders/${order._id}/fulfill`}>
                <FilledButton>Fulfill item</FilledButton>
              </Link>
            ) : (
              <FilledButton
                onClick={() => {
                  handleFieldChange("fulfillment_status", "Unfulfilled");
                }}
              >
                Release fulfillment
              </FilledButton>
            )}
          </div>
        </Card>

        <Card className="p-4 flex flex-col gap-4">
          <div className="flex">
            <div className="flex items-center rounded-lg p-1 px-2 gap-2 bg-gray-200">
              <ReceiptMajor className="fill-gray-500 w-5" />
              <p className="text-gray-500 text-xs font-medium">
                {order?.payment_status}
              </p>
            </div>
          </div>

          <div className="border border-gray-200 rounded-lg">
            <div className="flex justify-between items-start p-3 text-sm border-b border-gray-200 ">
              <div className="flex flex-col gap-2">
                <p>Subtotal</p>
                <p>Tax</p>
                <p className="font-semibold">Total</p>
              </div>

              <div className="flex flex-col gap-2">
                <p>{order.products?.length}</p>
                <p>VAT 15%</p>
                <p className="font-semibold"></p>
              </div>

              <div className="flex flex-col gap-2">
                <p>SAR {order.subtotal}</p>
                <p>SAR {order.tax?.tax || 0}</p>
                <p className="font-semibold">SAR {order.total}</p>
              </div>
            </div>

            <div className="p-3 flex justify-between text-sm text-gray-700">
              <p>Paid by customer</p>
              <p>SAR {order.total}</p>
            </div>
          </div>
        </Card>

        <div className="hidden md:block">
          <Timeline />
        </div>
      </div>

      <div className="flex flex-col sm:w-64 gap-6">
        <Card className="p-4 text-sm text-gray-600">
          <p className="text-gray-800 font-medium py-1 flex justify-between">
            Notes{" "}
            <AddNotesModal
              defaultValue={order.note}
              onSave={(note) => {
                handleFieldChange("note", note);
              }}
            />
          </p>

          <p>{order.note ? order.note : "No notes from customer"}</p>
        </Card>

        <Card className="p-4">
          <div className="flex gap-4 flex-col justify-between text-sm text-gray-600">
            <div>
              <div className="flex items-center justify-between">
                <p className="text-gray-800 font-medium py-1">Customer</p>
                {order.customer && (
                  <XIcon
                    className="text-gray-500 w-4 cursor-pointer"
                    onClick={() => {
                      handleFieldChange("customer", null);
                    }}
                  />
                )}
              </div>
              {!order.customer ? (
                <CustomerPopover
                  handleCustomerChange={(customer: any) => {
                    handleFieldChange("customer", customer._id);
                  }}
                />
              ) : (
                <>
                  <Link href={`/customers/${order.customer?._id}`}>
                    <p className=" hover:underline cursor-pointer text-blue-600">
                      {order.customer?.firstName} {order.customer?.lastName}
                    </p>
                  </Link>
                  <p className="">{order.customer?.email}</p>
                </>
              )}
            </div>

            <div>
              <p className="text-gray-800 font-medium py-1 flex items-center justify-between">
                Contact information
                <EditContact
                  customer={order.customer}
                  setCustomer={(customer: any) => {
                    setOrder({ ...order, customer: customer });
                  }}
                />
              </p>
              <p className="">{order.customer?.email}</p>
              <p className="">{order.customer?.phone}</p>
            </div>

            <div>
              <p className="text-gray-800 font-medium py-1 flex items-center justify-between">
                Shipping address
                <EditShippingAddress
                  oldAddress={order.customer?.addresses[0]}
                  editAddress={(address: any, idx: number) => {
                    handleFieldChange("customer.addresses.0", address);
                  }}
                  idx={0}
                />
              </p>
              <p className="">{order.customer?.addresses[0]?.address}</p>
              <p className="">{order.customer?.addresses[0]?.city}</p>
              <p className="pb-2">{order.customer?.addresses[0]?.country}</p>
              <a
                className="text-blue-500 underline font-semibold"
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  order.customer?.addresses[0]?.address
                )}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                View map
              </a>
            </div>

            <div>
              <p className="text-gray-800 font-medium py-1">Billing address</p>
              <p className="text-gray-500">Same as shipping address</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <p className="text-gray-800 text-sm font-medium py-1">
            Conversion sumarry
          </p>

          <p className="text-sm text-gray-500">
            There aren‘t any conversion details available for this order.
          </p>
        </Card>

        <Card className="p-4">
          <p className="text-gray-800 text-sm font-medium py-1">Tags</p>
          <Input
            id="tags"
            placeholder=""
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addTag(e.currentTarget.value);
                e.currentTarget.value = "";
              }
            }}
          />

          <div className="flex flex-wrap gap-2">
            {order.tags?.map((tag: any) => (
              <div
                key={tag}
                className="bg-slate-200 mt-2 text-gray-900 px-2 py-1 rounded-md text-sm flex items-center gap-1"
              >
                {tag}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    removeTag(tag);
                  }}
                >
                  <IoIosClose size={20} />
                </button>
              </div>
            ))}
          </div>
        </Card>

        <div className="md:hidden">
          <Timeline />
        </div>
      </div>
    </div>
  );
}
