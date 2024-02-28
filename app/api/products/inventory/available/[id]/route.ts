import { NextRequest, NextResponse } from "next/server";
import getDb from "@/lib/db";
import { errorResponse } from "../../../../utils";

import { ObjectId } from "mongodb";

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const db = await getDb();
    const { id } = params;
    const { quantity, variantId } = await request.json();

    const product = await db
      .collection("products")
      .findOne({ _id: new ObjectId(id) });

    if (!product) return errorResponse("Product not found");

    const variantIdx = product.variants.findIndex(
      (variant: any) => variant._id === variantId
    );

    if (!product.variants) {
      product.variants = [];
    }

    if (!product.variants[variantIdx]) {
      product.variants[variantIdx] = { inventoryLevels: [] };
    }

    if (!product.variants[variantIdx].inventoryLevels) {
      product.variants[variantIdx].inventoryLevels = [];
    }

    if (!product.variants[variantIdx].inventoryLevels[0]) {
      product.variants[variantIdx].inventoryLevels[0] = { available: 0 };
    }

    if (!product.variants[variantIdx].inventoryLevels[0].available) {
      product.variants[variantIdx].inventoryLevels[0].available = 0;
    }

    product.variants[variantIdx].inventoryLevels[0].available = quantity;
    
    const newProduct = await db
      .collection("products")
      .findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $set: product },
        { returnDocument: "after" }
      );

    if (!newProduct) return errorResponse("Product not found");

    // console.log(newProduct);
    console.log(newProduct.variants[variantIdx]);
    console.log(newProduct.variants[0].inventoryLevels[0].available);

    return NextResponse.json({
      newProduct,
    });
  } catch (e: any) {
    return errorResponse(e.message);
  }
}
