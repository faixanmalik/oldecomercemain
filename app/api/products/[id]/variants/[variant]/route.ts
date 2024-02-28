
import { NextRequest, NextResponse } from "next/server"
import getDb from "@/lib/db"
import { ObjectId } from "mongodb"
import { errorResponse } from "@/app/api/utils"
import { ApiVariantSchema } from "@/types/product"


export async function PUT(request: NextRequest, { params }: { params: { id: string, variant: string } }) {
    try {

        const payload = await request.json()
        const variant = ApiVariantSchema.parse(payload)
        const db = await getDb()
        const updateResult = await db.collection("products").updateOne({ _id: new ObjectId(params.id) }, { $set: { [`variants.${params.variant}`]: variant } })
        return NextResponse.json(updateResult, { status: 200 })

    }
    catch (error) {
        return errorResponse(error)
    }
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string, variant: string } }) {
    try {

        const db = await getDb()
        const deleteResult = await db.collection("products").updateOne({ _id: new ObjectId(params.id) }, { $pull: { variants: { _id: params.variant } } })
        return NextResponse.json(deleteResult, { status: 200 })

    }
    catch (error) {
        return errorResponse(error)
    }
}

export async function GET(_: NextRequest, { params }: { params: { id: string, variant: string } }) {
    try {
        const db = await getDb()

        const pipeline: any = [
            {
                $match: {
                    _id: new ObjectId(params.id)
                }
            },
            { $unwind: "$variants" },
            { $unwind: "$variants.inventoryLevels" },
            {
                $addFields: {
                    "variants.inventoryLevels.location": {
                        $toObjectId: "$variants.inventoryLevels.location"
                    }
                }
            },

            {
                $lookup: {
                    from: "locations",
                    localField: "variants.inventoryLevels.location",
                    foreignField: "_id",
                    as: "populatedLocation"
                }
            },
            { $unwind: "$populatedLocation" },
            {
                $group: {
                    _id: "$_id",
                    variants: {
                        $push: {
                            inventoryLevels: {
                                location: "$populatedLocation"
                            }
                        }
                    }
                }
            },
        ]

        const variant = await db.collection("products").aggregate(pipeline).next()
        return NextResponse.json(variant, { status: 200 })
    } catch (error) {
        return errorResponse(error)
    }
}
