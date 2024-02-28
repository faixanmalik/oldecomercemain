"use client"

import React from "react";
import Link from "next/link";
import Heading from "@/components/Heading";
import Card from "@/components/Card";
import Image from "next/image";
import Title from "@/components/Title";
import Text from "@/components/Text";
import FilledButton from "@/components/buttons/FilledButton";
import LinkMini from "@/components/LinkMini";
import OuterText from "@/components/OuterText";
import TransparentButton from "@/components/TransparentButton";
import CardTopBar from "@/components/CardTopBar";
import MetaTable from "@/components/Content/Table";

const Metaobject = () => {
  return (
    // <div>
    //   <Heading className="my-3">Metaobjects</Heading>
    //   <Card className="flex flex-col items-center justify-center py-16">
    //     <Image
    //       src="/Metabjects_Image.svg"
    //       width={200}
    //       height={200}
    //       alt="Metaobjects Image"
    //     />
    //     <Title>Create your first metaobject definition</Title>
    //     <Text className="text-center pb-4 w-96">
    //       Metaobjects are a powerful way to add custom, multi-field objects to your store. Use them to display unique information like cart upsells, size guides, or product highlights.
    //     </Text>
    //     <Text className="text-center py-4">
    //       To add a single field, visit metafields.
    //     </Text>
    //     <LinkMini href={""}>Add defination</LinkMini>
    //   </Card>
    //   <OuterText>
    //     Learn more about metaobjects
    //   </OuterText>
    // </div>
    <div>
      <div className="flex justify-between items-center py-3">
        <Heading>Entries from:</Heading>
        <div className="flex gap-3">
          <TransparentButton>Upload File</TransparentButton>
          <FilledButton>Add Entry</FilledButton>
        </div>
      </div>
      <Card >
        <CardTopBar />
        <MetaTable />
      </Card>


    </div>
  )
}

export default Metaobject
