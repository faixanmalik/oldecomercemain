import { NextRequest, NextResponse } from "next/server"
import getDb from "@/lib/db"
import { ObjectId } from "mongodb"
import { errorResponse } from "@/app/api/utils"
import { ApiLocationSchema } from "@/types/location"

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    try {

        const payload = ApiLocationSchema.parse(await request.json())
        payload.updatedAt = (new Date()).toString()

        const db = await getDb()
        const updateResult = await db.collection("locations").updateOne({ _id: new ObjectId(params.id) }, { $set: payload })
        return NextResponse.json(updateResult, { status: 200 })
    }
    catch (error) {
        return errorResponse(error)
    }
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
    try {

        const db = await getDb()
        const deleteResult = await db.collection("locations").deleteOne({ _id: new ObjectId(params.id) })
        return NextResponse.json(deleteResult, { status: 200 })
    }
    catch (error) {
        return errorResponse(error)
    }
}

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
    try {
        const db = await getDb()
        const location = await db.collection("locations").findOne({ _id: new ObjectId(params.id) })
        return NextResponse.json(location, { status: 200 })
    }
    catch (error) {
        return errorResponse(error)
    }
}
