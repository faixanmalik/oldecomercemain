import getDb from "@/lib/db";
import { ApiTransferSchema } from "@/types/transfer";
import { NextRequest, NextResponse } from "next/server";
import { errorResponse } from "../../utils";

export async function POST(request: NextRequest) {
    try {

        const payload = ApiTransferSchema.parse(await request.json())
        payload.createdAt = (new Date()).toString()
        payload.updatedAt = (new Date()).toString()

        const db = await getDb()
        const insertResult = await db.collection("transfers").insertOne(payload)
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
                    origin: { $toObjectId: "$origin" }
                }
            },
            {
                $addFields: {
                    destination: { $toObjectId: "$destination" }
                }
            },
            {
                $lookup: {
                    from: 'locations',
                    localField: 'origin',
                    foreignField: '_id',
                    as: 'origin'
                }
            },
            {
                $lookup: {
                    from: 'locations',
                    localField: 'destination',
                    foreignField: '_id',
                    as: 'destination'
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
        const results = await db.collection("transfers").aggregate(pipeline).limit(limit).skip(page * limit).toArray()
        const transfers = results.map((result) => ({ ...result, origin: result.origin[0], destination: result.destination[0] }))

        return NextResponse.json(transfers, { status: 200 })

    }
    catch (error) {
        return errorResponse(error)
    }
}

