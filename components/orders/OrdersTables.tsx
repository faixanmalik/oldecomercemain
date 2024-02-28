// "use client";
//
// import Checkbox from "@/components/Checkbox";
// import StatusText from "@/components/StatusText";
// import { useRouter } from "next/navigation";
// import Card from "@/components/Card";
// import { Button } from "@/components/ui/button";
// import { FilterElements, HeaderItem, RowProps } from "@/types/datatable";
// import Datatable from "../Datatable";
// import { Order } from "@/types/order";
// import MobileRow from "./MobileRow";
//
// export default function OrdersDatable({
//   initialOrders,
// }: {
//   initialOrders: Order[];
// }) {
//   const router = useRouter();
//
//   function Row({ item: p, isSelected, setSelected }: RowProps<Order>) {
//     return (
//       <tr className="bg-white border-b hover:bg-gray-50 ">
//         <td className="w-4 p-4">
//           <Checkbox
//             id={"select-" + p._id}
//             checked={isSelected}
//             label=""
//             onChange={(e) => setSelected(e.target.checked)}
//           />
//         </td>
//
//         <th
//           scope="row"
//           onClick={() => router.push(`/products/${p._id}`)}
//           className="flex gap-1 items-center xl:min-w-[240px] py-4 font-medium text-gray-900 whitespace-nowrap cursor-pointer"
//         >
//           <p className="ml-4">{p._id!.substring(0, 4)}</p>
//         </th>
//
//         <td className="px-6 py-2">{p.date}</td>
//         <td className="px-6 py-2">
//           {p.customer?.firstName + " " + p.customer?.lastName}
//         </td>
//         <td className="px-6 py-2">{p.channel}</td>
//         <td className="px-6 py-2">{p.total}</td>
//         <td className="px-6 py-2">{p.payment_status}</td>
//         <td className="px-6 py-2">
//           {p.fulfillment_status && <StatusText status={p.fulfillment_status} />}
//         </td>
//         <td className="px-6 py-2">{p.products?.length ?? 0} items</td>
//         <td className="px-6 py-2">{p.delivery_status}</td>
//         <td className="px-6 py-2">{p.delivery_method}</td>
//         <td className="px-6 py-2">{p.tags?.join(", ")}</td>
//       </tr>
//     );
//   }
//
//   return (
//     <Datatable<Order>
//       initialItems={initialOrders}
//       sortPopoverProps={{
//         //TODO: fecth new `initialOrders` from API
//         onSelect: (value) => {
//           console.log(value);
//         },
//         options: [
//           { label: "Created", value: "createdAt" },
//           { label: "Expected arrival date", value: "shipping.arrivalDate" },
//           { label: "Supplier", value: "supplier.name" },
//           { label: "Destination", value: "destination.name" },
//           { label: "Status", value: "status" },
//         ],
//       }}
//       ActionsCard={ActionsCard}
//       MobileRow={
//         MobileRow as <RowComponentProps>(
//           props: RowComponentProps
//         ) => JSX.Element
//       }
//       Row={Row}
//       headerItems={getHeaderItems(initialOrders)}
//       views={["all", "active", "draft", "archived"]}
//       filters={getAllFilters()}
//     />
//   );
// }
//
// function ActionsCard() {
//   return (
//     <div className="py-4 min-w-full w-full grid bg-white place-items-center">
//       <Card className="px-4 py-2 flex gap-2">
//         <Button
//           variant="ghost"
//           className="p-2 bg-gray-200 text-black hover:bg-gray-300 h-min text-xs"
//           onClick={() => {}}
//         >
//           Add tags
//         </Button>
//         <Button
//           variant="ghost"
//           className="p-2 bg-gray-200 text-black hover:bg-gray-300 h-min text-xs"
//           onClick={() => {}}
//         >
//           Remove tags
//         </Button>
//       </Card>
//     </div>
//   );
// }
//
// function getHeaderItems(orders: any[]): HeaderItem<Order>[] {
//   return [
//     {
//       label: "Order",
//       sortable: true,
//       onSort: (sortKey) => {
//         let sortedOrders = [...orders];
//         switch (sortKey) {
//           case "desc":
//             sortedOrders.sort((a, b) =>
//               (a.referenceNumber ?? "").localeCompare(b.referenceNumber ?? "")
//             );
//             break;
//           case "asc":
//             sortedOrders.sort((a, b) =>
//               (b.referenceNumber ?? "").localeCompare(a.referenceNumber ?? "")
//             );
//             break;
//           default:
//             throw new Error("Sort type not allowed");
//         }
//         return sortedOrders;
//       },
//     },
//
//     {
//       label: "Expected arrival",
//       sortable: true,
//       onSort: (sortKey) => {
//         let sortedOrders = [...orders];
//         switch (sortKey) {
//           case "desc":
//             sortedOrders.sort((a, b) => {
//               if (a.date && b.date) {
//                 return new Date(a.date).getTime() - new Date(b.date).getTime();
//               }
//               return 0;
//             });
//             break;
//           case "asc":
//             sortedOrders.sort((a, b) => {
//               if (a.date && b.date) {
//                 return new Date(b.date).getTime() - new Date(a.date).getTime();
//               }
//               return 0;
//             });
//             break;
//           default:
//             throw new Error("Sort type not allowed");
//         }
//         return sortedOrders;
//       },
//     },
//
//     {
//       label: "Customer",
//       sortable: true,
//       onSort: (sortKey) => {
//         let sortedOrders = [...orders];
//         switch (sortKey) {
//           case "desc":
//             sortedOrders.sort((a, b) =>
//               a.customer.firstName.localeCompare(b.customer.firstName)
//             );
//             break;
//           case "asc":
//             sortedOrders.sort((a, b) =>
//               b.customer.firstName.localeCompare(a.customer.firstName)
//             );
//             break;
//           default:
//             throw new Error("Sort type not allowed");
//         }
//         return sortedOrders;
//       },
//     },
//
//     {
//       label: "Channel",
//       sortable: true,
//       onSort: (sortKey) => {
//         let sortedOrders = [...orders];
//         switch (sortKey) {
//           case "desc":
//             sortedOrders.sort((a, b) =>
//               (a.channel ?? "").localeCompare(b.channel ?? "")
//             );
//             break;
//           case "asc":
//             sortedOrders.sort((a, b) =>
//               (b.channel ?? "").localeCompare(a.channel ?? "")
//             );
//             break;
//           default:
//             throw new Error("Sort type not allowed");
//         }
//         return sortedOrders;
//       },
//     },
//
//     {
//       label: "Total",
//       sortable: true,
//       onSort: (sortKey) => {
//         let sortedOrders = [...orders];
//         switch (sortKey) {
//           case "desc":
//             sortedOrders.sort((a, b) => (a.total ?? 0) - (b.total ?? 0));
//             break;
//           case "asc":
//             sortedOrders.sort((a, b) => (b.total ?? 0) - (a.total ?? 0));
//             break;
//           default:
//             throw new Error("Sort type not allowed");
//         }
//         return sortedOrders;
//       },
//     },
//
//     {
//       label: "Payment status",
//       sortable: true,
//       onSort: (sortKey) => {
//         let sortedOrders = [...orders];
//         switch (sortKey) {
//           case "desc":
//             sortedOrders.sort((a, b) =>
//               (a.payment_status ?? "").localeCompare(b.payment_status ?? "")
//             );
//             break;
//           case "asc":
//             sortedOrders.sort((a, b) =>
//               (b.payment_status ?? "").localeCompare(a.payment_status ?? "")
//             );
//             break;
//           default:
//             throw new Error("Sort type not allowed");
//         }
//         return sortedOrders;
//       },
//     },
//
//     {
//       label: "Fullfilment status",
//       sortable: true,
//       onSort: (sortKey) => {
//         let sortedOrders = [...orders];
//         switch (sortKey) {
//           case "desc":
//             sortedOrders.sort((a, b) =>
//               (a.fulfillment_status ?? "").localeCompare(
//                 b.fulfillment_status ?? ""
//               )
//             );
//             break;
//           case "asc":
//             sortedOrders.sort((a, b) =>
//               (b.fulfillment_status ?? "").localeCompare(
//                 a.fulfillment_status ?? ""
//               )
//             );
//             break;
//           default:
//             throw new Error("Sort type not allowed");
//         }
//         return sortedOrders;
//       },
//     },
//
//     {
//       label: "Items",
//       sortable: true,
//       onSort: (sortKey) => {
//         let sortedOrders = [...orders];
//         switch (sortKey) {
//           case "desc":
//             sortedOrders.sort(
//               (a, b) => (a.items?.length ?? 0) - (b.items?.length ?? 0)
//             );
//             break;
//           case "asc":
//             sortedOrders.sort(
//               (a, b) => (b.items?.length ?? 0) - (a.items?.length ?? 0)
//             );
//             break;
//           default:
//             throw new Error("Sort type not allowed");
//         }
//         return sortedOrders;
//       },
//     },
//
//     { label: "Delivery status", sortable: false },
//     { label: "Delivery method", sortable: false },
//     { label: "Tags", sortable: false },
//   ];
// }
//
// function getAllFilters(): FilterElements {
//   // TODO: create popovers
//   return {
//     "Delivery method": <div>Delivery method</div>,
//     Destination: <div>Destination</div>,
//     Status: <div>Status</div>,
//     "Payment status": <div>Payment status</div>,
//     Product: <div>Product</div>,
//     "Fullfilment status": <div>Fullfilment status</div>,
//     "Delivery status": <div>Delivery status</div>,
//     "Return status": <div>Return status</div>,
//     "Tagged with": <div>Tagged with</div>,
//     "Not tagged with": <div>Not tagged with</div>,
//     App: <div>App</div>,
//     Channel: <div>Channel</div>,
//     "Chargeback and inquiry status": <div>Chargeback and inquiry status</div>,
//     "Risk level": <div>Risk level</div>,
//     Date: <div>Date</div>,
//     "Credit card (Last four digits)": <div>Credit card (Last four digits)</div>,
//     "Label status": <div>Label status</div>,
//     "Discount code": <div>Discount code</div>,
//   };
// }
