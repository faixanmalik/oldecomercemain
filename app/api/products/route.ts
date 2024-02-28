import getDb from "@/lib/db";
import { ApiProductSchema } from "@/types/product";
import { NextRequest, NextResponse } from "next/server";
import { errorResponse } from "../utils";
import { ObjectId } from "mongodb";

export async function POST(request: NextRequest) {
  try {
    const payload = ApiProductSchema.parse(await request.json());
    const db = await getDb();

    /* ts-ignore */
    payload.createdAt = new Date().toString();
    payload.updatedAt = new Date().toString();

    const insertResult = await db.collection("products").insertOne(payload);
    console.log(insertResult);
    return NextResponse.json(insertResult, { status: 201 });
  } catch (error) {
    return errorResponse(error);
  }
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const fields: string[] = searchParams.get("fields")?.split(",") || [];
    const limit = Number(searchParams.get("limit") || 20);
    const page = Number(searchParams.get("page") || 0);
    const q = searchParams.get("q");

    const collection = searchParams.get("collection");
    const tags = searchParams.get("tags");
    const vendor = searchParams.get("vendor");

    const idsParam = searchParams.get("ids");
    const ids = idsParam ? idsParam.split(",") : [];

    const pipeline: any = [
      {
        $skip: limit * page,
      },
      {
        $limit: limit,
      },
    ];

    if (q) {
      pipeline.push({
        $match: {
          $or: [
            { name: { $regex: q, $options: "i" } },
            { description: { $regex: q, $options: "i" } },
          ],
        },
      });
    }

    if (ids && ids.length > 0) {
      pipeline.push({
        $match: {
          _id: {
            $in: ids.map((id) => ObjectId.createFromHexString(id)),
          },
        },
      });
    }

    if (collection) {
      pipeline.push({
        $match: {
          collection: collection,
        },
      });
    }

    if (tags) {
      pipeline.push({
        $match: {
          tags: {
            $in: tags.split(","),
          },
        },
      });
    }

    if (vendor) {
      pipeline.push({
        $match: {
          vendor: vendor.replace("+", " "),
        },
      });
    }

    if (fields && fields.length > 0) {
      pipeline.push({
        $project: fields.reduce((acc, curr) => ({ ...acc, [curr]: 1 }), {}),
      });
    }

    const db = await getDb();
    const products = await db
      .collection("products")
      .aggregate(pipeline)
      .toArray();

    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    return errorResponse(error);
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const db = await getDb();

    const ids = request.nextUrl.searchParams.get("ids")?.split(",") || [];
    console.log(ids);

    const deleteResult = await db.collection("products").deleteMany({
      _id: {
        $in: ids.map((id) => ObjectId.createFromHexString(id)),
      },
    });
    return NextResponse.json(deleteResult, { status: 200 });
  } catch (error) {
    return errorResponse(error);
  }
}
