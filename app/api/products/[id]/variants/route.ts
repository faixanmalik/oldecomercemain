import { NextRequest, NextResponse } from "next/server"
import getDb from "@/lib/db"
import { ObjectId } from "mongodb"
import { errorResponse } from "@/app/api/utils"
import { ApiVariantSchema } from "@/types/product"


export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
    try {

        const payload = await request.json()
        const variant = ApiVariantSchema.parse(payload)
        const db = await getDb()
        const updateResult = await db.collection("products").updateOne({ _id: new ObjectId(params.id) }, { $push: { variants: variant } })
        return NextResponse.json(updateResult, { status: 200 })

    }
    catch (error) {
        return errorResponse(error)
    }
}

