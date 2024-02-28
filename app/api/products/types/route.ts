import getDb from "@/lib/db";
import { NextResponse } from "next/server";
import { errorResponse } from "../../utils";

// TODO: implement actual product_type routes
export async function GET() {
    try {
        const db = await getDb()
        const pipeline = [
            {
                $group: {
                    _id: "$productType",
                }
            },
        ]
        let types = await db.collection('products').aggregate(pipeline).toArray()
        types = types.filter(type => !!type._id)

        return NextResponse.json(types, { status: 200 })
    }
    catch (error) {
        return errorResponse(error)
    }
}
