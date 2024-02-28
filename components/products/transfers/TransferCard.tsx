import { Transfer } from "@/types/transfer";
import StatusText from "@/components/StatusText";
import Link from "next/link";

const TransferCard = ({ transfer }: { transfer: Transfer }) => {
  return (
    <Link href={`/products/transfers/${transfer._id}`}>
      <div className="sm:hidden flex flex-col border-t gap-1 bg-white text-neutral-600 p-4 font-medium cursor-pointer">
        <div className="flex justify-between items-center">
          <div className="text-lg font-medium text-neutral-900">
            {transfer.referenceNumber}
          </div>
          <div className="text-sm font-medium text-neutral-600">
            <StatusText status={transfer.status} />
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div className="text-sm font-medium text-neutral-700">
            {transfer.destination.name}
          </div>
          <div className="text-sm font-medium text-neutral-700">1 of 1</div>
        </div>
      </div>
    </Link>
  );
};

export default TransferCard;
