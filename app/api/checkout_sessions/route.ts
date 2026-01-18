import { NextResponse } from "next/server";
import Stripe from "stripe";
import { getProduce } from "@/lib/db/produce";
import { ObjectId } from "mongodb";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    typescript: true,
});

export async function POST(req: Request) {
    const body = await req.json();
    const { produceId, offerAmount, produceName, farmerId } = body;

    const origin = req.headers.get("origin") || "http://localhost:3000";

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: [
                {
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name: `Offer for ${produceName}`,
                        },
                        unit_amount: Math.round(offerAmount * 100), // cents
                    },
                    quantity: 1,
                },
            ],
            mode: "payment",
            success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${origin}/cancel`,
            metadata: {
                produceId,
                farmerId,
                offerAmount: offerAmount.toString(),
            },
        });

        return NextResponse.json({ url: session.url });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
