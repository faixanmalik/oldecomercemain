/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import { FaTrashCan } from "react-icons/fa6";
import Input from "@/components/Input";
import { ApiProduct, Product } from "@/types/product";
import Link from "next/link";

import { useEffect, useState } from "react";
import AddDiscount from "../modals/AddDiscount";

import { Discount } from "@/types/order";

import { PiImageThin } from "react-icons/pi";

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
        className="hidden md:flex w-full text-sm text-neutral-700  
    border-neutral-300 border-t"
      >
        <div className="flex gap-2 pl-4 py-4 w-full md:w-[70%]">
          {product.media.length > 0 ? (
            <img
              src={product.media[0].url}
              alt={product.title}
              className="w-10 h-10 rounded-md object-cover"
            />
          ) : (
            <Link
              href={`/products/${product._id}`}
              className="w-10 h-10 rounded-md overflow-hidden border bg-gray-100 border-gray-300 grid place-items-center"
            >
              <PiImageThin size={14} className="text-gray-500" />
            </Link>
          )}
          <div>
            <Link href={`/products/${product._id}`} passHref>
              <p className="font-medium text-blue-500 hover:underline">
                {product.title}
              </p>
            </Link>
            <p>{product.variants[0]?.name}</p>
            <AddDiscount
              discount={prodctDiscount}
              setDiscount={setProductDiscount}
              edit={edit}
            >
              <div className="flex gap-2">
                <p className="text-blue-500 hover:text-blue-700 whitespace-nowrap hover:underline">
                  SAR{" "}
                  {(product?.price || 0) - prodctDiscount.discount > 0
                    ? (product?.price || 0) - prodctDiscount.discount
                    : 0}
                </p>

                {prodctDiscount.discount > 0 && (
                  <p className="line-through whitespace-nowrap">
                    SAR {product.price}
                  </p>
                )}
              </div>
            </AddDiscount>{" "}
          </div>
        </div>

        <div className="w-full md:w-[15%] py-4">
          <Input
            id="quantity"
            type="number"
            value={quantity}
            onChange={(e: any) =>
              handleQuantityChange(product._id, Number(e.target.value))
            }
            className="border border-neutral-300 rounded-lg text-sm w-full"
          />
        </div>

        <div className="pl-2 py-4 w-full md:w-[15%] text-center">
          SAR{" "}
          {(product.price && prodctDiscount
            ? product.price - prodctDiscount.discount
            : 0) * 1}
        </div>
        <div className="py-4 w-full md:w-[5%]">
          <button
            className="hover:bg-neutral-100 rounded-md w-full md:w-auto"
            onClick={() => handleRemoveProduct(product._id)}
          >
            <FaTrashCan className="text-sm text-neutral-600" />
          </button>
        </div>
      </div>

      <div className="flex flex-col border-t p-4 md:hidden w-full text-sm text-neutral-700 border-neutral-300 justify-between">
        <div className="flex w-full justify-between">
          <div className="flex gap-3">
            {product.media.length > 0 ? (
              <img
                src={product.media[0].url}
                alt={product.title}
                className="w-10 h-10 rounded-md object-cover"
              />
            ) : (
              <Link
                href={`/products/${product._id}`}
                className="w-10 h-10 rounded-md overflow-hidden border bg-gray-100 border-gray-300 grid place-items-center"
              >
                <PiImageThin size={14} className="text-gray-500" />
              </Link>
            )}
            <div>
              <Link href={`/products/${product._id}`} passHref>
                <p className="font-[500] text-blue-500 hover:underline">
                  {product.title}
                </p>
              </Link>
              <p>{product.variants[0]?.name}</p>
              <AddDiscount
                discount={prodctDiscount}
                setDiscount={setProductDiscount}
                edit={edit}
              >
                <div className="flex gap-2">
                  <p className="text-blue-500 hover:text-blue-700 whitespace-nowrap hover:underline">
                    SAR{" "}
                    {(product?.price || 0) - prodctDiscount.discount > 0
                      ? (product?.price || 0) - prodctDiscount.discount
                      : 0}
                  </p>

                  {prodctDiscount.discount > 0 && (
                    <p className="line-through whitespace-nowrap">
                      SAR {product.price}
                    </p>
                  )}
                </div>
              </AddDiscount>
            </div>
          </div>

          <div className="py-4">
            <button
              className="hover:bg-neutral-100 rounded-md w-full md:w-auto"
              onClick={() => handleRemoveProduct(product._id)}
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
              value={quantity}
              onChange={(e: any) =>
                handleQuantityChange(product._id, Number(e.target.value))
              }
              className="border border-neutral-300 rounded-lg text-sm"
            />
          </div>

          <div className="py-4 px-6">
            <p className="text-xs">Total</p>
            <p>
              SAR{" "}
              {(product.price && prodctDiscount
                ? product.price - prodctDiscount.discount
                : 0) * 1}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductTile;
