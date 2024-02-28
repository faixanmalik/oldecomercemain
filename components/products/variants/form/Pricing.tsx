import React from "react";
import Card from "@/components/Card";
import SectionTitle from "@/components/SectionTitle";
import { ApiVariant } from "@/types/product";
import Checkbox from "@/components/Checkbox";
import Text from "@/components/Text";
import Input from "@/components/Input";

export default function Pricing({
  loading,
  variant,
  setVariant
}: {
  loading: boolean;
  variant: ApiVariant,
  setVariant: React.Dispatch<React.SetStateAction<ApiVariant>>;
}) {
  return (
    <Card className="flex p-4 flex-col gap-4 items-stretch">
      <SectionTitle title="Pricing" />
      <div className="flex gap-4">
        <Input
          id="price"
          disabled={loading}
          label="Price"
          placeholder="$ 0.00"
          type="number"
          value={variant.price}
          onChange={(e) =>
            setVariant({ ...variant, price: Number(e.target.value) })
          }
          icon={<Text>$ </Text>}
        />
        <Input
          id="compare-at-price"
          value={variant.compareAtPrice}
          disabled={loading}
          label="Compare-at Price"
          placeholder="$ 0.00"
          type="number"
          onChange={(e) =>
            setVariant({ ...variant, compareAtPrice: Number(e.target.value) })
          }
          icon={<Text>$ </Text>}
        />
      </div>
      <Checkbox
        id="charge-taxes"
        disabled={loading}
        label="Charge Taxes on this Product"
        checked={variant.chargeTaxes}
        onChange={(e) =>
          setVariant({ ...variant, chargeTaxes: e.target.checked })
        }
      />
      <div className="flex gap-4 mt-4">
        <Input
          disabled={loading}
          id="cost-per-item"
          label="Cost per Item"
          placeholder="$ 0.00"
          type="number"
          value={variant.costPerItem}
          onChange={(e) =>
            setVariant({ ...variant, costPerItem: Number(e.target.value) })
          }
          icon={<Text>$ </Text>}
        />
        <Input
          id="profit"
          disabled={true}
          value={variant.profit}
          label="Profit"
          placeholder="--"
          type="number"
          onChange={(e) =>
            setVariant({ ...variant, profit: Number(e.target.value) })
          }
          icon={<Text>$ </Text>}
        />
        <Input
          id="margin"
          disabled={true}
          label="Margin"
          value={variant.margin}
          placeholder="--"
          type="number"
          onChange={(e) =>
            setVariant({ ...variant, margin: Number(e.target.value) })
          }
          icon={<Text>% </Text>}
        />
      </div>
    </Card>
  );
}
