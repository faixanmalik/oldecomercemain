import getDb from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { errorResponse } from "../utils";
import { ApiSupplierSchema } from "@/types/supplier";

export async function POST(request: NextRequest) {
    try {
        const payload = ApiSupplierSchema.parse(await request.json())
        const db = await getDb()

        payload.createdAt = (new Date()).toString()
        payload.updatedAt = (new Date()).toString()

        const insertResult = await db.collection("suppliers").insertOne(payload)
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

        const db = await getDb()
        const suppliers = await db.collection("suppliers").find(
            {},
            { projection: fields?.reduce((acc, field) => ({ ...acc, [field]: 1 }), {}) }
        ).limit(limit).skip(page * limit).toArray()

        return NextResponse.json(suppliers, { status: 200 })
    }
    catch (error) {
        return errorResponse(error)
    }
}
