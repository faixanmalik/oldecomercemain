import getDb from "@/lib/db";
import { ApiPurchaseOrderSchema } from "@/types/purchaseOrder";
import { NextRequest, NextResponse } from "next/server";
import { errorResponse } from "../../utils";

export async function POST(request: NextRequest) {
    try {

        const payload = ApiPurchaseOrderSchema.parse(await request.json())
        payload.createdAt = (new Date()).toString()
        payload.updatedAt = (new Date()).toString()

        const db = await getDb()
        const insertResult = await db.collection("purchase_orders").insertOne(payload)
        return NextResponse.json(insertResult, { status: 201 })
    }
    catch (error) {
        return errorResponse(error)
    }
}

export async function GET(request: NextRequest) {
    try {

        const searchParams = request.nextUrl.searchParams
        const fields: string[] = searchParams.get('fields')?.split(',') || []
        const limit = Number(searchParams.get('limit') || 20)
        const page = Number(searchParams.get('page') || 0)

        if (searchParams.get('simple')) {
            const db = await getDb()
            const purchaseOrders = await db.collection("purchase_orders").find().limit(limit).skip(page * limit).toArray()
            return NextResponse.json(purchaseOrders, { status: 200 })
        }

        const pipeline: any[] = [
            {
                $lookup: {
                    from: "locations",
                    let: { destinationId: { $toObjectId: "$destination" } },
                    pipeline: [{
                        $match: {
                            $expr: {
                                $eq: ["$_id", "$$destinationId"]
                            }
                        }
                    }],
                    as: "destination"
                }
            },
            {
                $lookup: {
                    from: "suppliers",
                    let: { supplierId: { $toObjectId: "$supplier" } },
                    pipeline: [{
                        $match: {
                            $expr: {
                                $eq: ["$_id", "$$supplierId"]
                            }
                        }
                    }],
                    as: "supplier"
                }
            }
        ]


        if (fields.length) {
            pipeline.push({
                $project: {
                    ...fields?.reduce((acc, field) => ({ ...acc, [field]: 1 }), {}),
                }
            })
        }

        const db = await getDb()
        const purchaseOrders = await db.collection("purchase_orders").aggregate(pipeline).limit(limit).skip(page * limit).toArray()
        return NextResponse.json(purchaseOrders, { status: 200 })
    }
    catch (error) {
        return errorResponse(error)
    }
}
