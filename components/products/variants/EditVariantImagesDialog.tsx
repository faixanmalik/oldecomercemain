import React from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import OutlinedButton from "../../buttons/OutlinedButton";
import FilledButton from "../../buttons/FilledButton";
import Text from "../../Text";
import ImageUploader from "@/components/ImageUploader";
import Image from "next/image";
import { PiImagesSquareThin } from "react-icons/pi";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";

export default function EditVariantImagesDialog({
  onSave,
  image,
  altText,
  initialImages,
  text = "Update variant image",
  button,
}: {
  button?: React.ReactNode;
  image?: string | null;
  initialImages: string[];
  text?: string;
  altText: string;
  onSave: (selectedImage: string | null, newImages: string[]) => void;
}) {
  const [images, setImages] = React.useState<string[]>([]);
  const [open, setOpen] = React.useState(false);
  const [selectedImage, setSelectedImage] = React.useState<string | null>(
    image ?? null
  );

  const handleSelectImage = (url: string) => {
    if(selectedImage === url) {
      setSelectedImage(null)
    } else {
      setSelectedImage(url)
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        setImages([]);
        setOpen(v);
      }}
    >
      <DialogTrigger asChild>
        {button ? (
          button
        ) : (
          <button
            onClick={() => setOpen(true)}
            className={`rounded-md overflow-hidden grid self-center mr-2 hover:bg-gray-100 transition-all hover:border-gray-500 hover:text-gray-800 text-gray-300 place-items-center bg-white h-14 w-14 min-w-[56px] ${
              image ? "" : "border-2 border-gray-300 border-dashed "
            }`}
          >
            {image ? (
              <Image
                src={image}
                alt={altText}
                width={0}
                height={0}
                sizes="100vw"
                style={{ width: "100%", height: "100%" }}
              />
            ) : (
              <PiImagesSquareThin size={24} />
            )}
          </button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{text}</DialogTitle>
        </DialogHeader>

        <div className="overflow-y-scroll md:max-h-[70vh] max-h-[80vh] flex flex-col px-4 gap-4 my-4">
          <Text>You can only choose images as variant media</Text>

          <div className="w-full grid grid-cols-2 md:grid-cols-3 gap-2">
            <div className="aspect-square h-40">
              <ImageUploader
                onSave={(url: string) => setImages([...images, url])}
                text={
                  <Text className="text-gray-800 bg-gray-100 p-1 rounded-xl overflow-hidden">
                    Add image
                  </Text>
                }
              />
            </div>
            {initialImages.map((url) => {
              return (
                <div
                  key={url}
                  onClick={() => handleSelectImage(url)}
                  className={`h-40 w-40 cursor-pointer bg-gray-100 border-2 rounded-xl overflow-hidden relative ${
                    selectedImage === url
                      ? "border-blue-700"
                      : "hover:border-blue-700 border-white"
                  }`}
                >
                  <Image
                    src={url}
                    alt={altText}
                    width={0}
                    height={0}
                    sizes="100vw"
                    style={{ width: "100%", height: "100%" }}
                  />
                  {selectedImage === url && (
                    <IoIosCheckmarkCircleOutline
                      size={20}
                      className="bg-white rounded-full text-blue-700 absolute top-2 left-2"
                    />
                  )}
                </div>
              );
            })}
            {images.map((url) => {
              return (
                <div
                  key={url}
                  onClick={() => setSelectedImage(url)}
                  className={`h-40 w-40 bg-gray-100 border-2 rounded-xl overflow-hidden relative ${
                    selectedImage === url
                      ? "border-blue-700"
                      : "hover:border-blue-700 border-white"
                  }`}
                >
                  <Image
                    src={url}
                    alt={altText}
                    width={0}
                    height={0}
                    sizes="100vw"
                    style={{ width: "100%", height: "100%" }}
                  />
                  {selectedImage === url && (
                    <IoIosCheckmarkCircleOutline
                      size={20}
                      className="bg-white rounded-full text-blue-700 absolute top-2 left-2"
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <DialogFooter className="flex gap-2">
          <OutlinedButton
            onClick={() => {
              console.log("images", images);
              setOpen(false);
            }}
          >
            Cancel
          </OutlinedButton>
          <FilledButton
            onClick={() => {
              onSave(selectedImage, images);
              setOpen(false);
            }}
          >
            Done
          </FilledButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
