/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useEffect, useState } from "react";

import SectionTitle from "@/components/SectionTitle";
import InputSearch from "@/components/InputSearch";
import Heading from "@/components/Heading";

import Link from "next/link";

import { CustomItem } from "@/types/customItem";

import { FaArrowLeft } from "react-icons/fa";
import { IoIosClose } from "react-icons/io";
import AddCustomItem from "@/components/modals/orders/AddCustomItem";

import { FaTrashCan } from "react-icons/fa6";
import Input from "@/components/Input";
import Card from "@/components/Card";
import AddNotesModal from "@/components/modals/general/AddNotesModal";
import CustomerPopover from "@/components/popovers/Customer";
import BrowseProductsDialog from "@/components/BrowseProductsDialog";
import FilledButton from "@/components/buttons/FilledButton";
import {
  ApiOrder,
  ApiOrderSchema,
  Discount,
  Tax,
  Shipping,
} from "@/types/order";
import toast from "react-hot-toast";
import axios from "axios";
import { ZodError } from "zod";
import Spinner from "@/components/Spinner";
import { Customer } from "@/types/customer";
import { ApiProduct, Product } from "@/types/product";
import OutlinedButton from "@/components/buttons/OutlinedButton";
import CollectPaymentPopover from "@/components/orders/popovers/CollectPayment";
import AddDiscount from "@/components/orders/modals/AddDiscount";

import ItemTile from "@/components/orders/new/ItemTile";
import ProductTile from "@/components/orders/new/ProductTile";
import AddShipping from "@/components/orders/modals/AddShipping";
import TaxPopover from "@/components/orders/popovers/Tax";
import Checkbox from "@/components/Checkbox";
import Select from "@/components/Select";

import { useHeaderStore, HeaderStoreType } from "@/store/HeaderStore";

const OrdersPage = () => {
  const { setHandleSave, setHandleDiscard, setText, setDisabledSave } =
    useHeaderStore((state: unknown) => state as HeaderStoreType);

  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState<ApiOrder>(defaultOrder);
  const [products, setProducts] = useState<Product[]>([]);
  const [variants, setVariants] = useState<any[]>([])
  const [customer, setCustomer] = useState<Customer>();

  const [editDiscount, setEditDiscount] = useState(false);
  const [editShipping, setEditShipping] = useState(false);

  const [paymentDueLater, setPaymentDueLater] = useState(false);

  const show =
    (order.customItems && order.customItems.length > 0) ||
    (order.products && order.products.length > 0);

  const [subtotal, setSubtotal] = useState(0.0);
  const [total, setTotal] = useState(0.0);
  const [tax, setTax] = useState<Tax>({
    charges_tax: true,
    tax: 0.0,
  });
  const [shipping, setShipping] = useState<Shipping>({
    price: 0,
    name: "",
  });
  const [discount, setDiscount] = useState<Discount>({
    type: "amount",
    discount: 0,
  });

  useEffect(() => {
    if (discount.discount && discount.discount > 0) {
      setEditDiscount(true);
    } else {
      setEditDiscount(false);
    }
  }, [discount.discount]);

  useEffect(() => {
    if (shipping.price && shipping.price > 0) {
      setEditShipping(true);
    } else {
      setEditShipping(false);
    }
  }, [shipping.price]);

  useEffect(() => {
    if (discount.type === "percentage" && discount.value) {
      setDiscount({
        ...discount,
        discount: (subtotal / 100) * discount.value,
      });
    } else if (discount.type === "amount" && discount.value) {
      setDiscount({
        ...discount,
        discount: discount.value,
      });
    }
  }, [discount.value, discount.type]);

  useEffect(() => {
    const newSubtotal =
      products.reduce((acc, curr) => acc + (curr.price ? curr.price : 0), 0) +
      order.customItems.reduce(
        (acc, curr) => acc + (curr.price ? curr.price : 0),
        0
      );

    setSubtotal(Number(newSubtotal.toFixed(2)));
  }, [products, order.customItems]);

  useEffect(() => {
    if (!tax.charges_tax) {
      setTax({
        ...tax,
        tax: 0,
      });
    } else {
      setTax({
        ...tax,
        tax: Number((subtotal * 0.15).toFixed(2)),
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tax.charges_tax, subtotal]);

  useEffect(() => {
    const newTotal =
      subtotal +
      (tax.charges_tax ? tax.tax : 0) +
      (shipping.price ? shipping.price : 0) -
      discount.discount;

    setTotal(Number(newTotal.toFixed(2)));
  }, [subtotal, tax, shipping, discount]);

  useEffect(() => {
    setHandleSave(handleSave);
    setHandleDiscard(() => {
      setDisabledSave(true);
      setOrder(defaultOrder);
    });
    setText("Unsaved draft order");
    setDisabledSave(true);
  }, []);

  useEffect(() => {
    if (show) {
      setDisabledSave(false);
    }
  }, [show]);

  const handleSetProducts = (ps: Product[]) => {
    console.log("ps", ps);
    setProducts([
      ...products,
      ...ps.filter((p) => !products.find((pr) => pr._id === p._id)),
    ]);

    setOrder({
      ...order,
      products: [...order.products, ...ps.map((p) => ({ _id: p._id }))],
    });

    console.log("order", order);
    console.log("products", products);
  };

  const handleRemoveProduct = (id: string) => {
    setOrder({
      ...order,
      products: order.products.filter((p) => p._id !== id),
    });

    setProducts(products.filter((p) => p._id !== id));
  };

  const handleQuantityChange = (id: string, quantity: number) => {
    setOrder({
      ...order,
      products: order.products.map((p) =>
        p._id === id ? { ...p, quantity } : p
      ),
    });
  };

  const addItem = (item: CustomItem) => {
    setOrder({ ...order, customItems: [...order.customItems, item] });
  };

  const handleCustomerChange = (c: Customer) => {
    setCustomer(c);
    setOrder({ ...order, customer: c._id });
  };

  async function handleSave() {
    setLoading(true);

    try {
      setOrder({
        ...order,
        discount: discount,
        shipping: shipping,
        tax: tax,
        total: total,
        subtotal: subtotal,
      });

      const result = ApiOrderSchema.parse(order);
      const { status } = await axios.post(`/api/orders`, result);

      if (status === 201) {
        toast.success("Order created successfully!");
        setDisabledSave(true);
        setOrder(defaultOrder);
      }
    } catch (error) {
      if (error instanceof ZodError) {
        console.log(error);
        toast.error(error.errors[0].message);
      } else {
        toast.error("Something went wrong");
      }
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen md:p-5 md:w-[100%] flex flex-col lg:px-[20%]">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2 p-5 md:p-0">
          <Link href="/orders">
            <FaArrowLeft className="text-2xl text-neutral-800 rounded-md p-1 hover:bg-neutral-200" />
          </Link>
          <Heading className="!pb-0.5">Create Order</Heading>
        </div>

        <div className="flex flex-col lg:flex-row gap-4">
          <div className="lg:w-[70%] flex flex-col gap-4">
            <Card className="!p-0">
              <div className="flex px-4 pt-4 justify-between align-middle">
                <SectionTitle title="Products" />

                <AddCustomItem addItem={addItem} />
              </div>

              <div className="flex justify-between gap-2 px-4 pb-4">
                <InputSearch placeholder="Search for a product" />
                <BrowseProductsDialog
                  setProducts={handleSetProducts}
                  selectedVariants={variants}
                  setSelectedVariants={setVariants}
                />
              </div>

              {show && (
                <div className="w-full">
                  <div
                    className="hidden md:flex justify-between text-sm text-neutral-700 border-b
                items-center"
                  >
                    <div className="flex gap-2 pl-4 py-1 w-full md:w-[70%]">
                      <p className="text-black font-medium">Product</p>
                    </div>

                    <div className="w-full py-1 md:w-[15%]">
                      <p className="text-black font-medium">Quantity</p>
                    </div>

                    <div className="pl-2 py-1 w-full md:w-[10%]">
                      <p className="text-black font-medium">Total</p>
                    </div>

                    <div className="py-1 w-full md:w-[5%]"></div>
                  </div>

                  {order.customItems.map((item, index) => (
                    <ItemTile
                      key={index}
                      item={item}
                      order={order}
                      setOrder={setOrder}
                    />
                  ))}

                  {products.map((product, index) => (
                    <ProductTile
                      quantity={
                        order.products.find((p) => p._id === product._id)
                          ?.quantity ?? 1
                      }
                      key={index}
                      product={product}
                      handleRemoveProduct={handleRemoveProduct}
                      handleQuantityChange={handleQuantityChange}
                    />
                  ))}
                </div>
              )}
            </Card>

            <div className="bg-white md:rounded-xl shadow-sm shadow-neutral-400">
              <div className="p-4">
                <SectionTitle title="Payment" />
                <div className="flex p-4 gap-2 md:gap-0 text-xs md:text-sm border text-gray-500 border-gray-200 rounded-xl">
                  <div className="flex flex-col gap-2 w-[40%] justify-between">
                    <p className="text-black">Subtotal</p>

                    {show ? (
                      <>
                        <AddDiscount
                          discount={discount}
                          setDiscount={setDiscount}
                          edit={editDiscount}
                        />
                        <AddShipping
                          shipping={shipping}
                          setShipping={setShipping}
                          edit={editShipping}
                        />
                        <TaxPopover tax={tax} setTax={setTax} />
                      </>
                    ) : (
                      <>
                        <p>Add discount</p>
                        <p>Add shipping or deliver</p>
                        <p>Estimated tax</p>
                      </>
                    )}

                    <p className="font-semibold text-black">Total</p>
                  </div>

                  <div className="flex flex-col gap-2 flex-2 justify-between">
                    <p>-</p>
                    <p>-</p>
                    <p>-</p>
                    <p>VAT 15%</p>

                    <p className="font-semibold text-black"> -</p>
                  </div>

                  <div className="flex flex-col flex-1 gap-2 items-end justify-between">
                    <p className="whitespace-nowrap">SAR {subtotal}</p>
                    <p className="whitespace-nowrap">SAR {discount.discount}</p>
                    <p className="whitespace-nowrap">SAR {shipping.price}</p>
                    <p className="whitespace-nowrap">SAR {tax.tax}</p>

                    <p className="font-semibold text-black">SAR {total}</p>
                  </div>
                </div>

                {show && (
                  <div className="p-4 gap-2 mt-3 md:gap-0 text-sm border text-gray-500 border-gray-200 rounded-xl">
                    <div className="flex flex-col gap-2 flex-1 justify-between">
                      <Checkbox
                        checked={paymentDueLater}
                        id="payment"
                        label="Payment due later"
                        onChange={(e) => {
                          setPaymentDueLater(e.target.checked);
                        }}
                      />

                      {paymentDueLater && (
                        <div className="mt-2">
                          <Select
                            label="Payment terms"
                            options={[
                              {
                                label: "Due on receipt",
                                value: "due_on_receipt",
                              },
                              {
                                label: "Due on fulfillment",
                                value: "due_on_fulfillment",
                              },
                              {
                                label: "Within 7 days",
                                value: "within_7_days",
                              },
                              {
                                label: "Within 14 days",
                                value: "within_14_days",
                              },
                              {
                                label: "Within 30 days",
                                value: "within_30_days",
                              },
                              {
                                label: "Within 60 days",
                                value: "within_60_days",
                              },
                              {
                                label: "Within 90 days",
                                value: "within_90_days",
                              },
                              { label: "Fixed date", value: "custom" },
                            ]}
                            onChange={(e) => {
                              setOrder({
                                ...order,
                                payment_due: e.target.value,
                              });
                            }}
                            className="w-[50%]"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {show ? (
                <div className="flex p-4 pt-0 justify-end gap-4">
                  <OutlinedButton
                    disabled={order.products.length === 0 && !order.customItems}
                  >
                    Send invoice
                  </OutlinedButton>
                  {order.payment_status === "paid" ? (
                    <FilledButton
                      onClick={() =>
                        setOrder({ ...order, payment_status: "unpaid" })
                      }
                    >
                      Mark as unpaid
                    </FilledButton>
                  ) : (
                    <CollectPaymentPopover
                      handleMarkAsPaid={() =>
                        setOrder({ ...order, payment_status: "paid" })
                      }
                      total={total}
                    />
                  )}
                </div>
              ) : (
                <div className="p-4 text-sm bg-neutral-100 md:rounded-b-xl">
                  <p>
                    Add a product to calculate total and view payment options.
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="lg:w-[30%] flex flex-col gap-4">
            <Card className="p-4">
              <div className="flex justify-between align-middle">
                <SectionTitle title="Notes" />
                <AddNotesModal
                  defaultValue={order.note}
                  onSave={(n) => setOrder({ ...order, note: n })}
                />
              </div>

              {order.note ? (
                <div className="flex justify-between items-center gap-2">
                  <p className="text-sm">{order.note}</p>
                </div>
              ) : (
                <div className="text-sm">No notes</div>
              )}
            </Card>

            <Card className="p-4">
              {customer ? (
                <div className="flex gap-4 flex-col justify-between text-sm text-gray-600">
                  <div>
                    <p className="text-gray-800 font-medium py-1 flex justify-between">
                      Customer
                      <FaTrashCan
                        onClick={() => {
                          setCustomer(undefined);
                          setOrder({ ...order, customer: undefined });
                        }}
                        className="text-gray-500 cursor-pointer"
                      />
                    </p>
                    <p className=" hover:underline cursor-pointer text-blue-600">
                      {customer?.firstName} {customer?.lastName}
                    </p>
                    <p className="">{customer?.email}</p>
                  </div>

                  <div>
                    <p className="text-gray-800 font-medium py-1">
                      Contact information
                    </p>
                    <p className="">{customer?.email}</p>
                    <p className="">{customer?.phone}</p>
                  </div>

                  <div>
                    <p className="text-gray-800 font-medium py-1">
                      Shipping address
                    </p>
                    <p className="">{customer?.addresses[0]?.address}</p>
                    <p className="">{customer?.addresses[0]?.city}</p>
                    <p className="">{customer?.addresses[0]?.country}</p>
                  </div>

                  <div>
                    <p className="text-gray-800 font-medium py-1">
                      Billing address
                    </p>
                    <p className="text-gray-500">Same as shipping address</p>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex justify-between align-middle">
                    <SectionTitle title="Customer" />
                  </div>

                  <CustomerPopover
                    handleCustomerChange={handleCustomerChange}
                  />
                </>
              )}
            </Card>

            <Card className="p-4">
              <SectionTitle title="Market" />
              <p className="text-sm font-semibold text-neutral-700">
                Primary Market
              </p>
              <p className="text-xs">Kingdom of Saudi Arabia (SAR riyals)</p>
            </Card>

            <Card className="p-5">
              <SectionTitle title="Tags" />
              <Input
                id="tags"
                placeholder=""
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    setOrder({
                      ...order,
                      tags: [...(order.tags ?? []), e.currentTarget.value],
                    });
                    e.currentTarget.value = "";
                  }
                }}
              />

              <div className="flex gap-2">
                {order?.tags?.map((tag) => (
                  <div
                    key={tag}
                    className="bg-slate-200 mt-2 text-gray-900 px-2 py-1 rounded-md text-sm flex items-center gap-1"
                  >
                    {tag}
                    <button
                      onClick={() =>
                        setOrder({
                          ...order,
                          tags: order.tags?.filter((t) => t !== tag),
                        })
                      }
                    >
                      <IoIosClose size={20} />
                    </button>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;

const defaultOrder: ApiOrder = {
  products: [],
  customItems: [],
  referenceNumber: "",
  note: "",
  tags: [],
  customer: undefined,
  payment_status: "Unpaid",
  status: "draft",
  subtotal: 0,
  discount: {
    type: "amount",
    value: 0,
    reason: "",
    discount: 0,
  },
  tax: {
    charges_tax: true,
    tax: 0.0,
  },
  shipping: {
    price: 0,
    name: "",
  },
  total: 0,
  fulfillment_status: "Unfulfilled",
};
