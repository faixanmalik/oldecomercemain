import getDb from "@/lib/db"
import { NextRequest, NextResponse } from "next/server"
import { errorResponse } from "../utils"
import { ApiSalesChannelSchema } from "@/types/salesChannel"


export async function GET() {
    try {
        const db = await getDb()
        const channels = await db.collection("sales_channels").find().toArray()
        return NextResponse.json(channels)
    }
    catch (error) {
        return errorResponse(error)
    }
}


export async function POST(request: NextRequest) {
    try {
        const payload = await request.json()
        const channel = ApiSalesChannelSchema.parse(payload)
        const db = await getDb()
        channel.createdAt = (new Date()).toString()
        channel.updatedAt = (new Date()).toString()
        const createResult = await db.collection("sales_channels").insertOne(channel)
        return NextResponse.json(createResult)
    }
    catch (error) {
        return errorResponse(error)
    }
}
