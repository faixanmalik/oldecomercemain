import { ApiProduct } from "@/types/product";
import Card from "../Card";
import SectionTitle from "../SectionTitle";
import Checkbox from "../Checkbox";
import Input from "../Input";
import Text from "../Text";
import EditLocationsDialog from "./dialogs/EditLocationsDialog";
import { Location } from "@/types/location";
import { getLocation } from "@/lib/utils";
import { defaultApiInventoryLevel } from "@/lib/products/utils";

export default function Inventory({
  loading,
  locations,
  product,
  setProduct,
}: {
  loading: boolean;
  locations: Location[];
  product: ApiProduct;
  setProduct: React.Dispatch<React.SetStateAction<any>>;
}) {
  return (
    <Card className=" flex-col flex p-4 gap-4">
      <SectionTitle title="Inventory" />
      <Checkbox
        id="tarck-quantity"
        disabled={loading}
        label="Track Quantity"
        onChange={(e) =>
          setProduct({ ...product, trackQuantity: e.target.checked })
        }
      />

      <div className="flex w-full items-center mt-2 border-b pb-2 justify-between">
        <Text className="text-gray-800 !text-sm font-semibold">Quantity</Text>
        <EditLocationsDialog
          initialLocations={product.inventoryLevels.map((il) => il.location)}
          locations={locations}
          onSave={(ls) =>
            setProduct({
              ...product,
              inventoryLevels: ls.map((l) => ({
                ...defaultApiInventoryLevel,
                location: l._id,
              })),
            })
          }
        />
      </div>

      <div className="flex flex-col gap-2 w-full">
        {product.inventoryLevels.map((il, i) => (
          <div key={i} className="flex items-center justify-between w-full">
            <Text className="text-gray-800 !text-sm whitespace-nowrap">
              {getLocation(il.location, locations).name}
            </Text>
            <div className="w-full" />
            {product.trackQuantity ? (
              <Input
                type="number"
                id={il.location + "quantity"}
                className="w-32 p-1.5 pl-3"
                value={il.available}
                onChange={(e) =>
                  setProduct({
                    ...product,
                    inventoryLevels: product.inventoryLevels.map((_il) =>
                      _il.location === il.location
                        ? { ..._il, available: Number(e.target.value) }
                        : _il
                    ),
                  })
                }
              />
            ) : (
              <Text className="!text-sm text-gray-600 whitespace-nowrap">
                Not Tracked
              </Text>
            )}
          </div>
        ))}
      </div>
      {product.trackQuantity && (
        <Checkbox
          id="continue-selling-when-out-of-stock"
          disabled={loading}
          label="Continue selling when out of stock"
          onChange={(e) =>
            setProduct({
              ...product,
              continueSellingWhenOutOfStock: e.target.checked,
            })
          }
        />
      )}
      <Checkbox
        id="has-sku"
        disabled={loading}
        label="This product has a SKU or barcode"
        onChange={(e) => setProduct({ ...product, hasSku: e.target.checked })}
      />

      {product.hasSku && (
        <div className=" w-full flex gap-4 mt-4">
          <Input
            id="product-sku"
            disabled={loading}
            label="SKU (Stock Keeping Unit)"
            onChange={(e) => setProduct({ ...product, sku: e.target.value })}
          />
          <Input
            id="product-barcode"
            placeholder=""
            label="Barcode (ISBN, UPC, GTIN, etc.)"
            onChange={(e) =>
              setProduct({ ...product, barcode: e.target.value })
            }
          />
        </div>
      )}
    </Card>
  );
}
