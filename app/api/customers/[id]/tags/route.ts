import getDb from "@/lib/db";
import { NextResponse, NextRequest } from "next/server";
import { Customer } from "@/types/customer";
import { errorResponse } from "@/app/api/utils";
import { ObjectId } from "mongodb";

export const POST = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const { tag } = await request.json();
    const db = await getDb();
    const customer = await db
      .collection<Customer>("customers")
      .findOneAndUpdate(
        { _id: new ObjectId(params.id) },
        { $addToSet: { tags: tag } },
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

export const DELETE = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const { tag } = await request.json();
    const db = await getDb();
    const customer = await db
      .collection<Customer>("customers")
      .findOneAndUpdate(
        { _id: new ObjectId(params.id) },
        { $pull: { tags: tag } },
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
