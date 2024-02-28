// pages/discounts.tsx
import React from "react";
import Link from "next/link";
import Heading from "@/components/Heading";
import Card from "@/components/Card";
import Image from "next/image";
import Title from "@/components/Title";
import Text from "@/components/Text";
import FilledButton from "@/components/buttons/FilledButton";
import OutlinedButton from "@/components/buttons/OutlinedButton";

const DiscountsPage = () => {
  return (
    <div className="p-5">
      <div className="flex justify-between items-center">
        <Heading>Discounts</Heading>
        <div className="flex justify-center items-center gap-5 mb-5">
          <OutlinedButton>Export</OutlinedButton>
          <FilledButton>Create Discount</FilledButton>
        </div>
      </div>
      <Card className="flex flex-col items-center justify-center py-16">
        <Image
          src="/discount-img.svg"
          width="250"
          height="250"
          alt="Discounts Image"
        />
        <Title>Manage discounts and promotions</Title>
        <Text className="text-center pb-4 w-96">
          Create discount codes and automatic discounts that apply at checkout.
          You can also use discounts with compare at prices.
        </Text>
        <FilledButton>Create Discount</FilledButton>
      </Card>
      <div className="mt-3 text-sm text-gray-800 flex justify-center items-center">
        Learn more about discounts
      </div>
    </div>
  );
};

export default DiscountsPage;
