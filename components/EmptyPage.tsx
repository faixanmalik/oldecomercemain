import Heading from "./Heading";
import Card from "./Card";
import Image from "next/image";
import Title from "./Title";
import Text from "./Text";
import FilledButton from "./buttons/FilledButton";
import Link from "next/link";

const EmptyPage = ({
  heading,
  title,
  text,
  img,
  children,
}: {
  heading: string;
  title: string;
  text: string;
  img: string;
  children?: React.ReactNode;
}) => {
  return (
    <div className="p-5">
      <Heading className="!pb-5">{heading}</Heading>
      <Card className="flex flex-col items-center justify-center py-16">
        <Image src={img} width="250" height="250" alt="No Orders Image" />
        <Title>{title}</Title>
        <Text className="text-center pb-4 w-52 sm:w-96">{text}</Text>

        {children}
      </Card>
    </div>
  );
};

export default EmptyPage;
