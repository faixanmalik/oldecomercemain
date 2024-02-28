import Text from "../Text";
import ManagePublishingPopover from "./popovers/ManagePublishingPopover";
import EditPublishmentDateDialog from "./dialogs/EditPublishmentDate";
import { SalesChannel } from "@/types/salesChannel";
import { ApiProduct } from "@/types/product";
import { Market } from "@/types/market";
import Card from "../Card";
import { RiDeleteBinLine } from "react-icons/ri";
import { GrSchedulePlay } from "react-icons/gr";
import { MdOutlineModeEdit } from "react-icons/md";
import React from "react";
import HollowDot from "../Small/HollowDot";
import SectionTitle from "../SectionTitle";

import { CalendarTimeMinor } from "@shopify/polaris-icons";

export function Publishing({
  salesChannels,
  markets,
  product,
  setProduct,
}: {
  salesChannels: SalesChannel[];
  product: ApiProduct;
  setProduct: React.Dispatch<React.SetStateAction<ApiProduct>>;
  markets: Market[];
}) {
  const [filteredMarkets, setFilteredMarkets] = React.useState<Market[]>([]);

  React.useEffect(() => {
    const newFilteredMarkets = markets.filter((m) =>
      product.markets.includes(m._id)
    );
    setFilteredMarkets(newFilteredMarkets);
  }, [product.markets, markets]);

  return (
    <Card className="flex flex-col p-4">
      <div className="flex w-full items-center justify-between">
        <SectionTitle title="Publishing" />
        <ManagePublishingPopover
          product={product}
          setProduct={setProduct}
          salesChannels={salesChannels}
          markets={markets}
        />
      </div>

      <div className="flex flex-col gap-1 mt-2">
        <Text className="!text-gray-700 !text-[0.8em] font-medium">
          Sales channel
        </Text>
        <div className="flex flex-col w-full">
          {salesChannels.map((sc) => (
            <div
              key={sc._id}
              className="flex w-full justify-between items-center"
            >
              <div className="flex flex-col gap-2">
                <Text className="text-gray-800 flex gap-2 items-center !text-[0.8em]">
                  <HollowDot color="border-gray-600" />
                  {sc.name}
                </Text>
                {product.scheduledDates && product.scheduledDates[sc._id] && (
                  <Text className="text-gray-600 pl-4 !text-[0.8em] py-0.5 ">
                    Scheduled for{" "}
                    {new Date(
                      product.scheduledDates[sc._id]
                    ).toLocaleDateString()}
                  </Text>
                )}
              </div>
              <div className="flex self-end">
                <EditPublishmentDateDialog
                  icon={
                    product.scheduledDates && product.scheduledDates[sc._id] ? (
                      <MdOutlineModeEdit
                        size={16}
                        className="text-gray-600 hover:text-black transition-all"
                      />
                    ) : (
                      <CalendarTimeMinor className="fill-gray-600 h-5 w-5 hover:fill-black transition-all" />
                    )
                  }
                  onSave={async (date) => {
                    if (date) {
                      setProduct({
                        ...product,
                        scheduledDates: {
                          ...product.scheduledDates,
                          [sc._id]: date.toString(),
                        },
                      });
                    }
                  }}
                />
                {product.scheduledDates && product.scheduledDates[sc._id] && (
                  <button
                    className="text-gray-500 hover:text-gray-800"
                    onClick={() => {
                      const newProduct = { ...product };
                      delete newProduct.scheduledDates[sc._id];
                      setProduct(newProduct);
                    }}
                  >
                    <RiDeleteBinLine size={14} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
        <Text className="!text-gray-700 pt-2 !text-[0.8em] font-medium">
          Markets
        </Text>{" "}
        {filteredMarkets.length > 0 && (
          <div className="flex gap-2 items-center">
            <HollowDot color="border-gray-600" />

            <Text className="text-gray-800">
              {filteredMarkets.map((m) => m.name).join(" and ")}
            </Text>
          </div>
        )}
      </div>
    </Card>
  );
}
