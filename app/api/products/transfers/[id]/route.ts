import { NextRequest, NextResponse } from "next/server"
import getDb from "@/lib/db"
import { ApiTransferSchema } from "@/types/transfer"
import { ObjectId } from "mongodb"
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
                    origin: { $toObjectId: "$origin" }
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
                    from: "locations",
                    localField: "origin",
                    foreignField: "_id",
                    as: "origin"
                }
            },
            {
                $lookup: {
                    from: "products",
                    localField: "products",
                    foreignField: "_id",
                    as: "products"
                }
            }
        ]

        const result = await db.collection("transfers").aggregate(pipeline).toArray()
        const transfer = { ...result[0], destination: result[0].destination[0], origin: result[0].origin[0] }

        return NextResponse.json(transfer, { status: 200 })
    }
    catch (error) {
        return errorResponse(error)
    }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    try {

        const payload = ApiTransferSchema.parse(await request.json())
        payload.updatedAt = (new Date()).toString()

        const db = await getDb()
        const updateResult = await db.collection("transfers").updateOne({ _id: new ObjectId(params.id) }, { $set: payload })
        return NextResponse.json(updateResult, { status: 200 })
    }
    catch (error) {
        return errorResponse(error)
    }
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
    try {

        const db = await getDb()
        const deleteResult = await db.collection("transfers").deleteOne({ _id: new ObjectId(params.id) })
        return NextResponse.json(deleteResult, { status: 200 })
    }
    catch (error) {
        return errorResponse(error)
    }
}
