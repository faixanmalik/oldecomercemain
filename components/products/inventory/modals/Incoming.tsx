import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";

import Text from "@/components/Text";

import ArrowRight from "@/public/ArrowRight.svg";
import Link from "next/link";
import Image from "next/image";

const Incoming = () => {
  return (
    <Dialog>
      <DialogTrigger>
        <div className="flex bg-white py-4 border-b flex-col hover:bg-gray-100 rounded-lg">
          <div className="px-2 flex w-full justify-between items-center">
            <Text className="text-gray-800 capitalize">Incoming</Text>
            <div className="flex gap-2 items-center">
              <Text className="text-gray-800">1</Text>
              <Image
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                }}
                src={ArrowRight}
                alt="Arrow right"
              />
            </div>
          </div>
        </div>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-left">Incoming (0)</DialogTitle>
          <DialogClose />
        </DialogHeader>

        <div className="p-4 text-sm">
          Create <Link className="text-blue-500 underline" href="/products/transfers/new">transfer</Link> or{" "}
          <Link className="text-blue-500 underline" href="/products/purchase_orders/new">purchase order</Link>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Incoming;
