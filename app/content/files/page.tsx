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
import { fi } from "date-fns/locale";
import TransparentButton from "@/components/TransparentButton";
import OuterLink from "@/components/Link";
import { AddModal } from "@/components/modals/ContainerBarModals/AddModal";
import { SortPopover } from "@/components/popovers/ContainerbarPopover";
import CardTopBar from "@/components/CardTopBar";
import UploadTable from "@/components/Content/UploadTable";

const Files = () => {
  return (
    <>
      {/* <div className="flex justify-between items-center mb-3">
        <Heading className="pb-0">Files</Heading>
        <div>
          <FilledButton>Upload File</FilledButton>
        </div>
      </div>
      <Card >
        <CardTopBar />
        <div className="flex flex-col items-center justify-center py-16">
          <Image
            src="/Upload_Image.svg"
            width={226}
            height={226}
            alt="Metaobjects Image"
          />
          <Title>Upload and manage your files</Title>
          <Text className="text-center py-4">
            Files can be images, videos, documents, and more.
          </Text>
          <TransparentButton>Upload File</TransparentButton>
        </div>
      </Card>
      <OuterText>
        Learn more about <OuterLink>files</OuterLink>
      </OuterText> */}
      <div className="flex justify-between items-center mb-3">
        <Heading className="pb-0">Files</Heading>
        <div>
          <FilledButton>Upload File</FilledButton>
        </div>
      </div>
      <Card >
        <CardTopBar />
        <UploadTable/>
      </Card>
      <OuterText>
        Learn more about <OuterLink>files</OuterLink>
      </OuterText>
    </>
  )
}

export default Files
