import { errorResponse } from "@/app/api/utils"
import getDb from "@/lib/db"
import { ApiInventoryLevelSchema } from "@/types/product";
import { ObjectId } from "mongodb"
import { NextRequest, NextResponse } from "next/server"

export const revalidate = 0;

export async function DELETE(_: NextRequest, { params }: { params: { id: string, location: string } }) {
    try {
        const db = await getDb();
        const updateResult = await db.collection("products").updateOne({ _id: new ObjectId(params.id) }, {
            $pull: { inventoryLevels: { location: params.location } }
        })
        return NextResponse.json(updateResult)
    } catch (error) {
        return errorResponse(error)
    }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string, location: string } }) {
    try {
        const db = await getDb();
        const payload = await request.json()
        if (!payload.available) {
            throw new Error("property available is required")
        }
        const updateResult = await db.collection("products").updateOne(
            { _id: new ObjectId(params.id), "inventoryLevels.location": ObjectId.createFromHexString(params.location) },
            { $set: { "inventoryLevels.$.available": payload.available } }
        )
        return NextResponse.json(updateResult)
    } catch (error) {
        return errorResponse(error)
    }
}

export async function POST(request: NextRequest, { params }: { params: { id: string, location: string } }) {
    try {
        const db = await getDb();

        const duplicate = await db.collection("products").findOne({ _id: new ObjectId(params.id), "inventoryLevels.location": params.location })
        if (duplicate) throw new Error(`Inventory level for location ${params.location} already exists`)

        const payload = await request.json()
        payload.location = params.location
        const inventoryLevel = ApiInventoryLevelSchema.parse(payload)

        const updateResult = await db.collection("products").updateOne(
            { _id: new ObjectId(params.id) },
            { $push: { inventoryLevels: inventoryLevel } }
        )
        return NextResponse.json(updateResult)
    } catch (error) {
        return errorResponse(error)
    }
}

