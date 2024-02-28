import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ApiProduct } from "@/types/product";
import { BsThreeDotsVertical } from "react-icons/bs";
import ManageSalesChannelsDialog from "../dialogs/ManageSalesChannelsDialog";
import { SalesChannel } from "@/types/salesChannel";
import ManageMarketsDialog from "../dialogs/ManageMarketsDialog";
import { Market } from "@/types/market";
import PopoverButton from "@/components/buttons/PopoverButton";

export default function ManagePublishingPopover({
  product,
  setProduct,
  markets,
  salesChannels,
}: {
  product: ApiProduct;
  salesChannels: SalesChannel[];
  markets: Market[];
  setProduct: React.Dispatch<React.SetStateAction<ApiProduct>>;
}) {
  return (
    <Popover>
      <PopoverTrigger className="w-min">
        <PopoverButton className="hover:bg-gray-200/75 grid place-items-center">
          <BsThreeDotsVertical className="text-gray-800 " size={16} />
        </PopoverButton>
      </PopoverTrigger>
      <PopoverContent className="w-max whitespace-nowrap p-2 rounded-xl">
        <div className="flex flex-col gap-1 w-full items-start">
          <ManageSalesChannelsDialog
            salesChannels={salesChannels}
            initiallySelectedChannels={product.salesChannels}
            onSave={(selectedChannels) =>
              setProduct({ ...product, salesChannels: selectedChannels })
            }
          />
          <ManageMarketsDialog
            markets={markets}
            initiallySelectedMarkets={
              product.markets.filter((m) => !!m) as string[]
            }
            onSave={(selectedMarkets) =>
              setProduct({ ...product, markets: selectedMarkets })
            }
          />
        </div>
      </PopoverContent>
    </Popover>
  );
}
