import { Collection } from "@/types/collection";
import Image from "next/image";
import Link from "next/link";
import { PiImageThin } from "react-icons/pi";

const CollectionCard = ({ collection }: { collection: Collection }) => {
  return (
    <div className="flex md:hidden bg-white border-b p-3">
      {collection.image ? (
        <div className="w-10 h-10 rounded-xl overflow-hidden">
          <Image
            src={collection.image}
            alt={collection.title}
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "100%", height: "100%" }}
          />
        </div>
      ) : (
        <div className="w-10 h-10 rounded-md overflow-hidden border bg-gray-100 border-gray-300 grid place-items-center">
          <PiImageThin size={14} className="text-gray-500" />
        </div>
      )}
      <div className="pl-3">
        <p className="text-sm text-black font-semibold">{collection.title}</p>
        <p className="text-xs text-gray-600 pb-1">
          {collection.products.length || 0} products
        </p>
      </div>
    </div>
  );
};

export default CollectionCard;
