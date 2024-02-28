import { ApiProduct } from "@/types/product";
import Card from "../Card";
import SectionTitle from "../SectionTitle";
import Input from "../Input";
import React from "react";
import TextButton from "../buttons/TextButton";
import TextArea from "../TextArea";

export default function SearchEngineListing({
  product,
  setProduct,
  loading,
}: {
  loading: boolean;
  product: ApiProduct;
  setProduct: React.Dispatch<React.SetStateAction<any>>;
}) {
  const [edit, setEdit] = React.useState<boolean>(false);

  return (
    <Card className="flex p-4 flex-col items-stretch">
      <div className="flex w-full justify-between">
        <SectionTitle title="Search Engine Listing" />
        {!edit && <TextButton onClick={() => setEdit(true)}>Edit</TextButton>}
      </div>
      <p className="mt-4 font-medium text-[0.8em] text-gray-900">
        Add a title and description to see how this collection might appear in a
        search engine listing
      </p>
      {edit && (
        <>
          <div className="h-8" />
          <Input
            id="seo-title"
            value={product.seo.title}
            disabled={loading}
            onChange={(e) =>
              setProduct({
                ...product,
                seo: { ...product.seo, title: e.target.value },
              })
            }
            label="SEO Title"
          />
          <div className="h-4" />
          <TextArea
            label="SEO Description"
            disabled={loading}
            value={product.seo.description}
            onChange={(e) =>
              setProduct({
                ...product,
                seo: { ...product.seo, title: e.target.value },
              })
            }
          />
        </>
      )}
    </Card>
  );
}
