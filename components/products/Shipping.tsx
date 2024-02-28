import { ApiProduct } from "@/types/product";
import Card from "../Card";
import SectionTitle from "../SectionTitle";
import Checkbox from "../Checkbox";
import Input from "../Input";
import Select from "../Select";
import countries from "@/data/countries";


export default function Shipping({
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
      <SectionTitle title="Shipping" />
      <Checkbox
        id="physical-product"
        disabled={loading}
        label="This is a physical product"
        checked={product.isPhysicalProduct}
        onChange={(e) =>
          setProduct({ ...product, isPhysicalProduct: e.target.checked })
        }
      />

      {product.isPhysicalProduct ? (
        <>
          <div className=" w-[50%] flex gap-4 items-end justify-between mb-4">
            <div className="flex-1">
              <Input
                disabled={loading}
                id="weight"
                label="Weight"
                placeholder="0.0"
                type="number"
                onChange={(e) =>
                  setProduct({ ...product, weight: Number(e.target.value) })
                }
              />
            </div>

            <div className="">
              <Select
              className="w-min pl-0"
                label="Weight Unit"
                disabled={loading}
                options={[
                  { value: "kg", label: "kg" },
                  { value: "g", label: "g" },
                  { value: "lb", label: "lb" },
                  { value: "oz", label: "oz" },
                ]}
                onChange={(e) =>
                  setProduct({ ...product, weightUnit: e.target.value })
                }
              />
            </div>
          </div>

          <Select
            label="Country/Region of origin"
            disabled={loading}
            options={countries}
            onChange={(e) =>
              setProduct({ ...product, countryOfOrigin: e.target.value })
            }
          />
        </>
      ) : (
        <p className="text-[0.8em]">Customers won’t enter shipping details at checkout. Learn how to set up your store for digital products or services.
        </p>
      )}
    </Card>
  );
}
