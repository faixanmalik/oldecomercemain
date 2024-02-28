import getDb from "@/lib/db";
import { ApiCollectionSchema } from "@/types/collection";
import { NextRequest, NextResponse } from "next/server";
import { errorResponse } from "../../utils";

export async function POST(request: NextRequest) {
    try {
        const payload = ApiCollectionSchema.parse(await request.json())
        payload.createdAt = (new Date()).toString()
        payload.updatedAt = (new Date()).toString()

        const db = await getDb()
        const insertResult = await db.collection("collections").insertOne(payload)
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

        const pipeline: any = [
            {
                $addFields: {
                    products: { $map: { input: "$products", as: "product", in: { $toObjectId: "$$product" } } }
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

        if (fields.length > 0) {
            pipeline.push({
                $project: {
                    ...fields?.reduce((acc, field) => ({ ...acc, [field]: 1 }), {}),
                }
            })
        }

        const db = await getDb()
        const collections = await db.collection("collections").aggregate(pipeline).limit(limit).skip(page * limit).toArray()

        return NextResponse.json(collections, { status: 200 })
    }
    catch (error) {
        return errorResponse(error)
    }
}
