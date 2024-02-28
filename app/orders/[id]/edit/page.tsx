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
import { ApiProduct, Product } from "@/types/product";

import ItemTile from "@/components/orders/edit/ItemTile";
import ProductTile from "@/components/orders/edit/ProductTile";

import { useParams } from "next/navigation";
import Checkbox from "@/components/Checkbox";

const OrdersPage = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState<ApiOrder>(defaultOrder);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (id) {
      fetch(`/api/orders/${id}`, { cache: "no-cache" })
        .then((res) => res.json())
        .then((order) => {
          setOrder(order);
          setProducts(order.products);
        });
    }
  }, [id]);

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
    const newSubtotal = [...products, ...order.customItems].reduce(
      (acc, curr) => acc + (curr.price ?? 0) * curr.quantity,
      0
    );

    setSubtotal(newSubtotal);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products, order]);

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

  const handleSetProducts = (ps: Product[]) => {
    setProducts([...products, ...ps]);
    setOrder({
      ...order,
      products: [...order.products, ...ps.map((p) => ({ _id: p._id }))],
    });
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
          <Heading className="!pb-0.5">Edit Order</Heading>
          <p>
            <span className="text-sm text-gray-500">Order #</span>
            <span className="text-sm text-gray-800">
              {order.referenceNumber}
            </span>
          </p>
        </div>

        <Card className="!p-0">
          <div className="flex px-4 pt-4 justify-between align-middle">
            <SectionTitle title="Products" />

            <AddCustomItem addItem={addItem} />
          </div>

          <div className="flex justify-between gap-2 px-4 pb-4">
            <InputSearch placeholder="Search for a product" />
            <BrowseProductsDialog setProducts={handleSetProducts} />
          </div>

          {((order.customItems && order.customItems.length > 0) ||
            (order.products && order.products.length > 0)) && (
              <div className="w-full pb-4 flex flex-col gap-2">
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
            <div
              className="flex p-4 gap-2 md:gap-0 text-xs md:text-sm border
             text-gray-500 border-gray-200 rounded-t-xl"
            >
              <div className="flex flex-col gap-2 w-[40%] justify-between">
                <p className="text-black">Subtotal</p>

                <p className="text-black">Estimated tax</p>

                <p className="font-semibold text-black">Total</p>
              </div>

              <div className="flex flex-col gap-2 flex-2 justify-between">
                <p> </p>

                <p>VAT 15%</p>

                <p className="font-semibold text-black"> </p>
              </div>

              <div className="flex flex-col flex-1 gap-2 items-end justify-between">
                <p className="whitespace-nowrap">SAR {subtotal}</p>
                <p className="whitespace-nowrap">SAR {tax.tax}</p>

                <p className="font-semibold text-black">SAR {total}</p>
              </div>
            </div>

            <div className="flex justify-between border border-gray-200 border-t-0 rounded-b-xl p-3 text-sm text-black font-medium">
              <p>Paid by customer</p>
              <p>SAR {total}</p>
            </div>
          </div>
        </div>

        <Card className="p-5">
          <SectionTitle title="Reason for edit" />
          <Input placeholder="" id="reason" />
          <p className="text-sm text-gray-600 mt-2">
            Only you and other staff can see this reason.
          </p>
        </Card>
      </div>

      <Card className="mt-4">
        <div className="p-4">
          <SectionTitle title="Summary" />

          <p className="text-sm mb-4 text-gray-500 font-[500]">
            No changes have been made.
          </p>

          <div className="flex justify-end">
            <FilledButton disabled className="w-full">
              Update Order
            </FilledButton>
          </div>
        </div>
      </Card>
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
