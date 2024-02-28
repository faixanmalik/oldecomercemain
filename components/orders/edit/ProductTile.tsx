/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import { FaTrashCan } from "react-icons/fa6";
import Input from "@/components/Input";
import { ApiProduct, Product } from "@/types/product";
import Link from "next/link";

import { useEffect, useState } from "react";
import AddDiscount from "../modals/AddDiscount";

import { Discount } from "@/types/order";

const ProductTile = ({
  handleRemoveProduct,
  handleQuantityChange,
  product,
  quantity,
}: {
  handleRemoveProduct: any;
  handleQuantityChange: any;
  product: Product;
  quantity: number;
}) => {
  const [prodctDiscount, setProductDiscount] = useState<Discount>({
    type: "amount",
    discount: 0,
  });

  const [edit, setEdit] = useState(false);

  useEffect(() => {
    if (prodctDiscount.type === "percentage" && prodctDiscount.value) {
      setProductDiscount({
        ...prodctDiscount,
        discount: (product.price || 0) / 100,
      });
    } else if (prodctDiscount.type === "amount" && prodctDiscount.value) {
      setProductDiscount({
        ...prodctDiscount,
        discount: prodctDiscount.value,
      });
    }
  }, [prodctDiscount.value, prodctDiscount.type]);

  useEffect(() => {
    if (prodctDiscount.discount && prodctDiscount.discount > 0) {
      setEdit(true);
    } else {
      setEdit(false);
    }
  }, [prodctDiscount.discount]);

  return (
    <>
      <div
        className="text-sm text-neutral-700  
    border-neutral-300 justify-between border rounded-xl mx-4"
      >
        <div className="flex gap-2 p-4 w-full">
          {product.media.length > 0 ? (
            <img
              src={product.media[0].url}
              alt={product.title}
              className="w-10 h-10 rounded-md object-cover"
            />
          ) : (
            <div className="w-10 h-10 rounded-md bg-neutral-200" />
          )}
          <div>
            <p className="text-black font-medium">{product.title}</p>

            <p>
              SAR {product.quantity} x {product.price}
            </p>

            <div className="flex gap-2 flex-wrap">
              <AddDiscount
                discount={prodctDiscount}
                setDiscount={setProductDiscount}
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
                Remove product
              </p>
            </div>
          </div>
          <p className="flex-1 text-right">
            <span className="text-gray-600 text-xs font-medium whitespace-nowrap pr-4">
              SAR {product.price && product.price * quantity}
            </span>
          </p>
        </div>
      </div>
    </>
  );
};

export default ProductTile;
