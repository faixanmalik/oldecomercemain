import { NextRequest, NextResponse } from "next/server"
import getDb from "@/lib/db"
import { ObjectId } from "mongodb"
import { ApiPurchaseOrderSchema } from "@/types/purchaseOrder"
import { errorResponse } from "@/app/api/utils"

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
    try {

        const db = await getDb()
        const pipeline = [
            {
                $match: {
                    _id: new ObjectId(params.id)
                }
            },
            {
                $addFields: {
                    supplier: { $toObjectId: "$supplier" }
                }
            },
            {
                $addFields: {
                    destination: { $toObjectId: "$destination" }
                }
            },
            {
                $addFields: {
                    products: { $map: { input: "$products", as: "product", in: { $toObjectId: "$$product" } } }
                }
            },
            {
                $lookup: {
                    from: "locations",
                    localField: "destination",
                    foreignField: "_id",
                    as: "destination"
                }
            },
            {
                $lookup: {
                    from: "suppliers",
                    localField: "supplier",
                    foreignField: "_id",
                    as: "supplier"
                }
            },
            {
                $lookup: {
                    from: 'products',
                    localField: 'products',
                    foreignField: '_id',
                    as: 'products'
                }
            },
        ]

        const result = await db.collection("purchase_orders").aggregate(pipeline).toArray()
        const purchaseOrder = { ...result[0], destination: result[0].destination[0], supplier: result[0].supplier[0] }

        return NextResponse.json(purchaseOrder, { status: 200 })
    }
    catch (error) {
        return errorResponse(error)
    }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    try {

        const payload = ApiPurchaseOrderSchema.parse(await request.json())
        payload.updatedAt = (new Date()).toString()

        const db = await getDb()
        const updateResult = await db.collection("purchase_orders").updateOne({ _id: new ObjectId(params.id) }, { $set: payload })
        return NextResponse.json(updateResult, { status: 200 })
    }
    catch (error) {
        return errorResponse(error)
    }
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
    try {

        const db = await getDb()
        const deleteResult = await db.collection("purchase_orders").deleteOne({ _id: new ObjectId(params.id) })
        return NextResponse.json(deleteResult, { status: 200 })
    }
    catch (error) {
        return errorResponse(error)
    }
}
