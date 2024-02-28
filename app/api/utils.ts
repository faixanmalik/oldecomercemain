import { NextResponse } from "next/server"
import { MongoError } from "mongodb"
import { ZodError } from "zod"

export function errorResponse(error: unknown) {
    console.log(error)
    if (error instanceof ZodError) {
        return NextResponse.json({ error: (error as ZodError).errors[0] }, { status: 400 })
    } else if (error instanceof MongoError) {
        return NextResponse.json({ error: (error as MongoError).message }, { status: 400 })
    }
    return NextResponse.json({ error }, { status: 500 })
}
