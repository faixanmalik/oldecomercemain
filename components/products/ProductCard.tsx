import { ApiProduct, Product } from "@/types/product";
import Text from "../Text";
import Image from "next/image";
import Link from "next/link";
import { PiImageThin } from "react-icons/pi";

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <div className="flex md:hidden bg-white border-b p-3">
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
      <div className="pl-3">
        <p className="text-sm text-black font-semibold">{product.title}</p>
        <p className="text-xs text-gray-600 pb-1">
          {product.quantity || 0} in stock for {product.variants?.length || 0}{" "}
          variants
        </p>
        <span
          className={`${
            product.status === "active"
              ? "bg-green-300 text-green-700"
              : "bg-blue-300 text-blue-700"
          } text-xs font-semibold rounded-lg p-0.5 px-1`}
        >
          {product.status}
        </span>
      </div>
    </div>
  );
};

export default ProductCard;
