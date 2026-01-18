import { NextResponse } from "next/server";
import { createFarmer } from "@/lib/db/farmers";

export async function POST(req: Request) {
    const body = await req.json();
    const result = await createFarmer(body);
    return NextResponse.json({ success: true, id: result.insertedId });
}
