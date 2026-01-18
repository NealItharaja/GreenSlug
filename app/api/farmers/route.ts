import { NextResponse } from "next/server";
import { createFarmer, getFarmers } from "@/lib/db/farmers";

export async function POST(req: Request) {
    const data = await req.json();
    const result = await createFarmer(data);
    return NextResponse.json({ insertedId: result.insertedId });
}

export async function GET() {
    const farmers = await getFarmers();
    return NextResponse.json(farmers);
}