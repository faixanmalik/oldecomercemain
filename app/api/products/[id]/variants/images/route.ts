import { NextRequest, NextResponse } from "next/server"
import getDb from "@/lib/db"
import { ObjectId } from "mongodb"
import { errorResponse } from "@/app/api/utils"

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        console.log("hello")

        const payload = await request.json()
        const images = payload.images
        if (!images || !images.length) {
            return NextResponse.json({ error: "No images provided" }, { status: 400 })
        }

        const db = await getDb()
        const updateResult = await db.collection("products").updateOne({ _id: new ObjectId(params.id) }, { $push: { variantImages: { $each: images } } })
        return NextResponse.json(updateResult, { status: 200 })

    }
    catch (error) {
        return errorResponse(error)
    }
}
