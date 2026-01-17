import { NextResponse } from "next/server";
import { createProduce, getProduce } from "@/lib/db/produce";

export async function POST(req: Request) {
    const data = await req.json();
    const result = await createProduce(data);
    return NextResponse.json({ insertedId: result.insertedId });
}

export async function GET() {
    const produce = await getProduce();
    return NextResponse.json(produce);
}