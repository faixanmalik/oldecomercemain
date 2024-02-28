import getDb from "@/lib/db";
import { errorResponse } from "../../../utils";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const db = await getDb();
    const orders = await db
      .collection("orders")
      .find({ customer: params.id })
      .sort({ createdAt: -1 })
      .limit(1)
      .toArray();

    if (orders.length === 0) {
      return NextResponse.json({ error: "No orders found", status: 404 });
    }

    const order = orders[0];
    order.length = orders.length;

    const products = await db
      .collection("products")
      .find({
        _id: { $in: order.products.map((p: any) => new ObjectId(p._id)) },
      })
      .toArray();

    order.products = order.products.map((p: any) => {
      const product = products.find((pr: any) => pr._id.toString() === p._id);
      return { ...p, ...product };
    });

    return NextResponse.json(order);
  } catch (error) {
    console.log(error);
    return errorResponse(error);
  }
}
