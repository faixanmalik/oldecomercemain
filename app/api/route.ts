import getDb from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
    const db = await getDb()
    const res = await db.collection('products').updateMany({}, { $set: { scheduledDates: {} } })
    return NextResponse.json(res)
}
