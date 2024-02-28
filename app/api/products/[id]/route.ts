import { NextRequest, NextResponse } from "next/server"
import getDb from "@/lib/db"
import { ObjectId } from "mongodb"
import { ApiProductSchema } from "@/types/product"
import { errorResponse } from "../../utils"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const searchParams = request.nextUrl.searchParams
        const fields: string[] = searchParams.get('fields')?.split(',') || []

        const db = await getDb()
        const pipeline: any = [
            {
                $match: {
                    _id: new ObjectId(params.id)
                }
            }
        ]

        if (fields && fields.length > 0) {
            pipeline.push({
                $project: fields.reduce((acc, curr) => ({ ...acc, [curr]: 1 }), {})
            })
        }

        const products = await db.collection("products").aggregate(pipeline).toArray()
        const product = products[0] ?? null
        return NextResponse.json(product, { status: 200 })
    }
    catch (error) {
        return errorResponse(error)
    }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    try {

        const data = await request.json()

        const payload = ApiProductSchema.parse(data)
        payload.updatedAt = (new Date()).toString()
        delete payload._id

        const db = await getDb()
        const updateResult = await db.collection("products").updateOne({ _id: ObjectId.createFromHexString(params.id) }, { $set: payload })
        return NextResponse.json(updateResult, { status: 200 })
    }
    catch (error) {
        return errorResponse(error)
    }
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
    try {

        const db = await getDb()
        const deleteResult = await db.collection("products").deleteOne({ _id: new ObjectId(params.id) })
        return NextResponse.json(deleteResult, { status: 200 })
    }
    catch (error) {
        return errorResponse(error)
    }
}
