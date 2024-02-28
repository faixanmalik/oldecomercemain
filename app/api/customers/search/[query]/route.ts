import getDb from "@/lib/db";
import { NextResponse, NextRequest } from "next/server";

export const GET = async (
  request: NextRequest,
  { params }: { params: { query: string } }
) => {
  try {
      const { query } = params;
    console.log(query);
    const db = await getDb();

    const customers = await db
      .collection("customers")
      .find({ $text: { $search: query } })
      .toArray();

      console.log(customers);

    return NextResponse.json(customers);
  } catch (error) {
    console.log(error);
  }
};
