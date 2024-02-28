import getDb from "@/lib/db";
import { NextResponse } from "next/server";
import { errorResponse } from "../utils";

// TODO: implement actual vendor route
export async function GET() {
    try {
        const db = await getDb()
        const pipeline = [
            {
                $group: {
                    _id: "$vendor",
                }
            },
        ]
        const names = await db.collection('products').aggregate(pipeline).toArray()
        const vendors = names.map((name: any) => ({ _id: name._id, name: name._id }))

        return NextResponse.json(vendors, { status: 200 })
    }
    catch (error) {
        return errorResponse(error)
    }
}
