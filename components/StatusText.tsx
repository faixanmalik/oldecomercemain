
export default function StatusText({ status, as: Component = 'p' }: { status: string, as?: any }) {
  let bgColor = 'bg-gray-100'

  switch (status.toLowerCase()) {
    case "received": bgColor = "bg-sky-200/80"; break;
    case "active": bgColor = "bg-[#b4fed2]"; break;
    case "draft": bgColor = "bg-orange-200/80"; break;
    case "ordered": bgColor = "bg-purple-200/80"; break;
    case "inactive": bgColor = "bg-red-200/80"; break;
    case "redeemed": bgColor = "bg-sky-200/80"; break;
    case "pending": bgColor = "bg-sky-200/80"; break;
    case "unfulfilled": bgColor = "bg-orange-200/80"; break;
    case "fulfilled": bgColor = "bg-[#b4fed2]"; break;
    case "cancelled": bgColor = "bg-red-200/80"; break;
    case "paid": bgColor = "bg-gray-200/80"; break;
    default: "bg-red-500/40"; break;
  }

  return (
    <Component className={`px-2 text-xs h-min leading-1 pb-[2px] font-normal text-[#0C5132] w-min whitespace-nowrap rounded-md capitalize ${bgColor}`}>{status}</Component>
  )
}
