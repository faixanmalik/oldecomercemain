/* eslint-disable react-hooks/exhaustive-deps */
import { FaTrashCan } from "react-icons/fa6";
import { CustomItem } from "@/types/customItem";
import { ApiOrder } from "@/types/order";
import Input from "@/components/Input";
import AddDiscount from "../modals/AddDiscount";

import { useEffect, useState } from "react";
import { Discount } from "@/types/order";

import { PiImageThin } from "react-icons/pi";

const ItemTile = ({
  order,
  setOrder,
  item,
}: {
  order: ApiOrder;
  item: CustomItem;
  setOrder: React.Dispatch<React.SetStateAction<ApiOrder>>;
}) => {
  const [itemDiscount, setItemDiscount] = useState<Discount>({
    type: "amount",
    discount: 0,
  });

  const [edit, setEdit] = useState(false);

  useEffect(() => {
    if (itemDiscount.type === "percentage" && itemDiscount.value) {
      setItemDiscount({
        ...itemDiscount,
        discount: ((item.price || 0) / 100) * itemDiscount.discount,
      });
    } else if (itemDiscount.type === "amount" && itemDiscount.value) {
      setItemDiscount({
        ...itemDiscount,
        discount: itemDiscount.value,
      });
    }
  }, [itemDiscount.value, itemDiscount.type]);

  useEffect(() => {
    if (itemDiscount.discount) {
      setOrder({
        ...order,
        customItems: order.customItems.map((ci) =>
          ci.name === item.name ? { ...ci, discount: itemDiscount } : ci
        ),
      });
    }
  }, [itemDiscount.discount]);

  useEffect(() => {
    if (itemDiscount.discount && itemDiscount.discount > 0) {
      setEdit(true);
    } else {
      setEdit(false);
    }
  }, [itemDiscount.discount]);

  return (
    <>
      <div
        className="hidden md:flex w-full text-sm text-neutral-700  
    border-neutral-300 justify-between"
      >
        <div className="flex gap-2 pl-4 py-4 w-full md:w-[70%]">
          <div className="w-10 h-10 rounded-md overflow-hidden border bg-gray-100 border-gray-300 grid place-items-center">
            <PiImageThin size={14} className="text-gray-500" />
          </div>
          <div>
            <p className="text-black font-medium">{item.name}</p>
            <p>
              {item.physical
                ? "Requires shipping"
                : "Does not require shipping"}
            </p>
            <AddDiscount
              discount={itemDiscount}
              setDiscount={setItemDiscount}
              edit={edit}
            >
              <div className="flex gap-2">
                <p className="text-blue-500 hover:text-blue-700 whitespace-nowrap hover:underline">
                  SAR{" "}
                  {(item?.price || 0) - itemDiscount.discount > 0
                    ? (item?.price || 0) - itemDiscount.discount
                    : 0}
                </p>

                {itemDiscount.discount > 0 && (
                  <p className="line-through whitespace-nowrap">
                    SAR {item.price}
                  </p>
                )}
              </div>
            </AddDiscount>
          </div>
        </div>

        <div className="w-full md:w-[15%] py-4">
          <Input
            id="quantity"
            type="number"
            value={item.quantity}
            onChange={(e: any) =>
              setOrder({
                ...order,
                customItems: order.customItems.map((ci) =>
                  ci.name === item.name
                    ? { ...ci, quantity: Number(e.target.value) }
                    : ci
                ),
              })
            }
            className="border border-neutral-300 rounded-lg text-sm w-full"
          />
        </div>
        <div className="pl-2 py-4 w-full md:w-[15%] text-center">
          SAR{" "}
          {(item.price ? item.price - itemDiscount.discount : 0) *
            item.quantity}
        </div>
        <div className="py-4 w-full md:w-[5%]">
          <button
            className="hover:bg-neutral-100 rounded-md w-full md:w-auto"
            onClick={() =>
              setOrder({
                ...order,
                customItems: order.customItems.filter(
                  (ci) => ci.name !== item.name
                ),
              })
            }
          >
            <FaTrashCan className="text-sm text-neutral-600" />
          </button>
        </div>
      </div>

      <div className="flex border-t flex-col p-4 md:hidden w-full text-sm text-neutral-700 border-neutral-300 justify-between">
        <div className="flex w-full justify-between">
          <div className="flex gap-2">
            <div className="w-10 h-10 rounded-md overflow-hidden border bg-gray-100 border-gray-300 grid place-items-center">
              <PiImageThin size={14} className="text-gray-500" />
            </div>
            <div>
              <p className="text-black font-medium">{item.name}</p>
              <p>
                {item.physical
                  ? "Requires shipping"
                  : "Does not require shipping"}
              </p>
              <AddDiscount
                discount={itemDiscount}
                setDiscount={setItemDiscount}
                edit={edit}
              >
                <div className="flex gap-2">
                  <p className="text-blue-500 hover:text-blue-700 whitespace-nowrap hover:underline">
                    SAR{" "}
                    {(item?.price || 0) - itemDiscount.discount > 0
                      ? (item?.price || 0) - itemDiscount.discount
                      : 0}
                  </p>

                  {itemDiscount.discount > 0 && (
                    <p className="line-through whitespace-nowrap">
                      SAR {item.price}
                    </p>
                  )}
                </div>
              </AddDiscount>
            </div>
          </div>

          <div className="py-4">
            <button
              className="hover:bg-neutral-100 rounded-md w-full md:w-auto"
              onClick={() =>
                setOrder({
                  ...order,
                  customItems: order.customItems.filter(
                    (ci) => ci.name !== item.name
                  ),
                })
              }
            >
              <FaTrashCan className="text-sm text-neutral-600" />
            </button>
          </div>
        </div>

        <div className="flex w-full items-end">
          <div className="flex-1 py-4 pl-12">
            <Input
              id="quantity"
              label="Quantity"
              type="number"
              value={item.quantity}
              onChange={(e: any) =>
                setOrder({
                  ...order,
                  customItems: order.customItems.map((ci) =>
                    ci.name === item.name
                      ? { ...ci, quantity: Number(e.target.value) }
                      : ci
                  ),
                })
              }
              className="border border-neutral-300 rounded-lg text-sm"
            />
          </div>

          <div className="py-4 px-6">
            <p className="text-xs">Total</p>
            <p>
              SAR{" "}
              {(item.price ? item.price - itemDiscount.discount : 0) *
                item.quantity}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ItemTile;
