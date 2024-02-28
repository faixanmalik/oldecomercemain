import Checkbox from "@/components/Checkbox";

const DraftCard = ({ order, last }: { order?: any; last?: boolean }) => {
  return (
    <div
      className={`flex items-center justify-between py-3 px-4 bg-white ${
        last && "md:rounded-b-xl"
      }`}
    >
      <div className="flex items-center text-gray-600">
        <div className="hidden md:block">
          <Checkbox checked={false} id={order._id} onChange={() => {}} />
        </div>
        <div className="md:ml-3 flex flex-col gap-1">
          <p className="font-semibold">#D{order._id}</p>
          <p className="text-sm">{order.createdAt}</p>
          <p className="text-sm">{order.customer.name}</p>

          <div className="flex md:hidden items-center rounded-xl px-2 py-1 gap-2 bg-gray-100">
            <span className="rounded-full outline-1 p-1.5 bg-gray-500"></span>
            <p className="text-gray-500 text-xs">{order.status}</p>
          </div>
        </div>
      </div>

      <div className="hidden md:flex items-center rounded-xl px-2 py-1 gap-2 bg-gray-100">
        <span className="rounded-full outline-1 p-1.5 bg-gray-500"></span>
        <p className="text-gray-500 text-xs">{order.status}</p>
      </div>

      <div className="flex md:items-center items-top">
        <p className="text-sm text-gray-500">{order.total}</p>
      </div>
    </div>
  );
};

export default DraftCard;
