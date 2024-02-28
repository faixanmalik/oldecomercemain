import Card from "@/components/Card";
import SectionTitle from "@/components/SectionTitle";
import Text from "@/components/Text";
import TextButton from "@/components/buttons/TextButton";
import { ApiProduct, Product, ApiVariant } from "@/types/product";
import React, { useEffect } from "react";
import EditVariantsPopover from "../popovers/EditVariantsPopover";
import Checkbox from "@/components/Checkbox";
import { Location } from "@/types/location";
import EditVariantImagesDialog from "./EditVariantImagesDialog";
import Link from "next/link";
import VariantOptionPopover from "./VariantOptionPopover";
import AllLocationsPopover from "@/components/AllLocationsPopover";
import DraggableList from "./DraggableList";

export default function VariantsCardEditPage({
  locations,
  loading,
  product,
  initialProduct,
  setProduct,
  productId,
}: {
  productId: string;
  locations: Location[];
  loading: boolean;
  product: ApiProduct;
  initialProduct: Product;
  setProduct: React.Dispatch<React.SetStateAction<any>>;
}) {
  const [selectedVariants, setSelectedVariants] = React.useState<ApiVariant[]>(
    []
  );
  const [selectedLocation, setSelectedLocation] =
    React.useState<Location | null>(null);
  const [visibleVariants, setVisibleVariants] = React.useState<ApiVariant[]>(
    product.variants
  );

  useEffect(() => {
    if (selectedLocation === null) {
      setVisibleVariants(product.variants);
    } else {
      setVisibleVariants(
        product.variants.filter((v) =>
          v.inventoryLevels.find((il) => il.location === selectedLocation._id)
        )
      );
    }
  }, [selectedLocation]);

  function getNextVariant(): string {
    const vs: string[] = ["color", "size", "material", "style"];
    for (let i = 0; i < vs.length; i++) {
      if (!product.variantOptions.map((v) => v.name).includes(vs[i]))
        return vs[i];
    }
    return "color";
  }

  return (
    <Card className=" flex-col w-full py-4 flex">
      <div className="px-4">
        <SectionTitle title="Variants" />
      </div>

      <DraggableList
        product={product}
        setProduct={setProduct}
        loading={loading}
      />

      <div className="flex px-4 mt-4">
        <TextButton
          onClick={() =>
            setProduct({
              ...product,
              variantOptions: [
                ...product.variantOptions,
                { name: getNextVariant(), values: [] },
              ],
            })
          }
        >
          {product.variants.length === 0
            ? "+ Add options like color or size"
            : "+ Add another option"}
        </TextButton>
      </div>

      {product.variants.length > 0 && (
        <div className="w-full mt-4 flex px-4 pt-4 border-t border-gray-200 gap-2 flex-col">
          <div className="flex justify-between gap-4 w-full">
            <div className="flex-wrap flex items-stretch gap-4 w-full">
              <Text>Select</Text>
              <TextButton onClick={() => setSelectedVariants(product.variants)}>
                All
              </TextButton>
              <TextButton onClick={() => setSelectedVariants([])}>
                None
              </TextButton>
              {product.variantOptions.map((v) => (
                <VariantOptionPopover
                  key={v.name}
                  option={v}
                  variants={product.variants}
                  selectedVariants={selectedVariants}
                  setSelectedVariants={setSelectedVariants}
                />
              ))}
            </div>
            <div className="w-max md:whitespace-nowrap">
              <TextButton>
                <Link href={`/products/${productId}/variants/new`}>
                  Add variant
                </Link>
              </TextButton>
            </div>
          </div>
          <div className="flex gap-4 ml-2 w-full">
            <Text>Available inventory at:</Text>
            <AllLocationsPopover
              locations={locations}
              selectedLocation={selectedLocation}
              setSelectedLocation={setSelectedLocation}
            />
          </div>
        </div>
      )}

      {product.variants.length > 0 && (
        <div className="flex mt-4 justify-between border-t border-gray-200 p-4">
          <Checkbox
            id="showing-variants"
            checked={selectedVariants.length === product.variants.length}
            label={
              selectedVariants.length > 0
                ? `${selectedVariants.length} selected`
                : `Showing ${visibleVariants.length} variants`
            }
            className="hidden md:inline-flex"
            onChange={(e) => {
              e.stopPropagation();
              if (e.target.checked) {
                setSelectedVariants(product.variants);
              } else {
                setSelectedVariants([]);
              }
            }}
          />

          {selectedVariants.length === 0 && (
            <EditVariantsPopover
              locations={locations}
              product={product}
              setProduct={setProduct}
            />
          )}
        </div>
      )}

      {product.variants.length > 0 &&
        visibleVariants.map((v, i) => (
          <div
            key={v.name}
            className="flex h-20 hover:bg-gray-100 border-t border-gray-200 w-full transition-all"
          >
            <div className="h-full grid place-items-center pl-4">
              <Checkbox
                id={v.name}
                checked={selectedVariants.includes(v)}
                className="hidden md:inline-flex"
                onChange={(e) => {
                  e.stopPropagation();
                  if (e.target.checked) {
                    setSelectedVariants([...selectedVariants, v]);
                  } else {
                    setSelectedVariants(
                      selectedVariants.filter((sv) => sv !== v)
                    );
                  }
                }}
              />
            </div>

            <EditVariantImagesDialog
              altText={product.title}
              image={v.image}
              initialImages={product.variantImages}
              onSave={(selectedImage, newImages) => {
                console.log("select & new:", selectedImage, newImages);
                setProduct((prevProduct: any) => ({
                  ...prevProduct,
                  variantImages: [...prevProduct.variantImages, ...newImages],
                  variants: prevProduct.variants.map((variant: any, index: any) =>
                    index === i ? { ...variant, image: selectedImage } : variant
                  ),
                }));
              }}
            />

            <Link
              href={`/products/${initialProduct._id}/variants/${i}`}
              className="flex flex-col md:flex-row py-4 pr-4 pl-2 w-full transition-all justify-between cursor-pointer"
            >
              <div className="flex flex-col w-full items-start h-full justify-center">
                <Text className="font-bold text-gray-800">{v.name}</Text>
                <Text className="text-gray-800">{v.sku}</Text>
              </div>
              <div className="flex flex-col whitespace-nowrap items-end">
                <Text className="text-gray-800">$ {v.price}</Text>
                <Text className="text-gray-800">
                  33 available at 2 locations
                </Text>
              </div>
            </Link>
          </div>
        ))}

      {selectedVariants.length > 0 && (
        <div className="p-3 my-8 shadow-md shadow-gray-300 bg-white border border-gray-300 rounded-xl w-min h-min self-center">
          <EditVariantsPopover
            locations={locations}
            product={product}
            setProduct={setProduct}
            variant="sticky"
          />
        </div>
      )}

      {product.variants.length > 0 && (
        <div className="flex border-t border-gray-200 pt-4 px-4 justify-between">
          <Text className="text-gray-800">
            Total inventory at all locations
          </Text>
          <Text className="text-gray-800">0 available</Text>
        </div>
      )}
    </Card>
  );
}
