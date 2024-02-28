import getDb from "@/lib/db";
import { errorResponse } from "../../utils";
import { CustomerSchema } from "@/types/customer";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  console.log(params.id);
  try {
    const db = await getDb();
    const deleteResult = await db
      .collection("customers")
      .deleteOne({ _id: new ObjectId(params.id) });

    if (deleteResult.deletedCount === 0) {
      return NextResponse.json(
        { message: "No document found to delete." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Deletion successful." },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return errorResponse(error);
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const db = await getDb();
    const customer = await db
      .collection("customers")
      .findOne({ _id: new ObjectId(params.id) });

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
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const payload = CustomerSchema.parse(body);
    delete payload._id;
    
    const db = await getDb();
    const newCustomer = await db.collection("customers").findOneAndUpdate(
      { _id: new ObjectId(params.id) },
      {
        $set: {
          ...payload,
        },
      },
      { returnDocument: "after" }
    );

    if (!newCustomer) {
      return NextResponse.json(
        { message: "No document found." },
        { status: 404 }
      );
    }

    return NextResponse.json(newCustomer);
  } catch (error) {
    console.log(error);
    return errorResponse(error);
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { field, value } = await request.json();

    const db = await getDb();
    const customer = await db
      .collection("customers")
      .findOneAndUpdate(
        { _id: new ObjectId(params.id) },
        { $set: { [field]: value } },
        { returnDocument: "after" }
      );

    return NextResponse.json(customer);
  } catch (error) {
    console.log(error);
    return errorResponse(error);
  }
}
