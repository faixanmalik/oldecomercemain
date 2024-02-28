import EmptyPage from "@/components/EmptyPage";

const DraftOrders = () => {
  return (
    <EmptyPage
      heading="Abandoned Checkouts"
      title="Abandoned checkouts will show here"
      text="See when customers put an item in their cart but don’t check out. You can also email customers a link to their cart."
      img="/abandoned-checkouts.svg"
    />
  );
};

export default DraftOrders;