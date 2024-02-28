"use client";

import React from "react";
import { AiOutlineBell, AiOutlineSearch } from "react-icons/ai";
import Image from "next/image";
import { IoMdClose, IoMdMenu } from "react-icons/io";
import Sidebar from "./Sidebar";

import { RiskMinor } from "@shopify/polaris-icons";

import { useHeaderStore, HeaderStoreType } from "@/store/HeaderStore";

const ShopifyHeader = () => {
  const [open, setOpen] = React.useState(false);
  const { handleSave, handleDiscard, text, disabledSave } = useHeaderStore(
    (state: unknown) => state as HeaderStoreType
  );

  return (
    <div className="fixed w-full z-50 bg-[#1a1a1a] text-white h-14 flex items-center justify-between px-4">
      {/* Logo */}
      <div className="hidden md:flex w-60 md:w-[25vw] lg:w-60 items-center gap-1">
        <Image
          src="/shopify-logo.svg"
          width={20}
          height={20}
          alt="Shopify Logo"
        />
        <Image
          src="/shopify-logo-text.svg"
          width={60}
          height={25}
          alt="Shopify Text Logo"
          className="self-end"
        />
      </div>

      {handleDiscard && handleSave ? (
        <></>
      ) : (
        <button className="sm:hidden" onClick={() => setOpen((v) => !v)}>
          {open ? (
            <IoMdClose className="text-2xl md:hidden" />
          ) : (
            <IoMdMenu className="text-2xl md:hidden" />
          )}
        </button>
      )}

      {handleDiscard && handleSave ? (
        <div className="flex justify-center flex-1">
          <div className="max-w-[1000px] flex-1 flex justify-between">
            <div className="flex text-sm gap-2 items-center text-neutral-200 font-medium">
              <RiskMinor className="fill-white w-5 h-5" />
              <p>{text}</p>
            </div>

            <div className="flex gap-2 items-center">
              <button
                onClick={handleDiscard}
                className="px-3 py-1.5 text-sm 
                bg-neutral-800 rounded-lg disabled:bg-neutral-600 hover:bg-neutral-700
                 disabled:text-neutral-500 disabled:cursor-not-allowed"
              >
                Discard
              </button>

              <button
                onClick={handleSave}
                disabled={disabledSave}
                className="px-3 py-1.5 text-sm 
              bg-neutral-800 rounded-lg disabled:bg-neutral-600 hover:bg-neutral-700
               disabled:text-neutral-500 disabled:cursor-not-allowed"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="flex lg:mr-60 md:mr-[25vw] px-2 border text-sm border-neutral-400 hover:border-white items-center md:w-[500px] w-full mx-4 gap-2 rounded-lg bg-[#303030]">
            <AiOutlineSearch className="text-neutral-400 text-lg" />
            <input
              type="text"
              placeholder="Search"
              className="py-[4px] w-full placeholder-neutral-400 text-white bg-transparent focus:outline-none"
            />
            <span className="w-16 text-neutral-400">Ctrl K</span>
          </div>

          <div className="flex items-center">
            <AiOutlineBell className="text-2xl" />
          </div>
        </>
      )}

      {open && (
        <div className="absolute h-screen w-full bg-black/20 z-50 top-12 left-0">
          <Sidebar />
        </div>
      )}
    </div>
  );
};

export default ShopifyHeader;
