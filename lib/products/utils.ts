import { Location } from "@/types/location";
import { ApiInventoryLevel, ApiProduct, ApiVariant, InventoryLevel, Product, Variant, VariantValue, VariantWithContext } from "@/types/product";
import { ApiPurchaseOrderItem, PurchaseOrderItem } from "@/types/purchaseOrder";

export function multiplyArrays(arrayNames: string[], ...arrays: string[][]): VariantValue[] {
  const combineArrays = (result: string[][], arr: string[]) => {
    if (arr.length === 0) {
      return result;
    }
    if (result.length === 0) {
      return arr.map(item => [item]);
    }
    return result.flatMap(combination =>
      arr.map(item => [...combination, item])
    );
  };

  let result: string[][] = [];
  arrays.forEach(arr => {
    result = combineArrays(result, arr);
  });

  const ans: VariantValue[] = result.map(arr => {
    const obj: VariantValue = {};
    for (let i = 0; i < arrayNames.length; i++) {
      obj[arrayNames[i]] = arr[i];
    }
    return obj;
  });

  return ans
}

export function getQuantity(p: Product): number {
  if (p.variants?.length > 0) {
    return p.variants.reduce((acc, v) => acc + v.inventoryLevels?.reduce((acc, il) => acc + il.available, 0) ?? 0, 0)
  } else {
    return p.inventoryLevels?.reduce((acc, il) => acc + il.available, 0) ?? 0
  }
}

export function variantToAPIVariant(v: Variant): ApiVariant {
  return {
    ...v,
    inventoryLevels: v.inventoryLevels.map(level => ({
      ...level,
      location: level.location._id,
      createdAt: level.createdAt,
      updatedAt: level.updatedAt,
    }))
  }
}


export function getInventoryLevel(ils: InventoryLevel[], l: Location): InventoryLevel {
  // return ils.find(il => il.location._id === l._id) || {
  //   location: l,
  //   available: 0,
  //   incoming: 0,
  //   onHand: 0,
  //   committed: 0,
  //   unavailable: 0,
  // }

  return {
    location: l,
    available: 0,
    incoming: 0,
    onHand: 0,
    committed: 0,
    unavailable: 0,
  }
}

export function productToVariant(p: Product): VariantWithContext {
  // @ts-ignore
  return {
    _id: p._id,
    productId: null,
    title: p.title,
    name: p.title,
    values: {},
    trackQuantity: p.trackQuantity,
    continueSellingWhenOutOfStock: p.continueSellingWhenOutOfStock,
    quantity: p.quantity,
    image: p.media?.length > 0 ? p.media[0].url : undefined,
    status: p.status,
    inventoryLevels: p.inventoryLevels,
  } as VariantWithContext
}

export function productsToVariantsWithContext(ps: Product[]): VariantWithContext[] {
  return ps.flatMap(p => p.variants?.map(v => ({ ...v, title: p.title, productId: p._id, image: p.media[0]?.url }) ?? [productToVariant(p)]))
}

export function variantToPurchaseOrderItem(v: VariantWithContext): ApiPurchaseOrderItem {
  return { _id: `${v.productId}+${v._id}`, productTitle: v.title, variantName: v.name, supplierSKU: "", variant: v._id, product: v.productId, quantity: 1, cost: 0, tax: 0 }
}

export function toApiPurchaseOrderItem(item: PurchaseOrderItem): ApiPurchaseOrderItem {
  // @ts-ignore
  return { ...item, variant: item.variant._id, product: item.variant.productId }
}
export function toApiPurchaseOrderItems(items: PurchaseOrderItem[]): ApiPurchaseOrderItem[] {
  return items.map(toApiPurchaseOrderItem)
}


export const defaultApiInventoryLevel: ApiInventoryLevel = {
  location: "",
  available: 0,
}

export const defaultProduct: ApiProduct = {
  title: "",
  scheduledDates: {},
  chargeTaxes: false,
  salesChannels: [],
  markets: [],
  quantity: 0,
  taxRate: 0,
  trackQuantity: false,
  continueSellingWhenOutOfStock: false,
  hasSku: false,
  isPhysicalProduct: true,
  weight: 0,
  weightUnit: "kg",
  countryOfOrigin: "",
  status: "active",
  vendor: "",
  collection: "",
  variants: [],
  variantOptions: [],
  variantImages: [],
  inventoryLevels: [],
  media: [],
  seo: {
    title: "",
    description: "",
  },
  tags: [],
};

