import getDb from "@/lib/db";
import { errorResponse } from "../utils";
import { CustomerSchema } from "@/types/customer";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const db = await getDb();
  const customers = await db.collection("customers").find().toArray();
  return NextResponse.json(customers);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const payload = CustomerSchema.parse(body);
    const db = await getDb();
    const insertResult = await db.collection("customers").insertOne(payload);
    return NextResponse.json(insertResult, { status: 201 });
  } catch (error) {
    console.log(error);
    return errorResponse(error);
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const payload = CustomerSchema.parse(body);
    const db = await getDb();
    const updateResult = await db
      .collection("customers")
      .updateOne({ _id: payload._id }, { $set: payload });
    return NextResponse.json(updateResult);
  } catch (error) {
    console.log(error);
    return errorResponse(error);
  }
}