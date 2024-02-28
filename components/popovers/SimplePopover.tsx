"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { MobileVerticalDotsMajor } from "@shopify/polaris-icons";

const SimplePopover = ({ children }: { children?: React.ReactNode }) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [popoverPosition, setPopoverPosition] = useState({ top: 0, left: 0 });
  const popoverRef = useRef<HTMLDivElement>(null);

  const handlePopoverClick = () => {
    setIsPopoverOpen(!isPopoverOpen);
  };

  const handleOutsideClick = useCallback(
    (e: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(e.target as Node)
      ) {
        setIsPopoverOpen(false);
      }
    },
    [popoverRef]
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [handleOutsideClick]);

  const calculatePopoverPosition = () => {
    if (popoverRef.current) {
      const buttonRect = popoverRef.current.getBoundingClientRect();
      const top = buttonRect.bottom + window.scrollY;
      const left = buttonRect.left + window.scrollX - 150; // Adjust this value as needed
      setPopoverPosition({ top, left });
    }
  };

  useEffect(() => {
    if (isPopoverOpen) {
      calculatePopoverPosition();
    }
  }, [isPopoverOpen]);

  return (
    <div className="absolute right-10">
      <button
        className="p-2 w-8 rounded-xl hover:bg-neutral-100 focus:outline-none focus:bg-neutral-100"
        onClick={handlePopoverClick}
      >
        <MobileVerticalDotsMajor />
      </button>
      {isPopoverOpen && (
        <div
          className="absolute z-50 flex flex-col gap-1 items-start bg-white shadow-md rounded-lg py-2 px-4 border border-gray-200"
          ref={popoverRef}
        >
          {children}
        </div>
      )}
    </div>
  );
};

export default SimplePopover;
