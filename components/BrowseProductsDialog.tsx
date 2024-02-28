import React, { useState } from "react";
import Image from "next/image";
import { IoIosArrowForward, IoIosArrowRoundBack } from "react-icons/io";
import { AiOutlineSearch } from "react-icons/ai";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Input from "@/components/Input";
import OutlinedButtonSmall from "./buttons/OutlinedButtonSmall";
import { Product, Variant } from "@/types/product";
import FilledButton from "./buttons/FilledButton";
import OutlinedButton from "./buttons/OutlinedButton";
import Text from "./Text";
import Checkbox from "./Checkbox";
import axios from "axios";
import toast from "react-hot-toast";
import Spinner from "./Spinner";

import { ImageMajor } from "@shopify/polaris-icons";

type Menu =
  | "Add Products"
  | "All Products"
  | "Popular Products"
  | "Collections"
  | "Product Types"
  | "Product Tags"
  | "Vendors"
  | "Selected Products";
type SubMenu = { title: string; params: URLSearchParams } | null;
type ListMenuItem = { _id: string; title: string };

export default function BrowseProductsDialog({
  defaultQuery = "",
  products,
  setProducts,
  selectedVariants,
  setSelectedVariants,
}: {
  defaultQuery?: string;
  products?: Product[];
  setProducts: (ps: Product[]) => void;
  selectedVariants?: any[];
  setSelectedVariants?: any;
}) {
  const [open, setOpen] = React.useState(false);
  const [activeMenu, setActiveMenu] = React.useState<Menu>("Add Products");
  const [activeSubMenu, setActiveSubMenu] = React.useState<SubMenu>(null);
  const [selectedProducts, setSelectedProducts] = React.useState<Product[]>([]);

  React.useEffect(() => {
    if (products) setSelectedProducts(products);
  }, [products]);

  function ActiveMenu() {
    if (activeSubMenu !== null) {
      switch (activeMenu) {
        case "Collections":
          return (
            <CollectionMenu
              subMenu={activeSubMenu}
              selectedProducts={selectedProducts}
              setSelectedProducts={setSelectedProducts}
            />
          );
        case "Product Types":
          return (
            <ProductTypeMenu
              subMenu={activeSubMenu}
              selectedProducts={selectedProducts}
              setSelectedProducts={setSelectedProducts}
            />
          );
        case "Product Tags":
          return (
            <ProductTagMenu
              subMenu={activeSubMenu}
              selectedProducts={selectedProducts}
              setSelectedProducts={setSelectedProducts}
            />
          );
        case "Vendors":
          return (
            <VendorMenu
              subMenu={activeSubMenu}
              selectedProducts={selectedProducts}
              setSelectedProducts={setSelectedProducts}
            />
          );
        default:
          throw new Error("Invalid activeSubMenu");
      }
    }

    switch (activeMenu) {
      case "Add Products":
        return (
          <AddProductsMenu
            defaultQuery={defaultQuery}
            setSelectedMenu={setActiveMenu}
          />
        );
      case "All Products":
        return (
          <AllProductsMenu
            selectedProducts={selectedProducts}
            setSelectedProducts={setSelectedProducts}
            selectedVariants={selectedVariants}
            setSelectedVariants={setSelectedVariants}
          />
        );
      case "Popular Products":
        return (
          <PopularProductsMenu
            selectedProducts={selectedProducts}
            setSelectedProducts={setSelectedProducts}
          />
        );
      case "Collections":
        return <CollectionsMenu setSubMenu={setActiveSubMenu} />;
      case "Product Types":
        return <ProductTypesMenu setSubMenu={setActiveSubMenu} />;
      case "Product Tags":
        return <ProductTagsMenu setSubMenu={setActiveSubMenu} />;
      case "Vendors":
        return <VendorsMenu setSubMenu={setActiveSubMenu} />;
      case "Selected Products":
        return (
          <SelectedProductsMenu
            setActiveMenu={setActiveMenu}
            selectedProducts={selectedProducts}
            setSelectedProducts={setSelectedProducts}
          />
        );
    }
  }

  function Title() {
    if (activeMenu === "Add Products") {
      return activeMenu;
    }

    function handleBack() {
      if (activeSubMenu !== null) {
        setActiveSubMenu(null);
      } else {
        setActiveMenu("Add Products");
      }
    }

    return (
      <div className="flex gap-2 items-center">
        <button onClick={handleBack}>
          <IoIosArrowRoundBack
            size={24}
            className="text-gray-500 hover:text-gray-800 transition-all"
          />
        </button>
        {activeSubMenu !== null ? activeSubMenu.title : activeMenu}
      </div>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <OutlinedButtonSmall onClick={() => {}}>Browse</OutlinedButtonSmall>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <Title />
          </DialogTitle>
        </DialogHeader>

        <div className="max-h-[500px] overflow-y-auto">
          <ActiveMenu />
        </div>

        <DialogFooter className="flex whitespace-nowrap items-center justify-between">
          {selectedProducts.length === 0 ||
          activeMenu === "Selected Products" ? (
            <Text>{selectedProducts.length} variants selected</Text>
          ) : (
            <OutlinedButton onClick={() => setActiveMenu("Selected Products")}>
              {selectedProducts.length} variants selected
            </OutlinedButton>
          )}

          <div className="w-full" />

          <div className="flex gap-2">
            <OutlinedButton onClick={() => setOpen(false)}>
              Cancel
            </OutlinedButton>
            <FilledButton
              onClick={() => {
                setProducts(selectedProducts);
                setOpen(false);
              }}
            >
              Add
            </FilledButton>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function AddProductsMenu({
  defaultQuery,
  setSelectedMenu,
}: {
  defaultQuery: string;
  setSelectedMenu: React.Dispatch<React.SetStateAction<Menu>>;
}) {
  const [query, setQuery] = React.useState(defaultQuery);
  const menus: Menu[] = [
    "All Products",
    "Popular Products",
    "Collections",
    "Product Types",
    "Product Tags",
    "Vendors",
  ];

  function ListItem({ menu }: { menu: Menu }) {
    return (
      <button
        className="flex w-full justify-between px-4 py-3 border-t border-gray-200 hover:bg-gray-100 bg-white transition-all"
        onClick={() => setSelectedMenu(menu)}
      >
        <Text className="text-gray-800">{menu}</Text>
        <IoIosArrowForward size={14} className="text-neutral-500" />
      </button>
    );
  }

  return (
    <div className=" flex flex-col gap-4 my-4">
      <div className="px-4 w-full">
        <Input
          id="search-query"
          value={query}
          icon={<AiOutlineSearch />}
          placeholder="Search products"
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <div className="w-full">
        {menus.map((m) => (
          <ListItem key={m} menu={m} />
        ))}
      </div>
    </div>
  );
}

function AllProductsMenu({
  selectedProducts,
  setSelectedProducts,
  selectedVariants,
  setSelectedVariants,
}: {
  selectedProducts: Product[];
  setSelectedProducts: any;
  selectedVariants?: any[];
  setSelectedVariants?: any;
}) {
  return (
    <ProductsMenu
      selectedProducts={selectedProducts}
      setSelectedProducts={setSelectedProducts}
      selectedVariants={selectedVariants}
      setSelectedVariants={setSelectedVariants}
      load={async () => {
        const res = await axios.get("/api/products");
        return res.data;
      }}
    />
  );
}

function PopularProductsMenu({
  selectedProducts,
  setSelectedProducts,
}: {
  selectedProducts: Product[];
  setSelectedProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}) {
  return (
    <ProductsMenu
      selectedProducts={selectedProducts}
      setSelectedProducts={setSelectedProducts}
      load={async () => {
        const res = await axios.get("/api/products/popular");
        return res.data;
      }}
    />
  );
}

function CollectionsMenu({
  setSubMenu,
}: {
  setSubMenu: React.Dispatch<React.SetStateAction<SubMenu>>;
}) {
  return (
    <ListMenu
      setSubMenu={setSubMenu}
      load={async () => {
        const { data } = await axios.get("/api/products/collections");
        return data;
      }}
      paramsIdName="collection"
    />
  );
}

function CollectionMenu({
  subMenu,
  selectedProducts,
  setSelectedProducts,
}: {
  subMenu: SubMenu;
  selectedProducts: Product[];
  setSelectedProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}) {
  return (
    <ProductsMenu
      selectedProducts={selectedProducts}
      setSelectedProducts={setSelectedProducts}
      load={async () => {
        const res = await axios.get(
          `/api/products?${subMenu!.params.toString()}`
        );
        return res.data;
      }}
    />
  );
}

function ProductTypesMenu({
  setSubMenu,
}: {
  setSubMenu: React.Dispatch<React.SetStateAction<SubMenu>>;
}) {
  return (
    <ListMenu
      setSubMenu={setSubMenu}
      load={async () => {
        const res = await axios.get("/api/products/types");
        const data: { _id: string }[] = res.data;
        return data.map((e) => ({ _id: e._id, title: e._id }));
      }}
      paramsIdName="type"
    />
  );
}

function ProductTypeMenu({
  subMenu,
  selectedProducts,
  setSelectedProducts,
}: {
  subMenu: SubMenu;
  selectedProducts: Product[];
  setSelectedProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}) {
  return (
    <ProductsMenu
      selectedProducts={selectedProducts}
      setSelectedProducts={setSelectedProducts}
      load={async () => {
        const res = await axios.get(
          `/api/products?${subMenu!.params.toString()}`
        );
        return res.data;
      }}
    />
  );
}

function ProductTagsMenu({
  setSubMenu,
}: {
  setSubMenu: React.Dispatch<React.SetStateAction<SubMenu>>;
}) {
  return (
    <ListMenu
      setSubMenu={setSubMenu}
      load={async () => {
        const res = await axios.get("/api/products/tags");
        const data: { _id: string }[] = res.data;
        return data.map((e) => ({ _id: e._id, title: e._id }));
      }}
      paramsIdName="tags"
    />
  );
}

function ProductTagMenu({
  subMenu,
  selectedProducts,
  setSelectedProducts,
}: {
  subMenu: SubMenu;
  selectedProducts: Product[];
  setSelectedProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}) {
  console.log(subMenu!.params.toString());
  return (
    <ProductsMenu
      selectedProducts={selectedProducts}
      setSelectedProducts={setSelectedProducts}
      load={async () => {
        const res = await axios.get(
          `/api/products?${subMenu!.params.toString()}`
        );
        return res.data;
      }}
    />
  );
}

function VendorsMenu({
  setSubMenu,
}: {
  setSubMenu: React.Dispatch<React.SetStateAction<SubMenu>>;
}) {
  return (
    <ListMenu
      setSubMenu={setSubMenu}
      load={async () => {
        const res = await axios.get("/api/vendors");
        const data: { _id: string }[] = res.data;
        return data.map((e) => ({ _id: e._id, title: e._id }));
      }}
      paramsIdName="vendor"
    />
  );
}

function VendorMenu({
  subMenu,
  selectedProducts,
  setSelectedProducts,
}: {
  subMenu: SubMenu;
  selectedProducts: Product[];
  setSelectedProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}) {
  console.log(subMenu!.params.toString());
  return (
    <ProductsMenu
      selectedProducts={selectedProducts}
      setSelectedProducts={setSelectedProducts}
      load={async () => {
        const res = await axios.get(
          `/api/products?${subMenu!.params.toString()}`
        );
        return res.data;
      }}
    />
  );
}

function SelectedProductsMenu({
  setActiveMenu,
  selectedProducts,
  setSelectedProducts,
}: {
  setActiveMenu: React.Dispatch<React.SetStateAction<Menu>>;
  selectedProducts: Product[];
  setSelectedProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}) {
  React.useEffect(() => {
    if (selectedProducts.length === 0) {
      setActiveMenu("Add Products");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedProducts]);

  function ListItem({ product }: { product: Product }) {
    function selectItem(val: boolean) {
      if (val) {
        setSelectedProducts((p) => [...p, product]);
      } else {
        setSelectedProducts((p) => p.filter((p) => p._id !== product._id));
      }
    }

    function isSelected() {
      return selectedProducts.some((p) => p._id === product._id);
    }

    return (
      <button
        onClick={() => selectItem(!isSelected())}
        className="w-full flex border-t border-gray-200 items-center px-4 py-3 justify-between bg-white hover:bg-gray-100 transition-all"
      >
        <div className="flex items-center">
          <Checkbox
            id={"select" + product._id}
            checked={isSelected()}
            onChange={(e) => selectItem(e.target.checked)}
          />
          {product.media.length > 0 ? (
            <div className="w-8 h-8 rounded-md overflow-hidden">
              <Image
                src={product.media[0].url}
                alt={product.title}
                width={0}
                height={0}
                sizes="100vw"
                style={{ width: "100%", height: "100%" }}
              />
            </div>
          ) : (
            <ImageMajor className="w-8 h-8 rounded-md overflow-hidden fill-gray-200" />
          )}
          <Text className="text-gray-800 ml-3">{product.title}</Text>
        </div>

        <div className="w-40 grid  place-items-center">
          <Text className="text-gray-800">{product.quantity}</Text>
        </div>
      </button>
    );
  }

  return (
    <div className=" flex flex-col gap-4 my-4">
      <div className="w-full flex border-t border-gray-200 pt-4 justify-between px-4">
        <Text className="font-bold text-gray-800">Products</Text>
        <div className="w-40 grid  place-items-center">
          <Text className="font-bold text-gray-800">Total Available</Text>
        </div>
      </div>

      <div className="w-full">
        {selectedProducts.map((p) => (
          <ListItem key={p._id} product={p} />
        ))}
      </div>
    </div>
  );
}

function VariantRow({
  variant,
  handleSelect,
  checked,
}: {
  variant: Variant;
  handleSelect?: any;
  checked: boolean;
}) {
  console.log(variant);
  const handleClick = (e: any) => {
    handleSelect(e);
  };

  return (
    <div className="flex items-center pl-12 pr-4 py-2 font-medium text-[0.7em] sm:text-xs border-t">
      <Checkbox
        checked={checked}
        onChange={handleClick}
        id={"select" + variant._id}
      />
      <Text className="text-gray-800 hidden sm:block">{variant.name}</Text>

      <div className="flex-1 hidden sm:block"></div>

      <div className="gap-0 sm:gap-2 flex flex-col sm:flex-row whitespace-nowrap text-left">
        <Text className="text-gray-800 sm:hidden">{variant.name}</Text>
        <Text className="text-gray-800">
          {(variant.inventoryLevels.length > 0 &&
            variant.inventoryLevels[0].available) ||
            0}{" "}
          available
        </Text>
        <Text className="text-gray-800">SAR {variant.price || 0}</Text>
      </div>
    </div>
  );
}

function ProductsMenu({
  load,
  selectedProducts,
  setSelectedProducts,
  selectedVariants,
  setSelectedVariants,
}: {
  load: () => Promise<Product[]>;
  selectedProducts: Product[];
  setSelectedProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  selectedVariants?: any[];
  setSelectedVariants?: any;
}) {
  const [query, setQuery] = React.useState("");
  const [products, setProducts] = React.useState<Product[]>([]);
  const [loading, setLoading] = React.useState(false);

  // !bug: TODO: fetchProducts is run every time `selectProducts` changes.
  React.useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      try {
        const products = await load();
        setProducts(products);
      } catch (error) {
        toast.error("Failed to fetch products");
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function ListItem({ product }: { product: Product }) {
    function selectItem(e: any) {
      if (e.target.checked) {
        const variant = product._id + "-" + e.target.id.slice(6);
        setSelectedVariants((p: any) => [...p, variant]);

        setSelectedProducts((p) => [...p, product]);
      } else {
        const variant = product._id + "-" + e.target.id.slice(6);
        setSelectedVariants((p: any) => p.filter((p: any) => p !== variant));
      }
    }

    function selectProduct(val: boolean) {
      if (val) {
        setSelectedProducts((p) => [...p, product]);
      } else {
        setSelectedProducts((p) => p.filter((p) => p._id !== product._id));
      }
    }

    function isSelected() {
      return selectedProducts.some((p) => p._id === product._id);
    }

    return (
      <>
        <button
          onClick={() => selectProduct(!isSelected())}
          className="w-full flex border-t border-gray-200 items-center px-4 py-3 justify-between bg-white hover:bg-gray-100 transition-all"
        >
          <div className="flex">
            {product.variants.length < 1 && (
              <Checkbox
                id={"select" + product._id}
                checked={isSelected()}
                onChange={(e) => selectProduct(e.target.checked)}
              />
            )}
            {product.media.length > 0 ? (
              <div
                className="h-8 w-8 rounded-md border bg-gray-100"
                style={{
                  backgroundImage: `url(${product.media[0].url})`,
                  backgroundSize: "contain",
                  backgroundPosition: "center",
                }}
              />
            ) : (
              <ImageMajor className="w-8 h-8 p-1 rounded-md overflow-hidden fill-gray-300 border" />
            )}
            <Text className="text-gray-800 pl-3 flex items-center text-left">
              {product.title}
            </Text>
          </div>

          {!product.variants && (
            <div className="gap-2 flex flex-col sm:flex-row whitespace-nowrap text-left">
              <Text className="text-gray-800">
                {product.quantity} available
              </Text>
              <Text className="text-gray-800">SAR {product.price}</Text>
            </div>
          )}
        </button>

        <div>
          {product.variants.map((v) => (
            <VariantRow
              handleSelect={(e: any) => {
                selectItem(e);
              }}
              checked={
                (selectedVariants &&
                  selectedVariants.some(
                    (p) => p === product._id + "-" + v._id
                  )) ||
                false
              }
              key={v._id}
              variant={v}
            />
          ))}
        </div>
      </>
    );
  }

  return (
    <div className=" flex flex-col gap-4 my-4">
      <div className="px-4 w-full">
        <Input
          id="search-query"
          value={query}
          icon={<AiOutlineSearch />}
          placeholder="Search products"
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {/* <div className="w-full flex border-t border-gray-200 pt-4 justify-between px-4">
        <Text className="font-bold text-gray-800">Products</Text>
        <div className="w-40 grid  place-items-center">
          <Text className="font-bold text-gray-800">Total Available</Text>
        </div>
      </div> */}

      <div className="w-full">
        {loading ? (
          <Spinner />
        ) : (
          products.map((p) => <ListItem key={p._id} product={p} />)
        )}
      </div>
    </div>
  );
}

function ListMenu({
  setSubMenu,
  load,
  paramsIdName,
}: {
  load: () => Promise<ListMenuItem[]>;
  paramsIdName: string;
  setSubMenu: React.Dispatch<React.SetStateAction<SubMenu>>;
}) {
  const [items, setItems] = React.useState<ListMenuItem[]>([]);
  const [query, setQuery] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    async function fetchCollections() {
      setLoading(true);
      try {
        const items = await load();
        setItems(items);
      } catch (error) {
        toast.error("Failed to fetch collections");
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    fetchCollections();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function ListItem({ item }: { item: ListMenuItem }) {
    return (
      <button
        className="flex w-full justify-between px-4 py-3 border-t border-gray-200 hover:bg-gray-100 bg-white transition-all"
        onClick={() =>
          setSubMenu({
            title: item.title,
            params: new URLSearchParams({ [paramsIdName]: item._id }),
          })
        }
      >
        <Text className="text-gray-800">{item.title}</Text>
        <IoIosArrowForward size={14} className="text-neutral-500" />
      </button>
    );
  }

  return (
    <div className=" flex flex-col gap-4 my-4">
      <div className="px-4 w-full">
        <Input
          id="search-query"
          value={query}
          icon={<AiOutlineSearch />}
          placeholder="Search products"
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <div className="w-full ">
        {loading ? (
          <Spinner />
        ) : (
          items.map((c) => <ListItem key={c._id} item={c} />)
        )}
      </div>
    </div>
  );
}
