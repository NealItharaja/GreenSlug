import { NextResponse } from "next/server";
import { createCustomer, getCustomers } from "@/lib/db/customers";

export async function POST(req: Request) {
    try {
        const data = await req.json();
        const result = await createCustomer(data);
        return NextResponse.json({ insertedId: result.insertedId });
    } catch (err) {
        return NextResponse.json({ error: (err as Error).message }, { status: 500 });
    }
}

export async function GET() {
    try {
        const customers = await getCustomers();
        return NextResponse.json(customers);
    } catch (err) {
        return NextResponse.json({ error: (err as Error).message }, { status: 500 });
    }
}