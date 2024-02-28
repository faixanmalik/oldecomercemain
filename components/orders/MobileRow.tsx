import React from 'react';

interface Order {
    _id: string;
    date: string;
    customer: {
        name: string;
    };
    payment_status: string;
    fulfillment: string;
    items: number;
    total: string;
}

interface MobileRowProps {
    order: Order;
}

const MobileRow: React.FC<MobileRowProps> = ({ order }) => {
    return (
        <div className="flex flex-col">
            <p className="font-normal text-xs">
                #{order._id} • {order.date}
            </p>
            <p className="text-sm font-semibold">{order.customer.name}</p>
            <div className="flex">
                <div className="flex items-center rounded-xl px-2 py-1 gap-2 bg-gray-100">
                    <span className="rounded-full outline-1 p-1.5 bg-gray-500"></span>
                    <p className="text-gray-500 text-xs">{order.payment_status}</p>
                </div>
                <div className="flex items-center rounded-xl px-2 py-1 gap-2 bg-yellow-100">
                    <span className="rounded-full outline-1 p-1.5 bg-yellow-500"></span>
                    <p className="text-gray-500 text-xs">{order.fulfillment}</p>
                </div>
            </div>
            <p className="text-sm font-semibold">{order.items && order.items + " items • "}</p>
            <p className="text-sm font-semibold text-gray-500">{order.total}</p>
        </div>
    );
};

export default MobileRow;