
import getDb from "@/lib/db";
import { ApiGiftCardSchema } from "@/types/giftCard";
import { NextRequest, NextResponse } from "next/server";
import { errorResponse } from "../../utils";

export async function POST(request: NextRequest) {
    try {

        const payload = ApiGiftCardSchema.parse(await request.json())
        payload.createdAt = (new Date()).toString()
        payload.updatedAt = (new Date()).toString()

        const db = await getDb()
        const insertResult = await db.collection("gift_cards").insertOne(payload)
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
                $lookup: {
                    from: 'customers',
                    localField: 'customer',
                    foreignField: '_id',
                    as: 'customer'
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
        const giftCards = await db.collection("gift_cards").aggregate(pipeline).limit(limit).skip(page * limit).toArray()

        return NextResponse.json(giftCards, { status: 200 })
    }
    catch (error) {
        return errorResponse(error)
    }
}
