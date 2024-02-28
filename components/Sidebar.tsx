"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

import {
  HomeFilledMinor,
  OrdersFilledMinor,
  ProductsFilledMinor,
  AnalyticsFilledMinor,
  MarketingFilledMinor,
  DiscountsFilledMinor,
  ContentFilledMinor,
  CustomersFilledMinor,
  ArrowRightMinor,
} from "@shopify/polaris-icons";

import { useHeaderStore, HeaderStoreType } from "@/store/HeaderStore";

interface subMenu {
  label: string;
  link: string;
}
interface MenuItem {
  label: string;
  icon: any;
  link: string;
  subMenu?: subMenu[]; // Submenu items
}

const ordersMenu: subMenu[] = [
  { label: "Drafts", link: "/orders/drafts" },
  {
    label: "Abandoned Checkouts",
    link: "/orders/abandoned_checkouts",
  },
];

const ContentMenu: subMenu[] = [
  { label: "Metaobjects", link: "/content/metaobjects" },
  { label: "Files", link: "/content/files" },
];

const productsMenu: subMenu[] = [
  { label: "Collections", link: "/products/collections" },
  { label: "Inventory", link: "/products/inventory" },
  { label: "Purchase Orders", link: "/products/purchase_orders" },
  { label: "Transfers", link: "/products/transfers" },
  { label: "Gift Cards", link: "/products/gift_cards" },
];

const menuItems: MenuItem[] = [
  { label: "Home", icon: HomeFilledMinor, link: "/home" },
  {
    label: "Orders",
    icon: OrdersFilledMinor,
    link: "/orders",
    subMenu: ordersMenu,
  },
  {
    label: "Products",
    icon: ProductsFilledMinor,
    link: "/products",
    subMenu: productsMenu,
  },
  { label: "Customers", icon: CustomersFilledMinor, link: "/customers" },
  {
    label: "Content",
    icon: ContentFilledMinor,
    link: "/content",
    subMenu: ContentMenu,
  },
  { label: "Analytics", icon: AnalyticsFilledMinor, link: "/analytics" },
  { label: "Marketing", icon: MarketingFilledMinor, link: "/marketing" },
  { label: "Discounts", icon: DiscountsFilledMinor, link: "/discounts" },
];

const Sidebar: React.FC = () => {
  const [lineStyle, setLineStyle] = useState({});
  const [openSubMenu, setOpenSubMenu] = useState<string | null>(null);
  const pathname = usePathname();

  const { setHandleDiscard, setHandleSave, setText, setDisabledSave } =
    useHeaderStore((state: unknown) => state as HeaderStoreType);

  useEffect(() => {
    setHandleSave(null);
    setHandleDiscard(null);
    setText("");
    setDisabledSave(true);
  }, [pathname]);

  const menuPath: any = pathname.split("/").slice(0, 2).join("/");
  const subMenuPath: any = pathname.split("/").length > 2 ? pathname : null;

  const toggleSubMenu = (link: string) => {
    setOpenSubMenu(link === openSubMenu ? null : link);
  };

  const isSubMenuOpen = (link: string) => {
    return link === openSubMenu;
  };

  const isCurrentPath = (link: string) => {
    return link === pathname;
  };

  const handleBaseLinkClick = (link: string) => {
    setOpenSubMenu(link === openSubMenu ? null : link);
  };

  const drawLine = (startId: string, targetId: string) => {
    const start = document.getElementById(startId);
    const target = document.getElementById(targetId);

    if (start && target) {
      const x =
        target.getBoundingClientRect().right -
        target.getBoundingClientRect().right / 2;
      const y1 = start.getBoundingClientRect().bottom;
      const y2 = target.getBoundingClientRect().top;

      const length = y2 - y1;

      const style = {
        position: "fixed",
        marginLeft: "2px",
        top: `${y1}px`,
        left: `${x + 6}px`,
        height: `${length + 8}px`,
        width: "1.5px",
        backgroundColor: "#d1d5db",
      };

      setLineStyle(style);
    } else {
      setLineStyle({
        display: "none",
      });
    }
  };

  useEffect(() => {
    drawLine(menuPath, subMenuPath);

    if (subMenuPath) {
      const subMenu = document.getElementById(subMenuPath);
      if (subMenu) {
        subMenu.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }

    window.addEventListener("resize", () => drawLine(menuPath, subMenuPath));
    return () =>
      window.removeEventListener("resize", () =>
        drawLine(menuPath, subMenuPath)
      );
  }, [menuPath, subMenuPath]);

  return (
    <div className="bg-[#ebebeb] fixed w-60 md:w-[25vw] lg:w-60 h-[100%]">
      <div style={lineStyle}></div>
      <nav className="pt-4">
        {menuItems.map((menuItem, index) => (
          <div key={index}>
            <Link href={menuItem.link} passHref>
              <div
                id={menuItem.link}
                className={`flex items-center ${
                  isCurrentPath(menuItem.link)
                    ? "bg-white text-gray-800"
                    : "hover:bg-gray-100 text-gray-600 hover:text-gray-800"
                } text-sm font-semibold mx-3 py-[5px] px-2 rounded-md cursor-pointer`}
                onClick={() => {
                  handleBaseLinkClick(menuItem.link);
                }}
              >
                {React.createElement(menuItem.icon, {
                  className: "mr-2.5 w-5 h-5 fill-gray-600",
                })}
                {menuItem.label}
              </div>
            </Link>
            {menuItem.subMenu && isSubMenuOpen(menuItem.link) && (
              <div className="mx-3">
                {menuItem.subMenu.map((subMenuItem, subIndex) => (
                  <Link key={subIndex} href={subMenuItem.link} passHref>
                    <div
                      className={`${
                        isCurrentPath(subMenuItem.link)
                          ? "bg-gray-50 text-gray-800"
                          : "hover:bg-gray-50 text-gray-600 font-medium hover:text-gray-800"
                      } text-xs py-[5px] flex gap-2 px-2 rounded-md cursor-pointer`}
                    >
                      <ArrowRightMinor
                        id={subMenuItem.link}
                        className={`mr-2.5 ml-2 w-4 h-4 opacity-0 fill-gray-400 ${
                          isCurrentPath(subMenuItem.link) ? "opacity-100" : ""
                        }`}
                      />
                      {subMenuItem.label}
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
