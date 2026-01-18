import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const client = await clientPromise;
        const db = client.db("farmersDB");
        await db
            .collection("produce")
            .updateOne({ _id: new ObjectId(params.id) }, { $set: { sold: true } });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to mark sold" }, { status: 500 });
    }
}
