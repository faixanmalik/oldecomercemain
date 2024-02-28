"use client";

import {
  SmileyHappyMajor,
  HashtagMinor,
  AttachmentMajor,
  MentionMajor,
} from "@shopify/polaris-icons";

import OutlinedButton from "../buttons/OutlinedButton";

import { useEffect, useState } from "react";
import EmojiPopover from "./EmojiPopover";

export const Timeline = () => {
  const [comments, setComments] = useState([]) as any[];
  const [newComment, setNewComment] = useState<string>();
  const [lineStyle, setLineStyle] = useState({} as any);

  const addEmoji = (e: any, emoji: any) => {
    setNewComment((prev: any) => prev + e.emoji);
  };

  useEffect(() => {
    setComments(["Hello", "World"]);
  }, []);

  const drawLine = (startId: string, targetId: string) => {
    const start = document.getElementById(startId);
    const target = document.getElementById(targetId);

    if (start && target) {
      const x = target.getBoundingClientRect().left;
      const y1 = start.getBoundingClientRect().bottom;
      const y2 = target.getBoundingClientRect().top;

      const length = y2 - y1;

      const style = {
        position: "absolute",
        marginLeft: "2px",
        top: `${y1 + 55}px`,
        left: `${x + 1}px`,
        height: `${length}px`,
        width: "2px",
        backgroundColor: "#d1d5db",
      };

      console.log(style);

      setLineStyle(style);
    } else {
      setLineStyle({
        display: "none",
      });
    }
  };

  useEffect(() => {
    drawLine("timeline", "last-comment");
  }, [comments]);

  return (
    <div className="text-sm">
      <p className="font-medium pb-2 pl-2">Timeline</p>
      <div
        id="timeline"
        className="bg-white md:rounded-lg shadow-sm shadow-black/30"
      >
        <div className="flex p-4 items-center gap-4">
          <div className="w-10 h-10 bg-green-400 rounded-lg flex items-center justify-center">
            MA
          </div>

          <div>
            <input
              value={newComment}
              type="text"
              className="focus:outline-none placeholder:text-black"
              placeholder="Leave a comment..."
              onChange={(e) => setNewComment(e.target.value)}
            />
          </div>
        </div>

        <div className="p-4 flex justify-between md:rounded-b-lg bg-neutral-100">
          <div className="flex h-5 gap-2 fill-neutral-500">
            <EmojiPopover addEmoji={addEmoji} />
            <MentionMajor />
            <HashtagMinor />

            <input id="file-input" className="hidden" type="file" />
            <AttachmentMajor
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("file-input")?.click();
              }}
            />
          </div>

          <OutlinedButton
            disabled={!newComment}
            onClick={() => {
              setComments([...comments, newComment]);
              setNewComment("");
            }}
          >
            Post
          </OutlinedButton>
        </div>
      </div>
      <p className="w-full text-right text-xs text-gray-700 p-1">
        Only you and other staff can see comments
      </p>
      <div style={lineStyle}></div>

      <div className="pl-6 mt-8 flex flex-col gap-3">
        <p className="text-gray-700 text-xs font-medium pl-7">January 6</p>
        {comments.map((comment: any, index: any) => (
          <div
            key={index}
            className="flex items-center gap-4 p-1 text-gray-800"
          >
            <span
              id={index === comments.length - 1 ? "last-comment" : ""}
              className="rounded-[2.5px] w-2 h-2 z-10 bg-gray-600 outline outline-gray-300"
            />

            <div className="flex justify-between flex-1 pr-6">
              <p className="text-sm">{comment}</p>

              <p>{Date.now().toString().slice(0, 2)} January</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
