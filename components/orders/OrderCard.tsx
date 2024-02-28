import { Order } from "@/types/order";
import Link from "next/link";
import PillTag from "../Small/Pill";
import Dot from "../Small/Dot";
import HollowDot from "../Small/HollowDot";

const OrderCard = ({ order, last }: { order: Order; last?: any }) => {
  return (
    <Link href={`/orders/${order._id}`}>
      <div
        className={`flex md:hidden border-t items-center justify-between py-3 px-4 bg-white ${
          last && "md:rounded-b-xl"
        }`}
      >
        <div className="flex items-center text-gray-600">
          <div className="md:ml-3 flex flex-col gap-3">
            <p className="font-normal text-xs">
              #{order._id.slice(0, 4)} • {order.createdAt.slice(0, 10)}
            </p>
            <p className="text-sm font-semibold">
              {order.customer ? order.customer.firstName : "No customer"}
            </p>

            <div className="flex gap-2">
              <div className="w-min">
                <PillTag bgColor="bg-gray-200">
                  <Dot />
                  <p className="text-gray-500 text-xs font-medium">
                    {order.payment_status}
                  </p>
                </PillTag>
              </div>

              <div className="w-min">
                <PillTag
                  bgColor={
                    order.fulfillment_status === "Fulfilled"
                      ? ""
                      : order.fulfillment_status === "Unfulfilled"
                      ? "bg-yellow-300"
                      : "bg-orange-200"
                  }
                >
                  {order.fulfillment_status === "Fulfilled" ? (
                    <Dot />
                  ) : (
                    <HollowDot
                      color={
                        order.fulfillment_status === "Unfulfilled"
                          ? "border-[#998a00]"
                          : "border-orange-700"
                      }
                    />
                  )}

                  <p
                    className={`${
                      order.fulfillment_status === "Fulfilled"
                        ? "text-gray-500"
                        : order.fulfillment_status === "Unfulfilled"
                        ? "text-yellow-700"
                        : "text-orange-700"
                    } text-xs font-medium whitespace-nowrap`}
                  >
                    {order?.fulfillment_status
                      ? order.fulfillment_status.charAt(0).toUpperCase() +
                        order.fulfillment_status.slice(1)
                      : ""}
                  </p>
                </PillTag>
              </div>
            </div>

            <p className="text-sm font-semibold">
              {order.products && order.products.length + " items • "}
            </p>
          </div>
        </div>

        <div className="flex md:items-center items-top">
          <p className="text text-gray-500">SAR {order.total}</p>
        </div>
      </div>
    </Link>
  );
};

export default OrderCard;
