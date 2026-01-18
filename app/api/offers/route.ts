import { NextResponse } from "next/server";
import { createOffer, getOffersByFarmer, updateOfferStatus } from "@/lib/db/offers";
import Stripe from "stripe";
import { ObjectId } from "mongodb";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    typescript: true,
});

export async function POST(req: Request) {
    const body = await req.json();
    const { sessionId } = body;

    if (!sessionId) {
        return NextResponse.json({ error: "Missing session ID" }, { status: 400 });
    }

    try {
        const session = await stripe.checkout.sessions.retrieve(sessionId);

        if (session.payment_status === "paid") {
            const { produceId, farmerId, offerAmount } = session.metadata || {};

            if (!produceId || !farmerId || !offerAmount) {
                return NextResponse.json({ error: "Invalid session metadata" }, { status: 400 });
            }

            // Check if offer already exists for this session to avoid duplicates
            // For now, simpler to just create. In prod, we'd query by stripeSessionId first.

            await createOffer({
                produceId: new ObjectId(produceId),
                farmerId: new ObjectId(farmerId),
                offerAmount: parseFloat(offerAmount),
                status: "paid",
                stripeSessionId: session.id,
                customerEmail: session.customer_details?.email || undefined,
            });

            return NextResponse.json({ success: true });
        } else {
            return NextResponse.json({ error: "Payment not successful" }, { status: 400 });
        }
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const farmerId = searchParams.get("farmerId");

    if (!farmerId) {
        return NextResponse.json({ error: "Missing farmerId" }, { status: 400 });
    }

    const offers = await getOffersByFarmer(farmerId);
    return NextResponse.json(offers);
}

export async function PATCH(req: Request) {
    const body = await req.json();
    const { offerId, status } = body;

    if (!offerId || !status) {
        return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    await updateOfferStatus(offerId, status);
    return NextResponse.json({ success: true });
}
