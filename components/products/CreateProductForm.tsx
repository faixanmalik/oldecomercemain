"use client";
// eslint-disable-next-line @next/next/no-img-element

import React, { useEffect } from "react";
import { ZodError } from "zod";
import { ApiProductSchema, ApiProduct } from "@/types/product";
import Card from "@/components/Card";
import Input from "@/components/Input";
import Select from "@/components/Select";
import TextArea from "@/components/TextArea";
import FilledButton from "@/components/buttons/FilledButton";
import { toast } from "react-hot-toast";
import SectionTitle from "@/components/SectionTitle";
import ImageUploader from "@/components/ImageUploader";
import Image from "next/image";
import Spinner from "@/components/Spinner";
import axios from "axios";
import { Location } from "@/types/location";
import VariantsCard from "./variants/VariantsCard";
import { defaultProduct, multiplyArrays } from "@/lib/products/utils";
import { SalesChannel } from "@/types/salesChannel";
import { Market } from "@/types/market";
import { Publishing } from "./Publishing";
import ProductOrganization from "./ProductOrganization";
import Pricing from "./Pricing";
import Inventory from "./Inventory";
import Shipping from "./Shipping";
import SearchEngineListing from "./SearchEngineListing";
import { useHeaderStore, HeaderStoreType } from "@/store/HeaderStore";
import { XIcon } from "lucide-react";

export default function CreateProductForm({
  locations,
  salesChannels,
}: {
  locations: Location[];
  salesChannels: SalesChannel[];
}) {
  const { setHandleSave, setHandleDiscard, setText, setDisabledSave } =
    useHeaderStore((state: unknown) => state as HeaderStoreType);

  const markets: Market[] = [
    {
      _id: "1",
      name: "US",
      createdAt: new Date().toString(),
      updatedAt: new Date().toString(),
    },
    {
      _id: "2",
      name: "CA",
      createdAt: new Date().toString(),
      updatedAt: new Date().toString(),
    },
    {
      _id: "3",
      name: "UK",
      createdAt: new Date().toString(),
      updatedAt: new Date().toString(),
    },
  ];

  const [product, setProduct] = React.useState<ApiProduct>(defaultProduct);
  const [media, setMedia] = React.useState<string[]>([]);
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    setText("Unsaved Product");
    setDisabledSave(true);
    setHandleSave(handleSave);
    setHandleDiscard(() => {
      setProduct(defaultProduct);
    });
  }, []);

  useEffect(() => {
    if (product.title && product.title.length > 0) {
      setDisabledSave(false);
    } else {
      setText("Unsaved Product");
      setDisabledSave(true);
    }
  }
  , [product.title]);

  useEffect(() => {
    setProduct((p) => ({
      ...p,
      variants: multiplyArrays(
        p.variantOptions.map((v) => v.name),
        ...p.variantOptions.map((v) => v.values)
      ).map((obj, i) => ({
        _id: i.toString(),
        name: Object.values(obj).join(" / "),
        values: obj,
        trackQuantity: false,
        continueSellingWhenOutOfStock: false,
        inventoryLevels: [],
      })),
    }));
  }, [product.variantOptions]);

  useEffect(() => {
    if (
      product.costPerItem &&
      product.price &&
      product.price !== 0 &&
      product.costPerItem !== 0
    ) {
      setProduct((p) => ({
        ...p,
        profit: (p.price || 0) - (product.costPerItem || 0),
        margin:
          Math.round(
            (((p.price || 0) - (product.costPerItem || 0)) /
              (product.price || 0)) *
              10000
          ) / 100,
      }));
    }
  }, [product.price, product.costPerItem]);

  async function handleSave() {
    setLoading(true);

    try {
      if (!product.price) product.price = 0;
      product.media = media.map((url) => ({ type: "image", url }));
      const result = ApiProductSchema.parse(product);
      const { status } = await axios.post(`/api/products`, result);

      if (status === 201) {
        toast.success("Product created successfully");
        setProduct(defaultProduct);
      }
    } catch (error) {
      if (error instanceof ZodError) {
        toast.error("Title is required");
      } else {
        toast.error("Something went wrong");
      }
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="w-full flex flex-col xl:flex-row justify-center gap-4">
        <div className=" flex flex-col w-full self-center gap-4 mb-4">
          <Card className="flex p-4 flex-col gap-4 items-stretch">
            <Input
              id="title"
              value={product.title}
              onChange={(e) =>
                setProduct({ ...product, title: e.target.value })
              }
              label="Title"
              placeholder="Title"
              disabled={loading}
            />
            <TextArea
              label="Description"
              disabled={loading}
              value={product.description}
              onChange={(e) =>
                setProduct({ ...product, description: e.target.value })
              }
            />
          </Card>

          <Card className="flex p-4 flex-col gap-4 items-stretch">
            <SectionTitle title="Media" />

            <div
              className={
                media.length === 0
                  ? "w-full"
                  : "w-full gap-2 grid grid-cols-2 lg:grid-cols-3"
              }
            >
              {media.map((m, i) => (
                <div key={i} className="relative rounded-md">
                  <img
                    src={m}
                    alt={product.title}
                    className="h-[150px] md:h-[200px] w-[100%] object-cover rounded-md"
                  />

                  <XIcon
                    onClick={() => {
                      setMedia((prev) =>
                        prev.filter((_, index) => index !== i)
                      );
                    }}
                    className="absolute w-4 text-gray-600 top-2 right-2 cursor-pointer"
                  />
                </div>
              ))}

              <ImageUploader
                onSave={(url: string) => {
                  setMedia((prev) => [...prev, url]);
                }}
              />
            </div>
          </Card>

          <Pricing
            loading={loading}
            product={product}
            setProduct={setProduct}
          />

          <Inventory
            locations={locations}
            loading={loading}
            product={product}
            setProduct={setProduct}
          />

          <Shipping
            loading={loading}
            product={product}
            setProduct={setProduct}
          />

          <VariantsCard
            loading={loading}
            locations={locations}
            product={product}
            setProduct={setProduct}
          />

          <SearchEngineListing
            product={product}
            setProduct={setProduct}
            loading={loading}
          />
        </div>

        <div className="flex flex-col xl:max-w-[280px] w-full gap-4">
          <Card className=" flex-col flex p-4 gap-4">
            <SectionTitle title="Status" />
            <Select
              disabled={loading}
              options={[
                { label: "Active", value: "active" },
                { label: "Draft", value: "draft" },
              ]}
              onChange={(e) =>
                setProduct({
                  ...product,
                  status: e.target.value as "active" | "draft",
                })
              }
            />
          </Card>

          <Publishing
            product={product}
            setProduct={setProduct}
            markets={markets}
            salesChannels={salesChannels}
          />

          <ProductOrganization
            loading={loading}
            product={product}
            setProduct={setProduct}
          />

          <Card className="p-4">
            <Select
              label="Theme template"
              options={[{ label: "Default theme", value: "default" }]}
              onChange={() => {}}
            />
          </Card>
        </div>

        <div className="self-end pr-4 pb-4">
          <FilledButton onClick={handleSave} disabled={loading}>
            {loading ? <Spinner /> : "Save"}
          </FilledButton>
        </div>
      </div>
    </>
  );
}
