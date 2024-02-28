import { NextRequest, NextResponse } from "next/server"
import getDb from "@/lib/db"
import { ObjectId } from "mongodb"
import { ApiGiftCardSchema } from "@/types/giftCard"
import { errorResponse } from "@/app/api/utils"

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
    try {

        const db = await getDb()
        const card = await db.collection("gift_cards").findOne({ _id: new ObjectId(params.id) })
        return NextResponse.json(card, { status: 200 })
    }
    catch (error) {
        return errorResponse(error)
    }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    try {

        const payload = ApiGiftCardSchema.parse(await request.json())
        payload.updatedAt = (new Date()).toString()

        const db = await getDb()
        const updateResult = await db.collection("gift_cards").updateOne({ _id: new ObjectId(params.id) }, { $set: payload })
        return NextResponse.json(updateResult, { status: 200 })
    }
    catch (error) {
        return errorResponse(error)
    }
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
    try {

        const db = await getDb()
        const deleteResult = await db.collection("gift_cards").deleteOne({ _id: new ObjectId(params.id) })
        return NextResponse.json(deleteResult, { status: 200 })
    }
    catch (error) {
        return errorResponse(error)
    }
}
