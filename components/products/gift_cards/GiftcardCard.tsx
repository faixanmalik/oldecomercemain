import { GiftCard } from "@/types/giftCard";
import Image from "next/image";
import StatusText from "@/components/StatusText";
import Link from "next/link";

const GiftCardCard = ({ giftCard }: { giftCard: GiftCard }) => {
  return (
    <Link href={`/products/gift_cards/${giftCard._id}`}>
      <div className="sm:hidden flex justify-between items-center px-4 border-t gap-1 bg-white text-neutral-600 p-4 font-medium cursor-pointer">
        <div className="flex flex-col justify-between items-start gap-2">
          <div className="flex gap-3 justify-center items-center">
            <div className="text-xs font-semibold text-neutral-900">
              {giftCard.code.substring(giftCard.code.length - 4)}{" "}
            </div>
            <div className="text-xs font-semibold text-neutral-900">
              {giftCard.createdAt.substring(0, 10)}
            </div>
          </div>
          <div className="text-xs font-semibold text-[#616161]">
            {giftCard.customer ? giftCard.customer.firstName : "No Recipient"}
          </div>
          <div className="text-md font-semibold ">
            <StatusText status={giftCard.status} />
          </div>
          <div className="text-xs font-semibold text-[#616161]">
            No Recipient
          </div>
        </div>
        <div className="flex flex-col justify-end items-end gap-2 ">
          <div className="text-xs font-semibold text-neutral-700">
            $ {giftCard.initialValue}.00
          </div>
          <Image
            src={"/ReportSvg.svg"}
            alt={""}
            width={20}
            height={20}
            style={{
              color: "#616161",
            }}
          />
        </div>
      </div>
    </Link>
  );
};

export default GiftCardCard;
