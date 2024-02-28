import React from "react";
import Card from "@/components/Card";
import SectionTitle from "@/components/SectionTitle";
import { ApiVariant } from "@/types/product";
import Checkbox from "@/components/Checkbox";
import TextButton from "@/components/buttons/TextButton";
import Text from "@/components/Text";
import Input from "@/components/Input";
import Select from "@/components/Select";
import countries from "@/data/countries";
import { AiOutlineSearch } from "react-icons/ai";

export default function Shipping({
  loading,
  variant,
  setVariant
}: {
  loading: boolean;
  variant: ApiVariant,
  setVariant: React.Dispatch<React.SetStateAction<ApiVariant>>;
}) {

  const [editCustomsInfo, setEditCustomsInfo] = React.useState(false)

  return (
    <Card className=" flex-col flex p-4">
      <SectionTitle title="Shipping" />
      <div className="h-4" />
      <Checkbox
        id="physical-product"
        disabled={loading}
        label="This is a physical product"
        checked={variant.isPhysicalProduct}
        onChange={(e) =>
          setVariant({ ...variant, isPhysicalProduct: e.target.checked })
        }
      />

      <div className="h-4" />

      {variant.isPhysicalProduct ? (
        <>
          <div className=" w-full flex gap-4 items-end justify-between mb-4">
            <div className="w-full">
              <Input
                disabled={loading}
                id="weight"
                label="Weight"
                placeholder="0.0"
                type="number"
                value={variant.weight}
                onChange={(e) =>
                  setVariant({ ...variant, weight: Number(e.target.value) })
                }
              />
            </div>

            <div className="w-full">
              <Select
                label="Weight Unit"
                disabled={loading}
                value={variant.weightUnit}
                options={[
                  { value: "kg", label: "kg" },
                  { value: "g", label: "g" },
                  { value: "lb", label: "lb" },
                  { value: "oz", label: "oz" },
                ]}
                onChange={(e) =>
                  setVariant({ ...variant, weightUnit: e.target.value as "kg" | "g" | "lb" | "oz" })
                }
              />
            </div>
          </div>

          {
            editCustomsInfo ? (
              <div className="border-t pt-4 mt-4 flex flex-col gap-4 border-gray-200">

                <Select
                  label="Country/Region of origin"
                  disabled={loading}
                  options={countries}
                  value={variant.countryOfOrigin}
                  onChange={(e) =>
                    setVariant({ ...variant, countryOfOrigin: e.target.value })
                  }
                />
                <Input
                  id="variant-hs-code"
                  disabled={loading}
                  label="Harmonized System (HS) code"
                  value={variant.hsCode}
                  icon={<AiOutlineSearch />}
                  onChange={(e) =>
                    setVariant({ ...variant, hsCode: e.target.value })
                  }
                />
              </div>
            ) : (
              <div className="self-start">
                <TextButton onClick={() => setEditCustomsInfo(true)}>
                  + Add customs information
                </TextButton>
              </div>
            )
          }
        </>
      ) : (
        <Text>Customers won’t enter shipping details at checkout.</Text>
      )}
    </Card>
  );
}
