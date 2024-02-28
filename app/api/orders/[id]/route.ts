import { NextRequest, NextResponse } from "next/server";
import getDb from "@/lib/db";
import { ObjectId } from "mongodb";
import { ApiOrderSchema } from "@/types/order";
import { errorResponse } from "../../utils";

// export async function GET(
//   _: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     const db = await getDb();

//     // Define aggregation pipeline stages
//     const pipeline: any[] = [
//       { $match: { _id: new ObjectId(params.id) } },
//       // Add fields and convert _id to ObjectId where needed
//       // Add comments for complex operations
//       {
//         $addFields: {
//           customer: {
//             $cond: {
//               if: { $eq: ["$customer", null] },
//               then: null,
//               else: { $toObjectId: "$customer" },
//             },
//           },
//           products: {
//             $map: {
//               input: "$products",
//               as: "product",
//               in: {
//                 $mergeObjects: [
//                   "$$product",
//                   { _id: { $toObjectId: "$$product._id" } },
//                 ],
//               },
//             },
//           },
//         },
//       },
//       // Unwind products array
//       { $unwind: "$products" },
//       // Perform a lookup to get product details
//       {
//         $lookup: {
//           from: "products",
//           localField: "products._id",
//           foreignField: "_id",
//           as: "products.productDetails",
//         },
//       },
//       // Group by _id and push product details into products array
//       {
//         $group: {
//           _id: "$_id",
//           products: {
//             $push: {
//               $mergeObjects: [
//                 "$products",
//                 { $arrayElemAt: ["$products.productDetails", 0] },
//               ],
//             },
//           },
//           // Include other fields as needed in the grouping
//         },
//       },
//       // Perform a lookup to get customer details
//       {
//         $lookup: {
//           from: "customers",
//           localField: "customer",
//           foreignField: "_id",
//           as: "customer",
//         },
//       },
//     ];

//     // Execute aggregation pipeline
//     const result = await db.collection("orders").aggregate(pipeline).toArray();

//     // Extract order and customer details
//     const order = result[0];
//     const customer = order.customerDetails[0] || null;

//     // Prepare response with extracted order and customer details
//     const response = { ...order, customer };
//     console.log(response);
//     return NextResponse.json(response, { status: 200 });
//   } catch (error) {
//     // Handle errors and return an appropriate response
//     return errorResponse(error);
//   }
// }

export async function GET(
  _: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const db = await getDb();
    const order = await db
      .collection("orders")
      .findOne({ _id: new ObjectId(params.id) });

    if (!order) {
      return NextResponse.json({ message: "Order not found" }, { status: 404 });
    }

    const customer = await db
      .collection("customers")
      .findOne({ _id: new ObjectId(order.customer) });

    const products = await db
      .collection("products")
      .find({
        _id: { $in: order.products.map((p: any) => new ObjectId(p._id)) },
      })
      .toArray();

    order.products = order.products.map((p: any) => {
      const product = products.find((pr: any) => pr._id.toString() === p._id);
      return { ...p, ...product };
    });

    order.customer = customer;

    console.log(order);

    return NextResponse.json(order, { status: 200 });
  } catch (error) {
    return errorResponse(error);
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const data = await request.json();

    const payload = ApiOrderSchema.parse(data);
    payload.updatedAt = new Date().toString();

    const db = await getDb();
    const updateResult = await db
      .collection("orders")
      .findOneAndUpdate(
        { _id: new ObjectId(params.id) },
        { $set: payload },
        { returnDocument: "after" }
      );

    return NextResponse.json(updateResult, { status: 200 });
  } catch (error) {
    return errorResponse(error);
  }
}

export async function DELETE(
  _: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const db = await getDb();
    const deleteResult = await db
      .collection("orders")
      .deleteOne({ _id: new ObjectId(params.id) });
    return NextResponse.json(deleteResult, { status: 200 });
  } catch (error) {
    return errorResponse(error);
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { field, value } = await request.json();
    console.log(field, value);
    const db = await getDb();
    const updateResult = await db
      .collection("orders")
      .findOneAndUpdate(
        { _id: new ObjectId(params.id) },
        { $set: { [field]: value } },
        { returnDocument: "after" }
      );

    if (!updateResult) {
      return NextResponse.json({ message: "Order not found" }, { status: 404 });
    }

    const customer = await db
      .collection("customers")
      .findOne({ _id: new ObjectId(updateResult?.customer) });

    const products = await db
      .collection("products")
      .find({
        _id: {
          $in: updateResult?.products.map((p: any) => new ObjectId(p._id)),
        },
      })
      .toArray();

    updateResult.products = updateResult?.products.map((p: any) => {
      const product = products.find((pr: any) => pr._id.toString() === p._id);
      return { ...p, ...product };
    });

    updateResult.customer = customer;

    return NextResponse.json(updateResult);
  } catch (error) {
    return errorResponse(error);
  }
}
