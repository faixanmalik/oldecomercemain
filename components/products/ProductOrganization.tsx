import { ApiProduct } from "@/types/product";
import Card from "../Card";
import SectionTitle from "../SectionTitle";
import Input from "../Input";
import { IoIosClose } from "react-icons/io";

export default function ProductOrganization({
  loading,
  product,
  setProduct,
}: {
  loading: boolean;
  product: ApiProduct;
  setProduct: React.Dispatch<React.SetStateAction<any>>;
}) {
  return (
    <Card className=" flex-col flex p-4 gap-4">
      <SectionTitle title="Product Organization" />
      <Input
        id="product-category"
        disabled={loading}
        label="Product category"
        placeholder="Apparel & Accessories"
        value={product.category}
        onChange={(e) =>
          setProduct({ ...product, cateogry: e.target.value })
        }
      />
      <Input
        id="product-type"
        disabled={loading}
        label="Product Type"
        value={product.type}
        onChange={(e) =>
          setProduct({ ...product, type: e.target.value })
        }
      />
      <Input
        id="vendor"
        label="Vendor"
        disabled={loading}
        value={product.vendor}
        onChange={(e) => setProduct({ ...product, vendor: e.target.value })}
      />
      <Input
        id="collections"
        label="Collections"
        disabled={loading}
        // TODO:
        onChange={(e) => { }}
      />

      <Input
        id="tags"
        label="Tags"
        disabled={loading}
        onKeyDown={(e) => {
          const value = e.currentTarget.value;
          if (e.key === "Enter" && value !== "") {
            setProduct({ ...product, tags: [...product.tags, value] });
            e.currentTarget.value = "";
          }
        }}
      />
      <div className="flex gap-2">
        {product.tags.map((tag) => (
          <div
            key={tag}
            className="bg-slate-200 text-gray-900 px-2 py-1 rounded-md text-sm flex items-center gap-1"
          >
            {tag}{" "}
            <button
              disabled={loading}
              onClick={() =>
                setProduct({
                  ...product,
                  tags: product.tags.filter((t) => t !== tag),
                })
              }
            >
              <IoIosClose size={20} />
            </button>
          </div>
        ))}
      </div>
    </Card>
  );
}
