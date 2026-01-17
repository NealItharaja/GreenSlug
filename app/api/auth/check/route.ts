import { NextResponse } from "next/server";
import { getFarmers } from "@/lib/db/farmer";
import { getCustomers } from "@/lib/db/customer";

export async function POST(req: Request) {
    const { email } = await req.json();

    const farmers = await getFarmers();
    const customers = await getCustomers();

    const farmer = farmers.find(f => f.email === email);
    if (farmer) {
        return NextResponse.json({ role: "farmer", id: farmer._id });
    }

    const customer = customers.find(c => c.email === email);
    if (customer) {
        return NextResponse.json({ role: "customer", id: customer._id });
    }

    return NextResponse.json({ role: "new" });
}
