import { NextResponse } from "next/server";
import { createProduce, getProduce, getProduceByFarmer } from "@/lib/db/produce";
import { ObjectId } from "mongodb";

/**
 * CREATE PRODUCE (Farmer)
 */
export async function POST(req: Request) {
    const body = await req.json();

    const {
        farmerId,
        name,
        category,
        pricePerUnit,
        unit,
        quantityAvailable,
    } = body;

    if (!farmerId || !name || !pricePerUnit || !unit) {
        return NextResponse.json(
            { success: false, error: "Missing required fields" },
            { status: 400 }
        );
    }

    const result = await createProduce({
        farmerId: new ObjectId(farmerId),
        name,
        category,
        pricePerUnit,
        unit,
        quantityAvailable,
    });

    return NextResponse.json({
        success: true,
        produceId: result.insertedId,
    });
}

/**
 * GET PRODUCE
 * - /api/produce → all (customers)
 * - /api/produce?farmerId=123 → farmer-specific
 */
export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const farmerId = searchParams.get("farmerId");

    const produce = farmerId
        ? await getProduceByFarmer(farmerId)
        : await getProduce();

    return NextResponse.json(produce);
}
