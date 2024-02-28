import { ApiProduct } from "@/types/product";
import Text from "../Text";
import Card from "../Card";
import SectionTitle from "../SectionTitle";
import Input from "../Input";
import Checkbox from "../Checkbox";

export default function Pricing({
  loading,
  product,
  setProduct,
}: {
  loading: boolean;
  product: ApiProduct;
  setProduct: React.Dispatch<React.SetStateAction<any>>;
}) {
  return (
    <Card className="flex p-4 flex-col gap-4 items-stretch">
      <SectionTitle title="Pricing" />
      <div className="flex w-[66%] gap-4">
        <Input
          id="price"
          disabled={loading}
          label="Price"
          placeholder="0.00"
          type="number"
          value={product.price}
          onChange={(e) =>
            setProduct({ ...product, price: Number(e.target.value) })
          }
          icon={<Text>SR </Text>}
        />
        <Input
          id="compare-at-price"
          value={product.compareAtPrice}
          disabled={loading}
          label="Compare-at Price"
          placeholder="0.00"
          type="number"
          onChange={(e) =>
            setProduct({ ...product, compareAtPrice: Number(e.target.value) })
          }
          icon={<Text>SR </Text>}
        />
      </div>
      <Checkbox
        id="charge-taxes"
        disabled={loading}
        label="Charge Taxes on this Product"
        checked={product.chargeTaxes}
        onChange={(e) =>
          setProduct({ ...product, chargeTaxes: e.target.checked })
        }
      />
      <div className="flex gap-4 mt-4">
        <Input
          disabled={loading}
          id="cost-per-item"
          label="Cost per Item"
          placeholder="0.00"
          type="number"
          value={product.costPerItem}
          onChange={(e) =>
            setProduct({ ...product, costPerItem: Number(e.target.value) })
          }
          icon={<Text>SR </Text>}
        />
        <Input
          id="profit"
          disabled={true}
          value={product.profit}
          label="Profit"
          placeholder="--"
          type="number"
          onChange={(e) =>
            setProduct({ ...product, profit: Number(e.target.value) })
          }
          icon={<Text>SR </Text>}
        />
        <Input
          id="margin"
          disabled={true}
          label="Margin"
          value={product.margin}
          placeholder="--"
          type="number"
          onChange={(e) =>
            setProduct({ ...product, margin: Number(e.target.value) })
          }
          icon={<Text>% </Text>}
        />
      </div>
    </Card>
  );
}
