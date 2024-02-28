/* eslint-disable react-hooks/exhaustive-deps */
import { FaTrashCan } from "react-icons/fa6";
import { CustomItem } from "@/types/customItem";
import { ApiOrder } from "@/types/order";
import Input from "@/components/Input";
import AddDiscount from "../modals/AddDiscount";

import { useEffect, useState } from "react";
import { Discount } from "@/types/order";

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
        className="text-sm text-neutral-700  
    border-neutral-300 justify-between border rounded-xl mx-4"
      >
        <div className="flex gap-2 p-4 w-full">
          <div className="w-10 h-10 rounded-md bg-neutral-200" />
          <div>
            <p className="text-black font-medium">{item.name}</p>

            <p>
              SAR {item.quantity} x {item.price}
            </p>

            <div className="flex gap-2 flex-wrap">
              <AddDiscount
                discount={itemDiscount}
                setDiscount={setItemDiscount}
                edit={edit}
              >
                <p className="whitespace-nowrap text-blue-500 hover:underline">
                  Apply discount
                </p>
              </AddDiscount>
              <p className="whitespace-nowrap text-blue-500 hover:underline">
                Adjust quantity
              </p>
              <p className="whitespace-nowrap text-blue-500 hover:underline">
                Remove item
              </p>
            </div>
          </div>
          <p className="flex-1 text-right">
            {item.price && item.quantity && (
              <span className="text-gray-600 text-xs font-medium whitespace-nowrap pr-4">
                SAR {item.price * item.quantity}
              </span>
            )}
          </p>
        </div>
      </div>
    </>
  );
};

export default ItemTile;
