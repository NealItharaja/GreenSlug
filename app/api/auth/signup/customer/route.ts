import { NextResponse } from "next/server";
import { createCustomer } from "@/lib/db/customers";

export async function POST(req: Request) {
    const body = await req.json();
    const result = await createCustomer(body);
    return NextResponse.json({ success: true, id: result.insertedId });
}
