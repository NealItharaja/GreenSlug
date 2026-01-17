import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2025-12-15.clover",
});

export async function POST(req: Request) {
    try {
        const { amount, customerEmail } = await req.json();

        // Create a PaymentIntent
        const paymentIntent = await stripe.paymentIntents.create({
            amount, // in cents
            currency: "usd",
            receipt_email: customerEmail,
        });

        return NextResponse.json({ clientSecret: paymentIntent.client_secret });
    } catch (err) {
        return NextResponse.json({ error: (err as Error).message }, { status: 500 });
    }
}
