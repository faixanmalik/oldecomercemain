import Heading from "@/components/Heading";
import Card from "@/components/Card";
import Image from "next/image";
import Title from "@/components/Title";
import Text from "@/components/Text";
import LinkMini from "@/components/LinkMini";
import Datatable from "@/components/products/gift_cards/Datatable";
import HeaderButtons from "@/components/products/gift_cards/HeaderButtons";
import { apiUrl } from "@/lib/utils";
import { GiftCard } from "@/types/giftCard";
import FilledButton from "@/components/buttons/FilledButton";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function CreateGiftCardPage() {
  const res = await fetch(apiUrl("/api/products/gift_cards"), {
    cache: "no-cache",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch gift cards");
  }
  const giftCards: GiftCard[] = await res.json();

  return (
    <div className="bg-gray-100 min-h-screen md:px-8 py-8">
      <div className=" w-full flex justify-between px-4 md:px-0">
        <Heading className="whitespace-nowrap">Gift Cards</Heading>
        <div className="flex items-center gap-2">
          <HeaderButtons />
          <FilledButton>
            <Link href="/products/gift_cards/new">Create Gift Card</Link>
          </FilledButton>
        </div>
      </div>
      <div className="h-8" />

      {giftCards && giftCards.length > 0 ? (
        <Datatable initialGiftCards={giftCards} />
      ) : (
        <Card className="flex flex-col items-center justify-center py-16">
          <Image
            src="/orders-home-img.svg"
            width="250"
            height="250"
            alt="No Orders Image"
          />
          <Title>Start selling gift cards</Title>
          <Text className="text-center pb-4 w-96">
            Add gift card products to sell or create gift cards and send them
            directly to your customers.
          </Text>
          <div className=" flex gap-4 w-min self-center whitespace-nowrap">
            <LinkMini href="gift_cards/new">Create Gift Card</LinkMini>
            <LinkMini href="gift_cards/new">Add Gift Card Product</LinkMini>
          </div>
        </Card>
      )}
    </div>
  );
}
