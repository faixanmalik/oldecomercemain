import React, { useEffect } from "react";
import Card from "@/components/Card";
import SectionTitle from "@/components/SectionTitle";
import { ApiVariant } from "@/types/product";
import Checkbox from "@/components/Checkbox";
import Text from "@/components/Text";
import { Location } from "@/types/location";
import Input from "@/components/Input";
import EditLocationsDialog from "../../dialogs/EditLocationsDialog";
import { getLocation } from "@/lib/utils";
import { defaultApiInventoryLevel } from "@/lib/products/utils";
import UnavailableInventoryPopover from "../../inventory/popovers/UnavailableInventoryPopover";
import CommittedInventoryPopover from "../../inventory/popovers/CommittedInventoryPopover";
import { SettingsPopover } from "../../inventory/InventoryQuantityInput";
import { IoIosArrowDown } from "react-icons/io";

export default function Inventory({
  loading,
  locations,
  variant,
  showDatatable = false,
  setVariant
}: {
  loading: boolean;
  locations: Location[],
  variant: ApiVariant,
  showDatatable?: boolean,
  setVariant: React.Dispatch<React.SetStateAction<ApiVariant>>;
}) {

  useEffect(() => console.log(variant.inventoryLevels), [variant.inventoryLevels])

  return (
    <Card className=" flex-col flex p-4 gap-4">
      <SectionTitle title="Inventory" />

      <Checkbox
        id="tarck-quantity"
        disabled={loading}
        label="Track Quantity"
        checked={variant.trackQuantity}
        onChange={(e) =>
          setVariant({ ...variant, trackQuantity: e.target.checked })
        }
      />

      <div className="w-full flex justify-between mt-4">
        <Text className="font-bold text-gray-800">Quantity</Text>
        <EditLocationsDialog initialLocations={variant.inventoryLevels.map(il => il.location)} locations={locations} onSave={ls => setVariant({ ...variant, inventoryLevels: ls.map(l => ({ ...defaultApiInventoryLevel, location: l._id })) })} />
      </div>

      {showDatatable ? <InventoryTable variant={variant} /> : (
        <div className=" flex flex-col gap-2 border-t border-gray-200 pt-4">
          {
            variant.inventoryLevels.map(il => getLocation(il.location, locations)).map(l => (
              <div key={l._id} className="flex items-center justify-between w-full">
                <Text className="text-gray-800">{l.name}</Text>
                <div className="w-40 flex justify-end">
                  {
                    variant.trackQuantity ? (
                      <Input id={variant.name + l._id} onChange={e => setVariant({ ...variant, inventoryLevels: variant.inventoryLevels.map(il => il.location === l._id ? { ...il, available: Number(e.target.value) } : il) })} />
                    ) : (
                      <Text>Not tracked</Text>
                    )
                  }
                </div>
              </div>
            ))
          }
        </div>
      )}

      {variant.trackQuantity && (
        <Checkbox
          id="continue-selling-when-out-of-stock"
          disabled={loading}
          label="Continue selling when out of stock"
          checked={variant.continueSellingWhenOutOfStock}
          onChange={(e) =>
            setVariant({ ...variant, continueSellingWhenOutOfStock: e.target.checked })
          }
        />
      )}

      <Checkbox
        id="has-sku"
        disabled={loading}
        label="This variant has a SKU or barcode"
        checked={variant.hasSku}
        onChange={(e) =>
          setVariant({ ...variant, hasSku: e.target.checked })
        }
      />

      {
        variant.hasSku && (
          <div className=" flex w-full gap-4">
            <Input id="variant-sku" label="SKU (Stock Keeping Unit)" value={variant.sku} onChange={e => setVariant({ ...variant, sku: e.target.value })} />
            <Input id="variant-barcode" label="Barcode (ISBN, UPC, GTIN, etc.)" value={variant.barcode} onChange={e => setVariant({ ...variant, barcode: e.target.value })} />
          </div>
        )
      }

    </Card>
  );
}

function InventoryTable({ variant }: { variant: ApiVariant }) {

  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="w-80 py-3">
              Location
            </th>
            <th scope="col" className="px-6 py-3">
              Unavailable
            </th>
            <th scope="col" className="px-6 py-3">
              Committed
            </th>
            <th scope="col" className="px-6 py-3">
              Available
            </th>
            <th scope="col" className="px-6 whitespace-nowrap py-3">
              On hand
            </th>
          </tr>
        </thead>
        <tbody>
          {
            variant.inventoryLevels.map((il, i) => (

              <tr key={i} className="bg-white inventory-table-row text-gray-800 border-b dark:bg-gray-800 dark:border-gray-700">
                <td className="py-4 whitespace-nowrap">
                  <Text className="text-gray-800">{il.location}</Text>
                </td>
                <td className="px-6 py-2">
                  <UnavailableInventoryPopover inventoryLevel={il} />
                </td>
                <td className="px-6 py-2">
                  <CommittedInventoryPopover quantity={il.committed || 0} />
                </td>
                <td className="px-6 py-2">
                  <SettingsPopover originalQuantity={il.available} extendedPopover={true} onChange={() => {
                  }} Icon={
                    <div className="flex gap-2"><Text className="text-gray-800 icon transition-all">{il.available}</Text><IoIosArrowDown size={14} className="text-gray-800" /></div>
                  } />
                </td>
                <td className="px-6 py-2">
                  <SettingsPopover originalQuantity={il.onHand || 0} extendedPopover={false} onChange={() => {
                  }} Icon={
                    <div className="flex gap-2"><Text className="text-gray-800 icon transition-all">{il.onHand || 0}</Text><IoIosArrowDown size={14} className="text-gray-800" /></div>
                  } />
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>

  )
}


