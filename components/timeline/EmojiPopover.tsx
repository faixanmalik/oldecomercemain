import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import EmojiPicker from "emoji-picker-react";

import { SmileyHappyMajor } from "@shopify/polaris-icons";

import { useState } from "react";

const EmojiPopover = ({ addEmoji }: { addEmoji: any }) => {
  const [open, setOpen] = useState(false);
  return (
    <Popover open={open}>
      <PopoverTrigger
        onClick={() => {
          setOpen(!open);
        }}
      >
        <SmileyHappyMajor className="w-5 h-5 fill-neutral-500" />
      </PopoverTrigger>
      <PopoverContent className="!p-0 !shadow-none rounded-lg">
        <EmojiPicker
          onEmojiClick={(e, emoji) => {
            addEmoji(e, emoji);
            setOpen(false);
          }}
        />
      </PopoverContent>
    </Popover>
  );
};

export default EmojiPopover;
