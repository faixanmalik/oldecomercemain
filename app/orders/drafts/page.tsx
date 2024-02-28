// pages/orders.tsx
import EmptyPage from "@/components/EmptyPage";
import Heading from "@/components/Heading";
import FilledButton from "@/components/buttons/FilledButton";
import OutlinedButton from "@/components/buttons/OutlinedButton";
import Datatable from "@/components/orders/drafts/Datatable";
import Link from "next/link";

const DraftOrders = () => {
  return (
    // <EmptyPage
    //   heading="Draft Orders"
    //   title="Draft orders will show here"
    //   text="Create draft orders to take orders over the phone, email invoices to customers, and collect payments."
    //   img="/orders-draft.svg"
    // />

    <div className="p-0 md:p-5">
      <div className="flex p-5 md:p-0 md:pb-5 justify-between items-center">
        <Heading>Drafts</Heading>

        <div>
          <OutlinedButton className="mr-2">Export</OutlinedButton>
          <Link href="/orders/new">
            <FilledButton>Create Order</FilledButton>
          </Link>
        </div>
      </div>
      <Datatable />
    </div>
  );
};

export default DraftOrders;
