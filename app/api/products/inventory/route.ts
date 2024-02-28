import getDb from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { errorResponse } from "../../utils";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const fields: string[] = searchParams.get("fields")?.split(",") || [];
    const limit = Number(searchParams.get("limit") || 20);
    const page = Number(searchParams.get("page") || 0);
    const location = searchParams.get("location") || "";

    if (!location) throw new Error("location is required");

    const db = await getDb();
    const pipeline: any = [
      { $unwind: "$variants" },
      {
        $match: {
          "variants.inventoryLevels.location": location,
        },
      },
      {
        $addFields: {
          filteredInventoryLevels: {
            $filter: {
              input: "$variants.inventoryLevels",
              as: "inventoryLevel",
              cond: { $eq: ["$$inventoryLevel.location", location] },
            },
          },
        },
      },
      {
        $project: {
          _id: 1,
          variantId: "$variants._id",
          totalQuantityAtLocation: {
            $sum: "$filteredInventoryLevels.quantity",
          },
        },
      },
    ];
    const products = await db
      .collection("products")
      .aggregate(pipeline)
      .toArray();
    return NextResponse.json(products);
  } catch (error) {
    return errorResponse(error);
  }
}
