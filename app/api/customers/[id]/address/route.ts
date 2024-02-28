import getDb from "@/lib/db";
import { NextResponse, NextRequest } from "next/server";
import { errorResponse } from "@/app/api/utils";
import { ObjectId } from "mongodb";

export const POST = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const { address } = await request.json();
    console.log(address);
    const db = await getDb();

    const customer = await db
      .collection("customers")
      .findOneAndUpdate(
        { _id: new ObjectId(params.id) },
        { $addToSet: { addresses: address } },
        { returnDocument: "after" }
      );

    if (!customer) {
      return NextResponse.json(
        { message: "No document found." },
        { status: 404 }
      );
    }

    return NextResponse.json(customer);
  } catch (error) {
    console.log(error);
    return errorResponse(error);
  }
};

export const PUT = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const { addresses } = await request.json();
    const db = await getDb();

    const customer = await db
      .collection("customers")
      .findOneAndUpdate(
        { _id: new ObjectId(params.id) },
        { $set: { addresses } },
        { returnDocument: "after" }
      );

    if (!customer) {
      return NextResponse.json(
        { message: "No document found." },
        { status: 404 }
      );
    }

    return NextResponse.json(customer);
  } catch (error) {
    console.log(error);
    return errorResponse(error);
  }
};
