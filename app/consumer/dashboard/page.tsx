"use client";

import Card from "../../../components/Card";
import Button from "../../../components/Button";
import { useEffect, useState } from "react";
import { fetchProduce } from "@/lib/api/produce";

type Listing = {
    id: string;
    name: string;
    quantityAvailable: number;
    unit: string;
    price: number;
    offer?: number;
    farmerId: string;
};

export default function ConsumerDashboard() {
    const [listings, setListings] = useState<Listing[]>([]);
    const [activeOfferId, setActiveOfferId] = useState<string | null>(null);
    const [offerInput, setOfferInput] = useState("");

    // 🔹 Load real produce from DB
    useEffect(() => {
        fetchProduce().then((produce) => {
            const mapped = produce.map((p: any) => ({
                id: p._id,
                name: p.name,
                quantityAvailable: p.quantityAvailable,
                unit: p.unit,
                price: p.pricePerUnit,
                farmerId: p.farmerId,
            }));
            setListings(mapped);
        });
    }, []);

    const makeOffer = (id: string) => {
        setActiveOfferId(id);
    };

    const submitOffer = async (id: string, name: string, farmerId: string) => {
        const offer = parseFloat(offerInput);
        if (!isNaN(offer) && offer > 0) {
            try {
                // Call API to create Stripe Session
                const { url, error } = await import("@/lib/api/offers").then((mod) =>
                    mod.createCheckoutSession({
                        produceId: id,
                        offerAmount: offer,
                        produceName: name,
                        farmerId: farmerId,
                    })
                );

                if (error) {
                    alert(`Error: ${error}`);
                    return;
                }

                if (url) {
                    window.location.href = url;
                }
            } catch (err) {
                console.error(err);
                alert("Something went wrong initiating payment.");
            }
        } else {
            alert("Enter a valid number for your offer.");
        }
    };

    return (
        <div style={{ padding: "40px 20px", maxWidth: "1000px", margin: "0 auto" }}>
            <h1 style={{ fontSize: "40px", marginBottom: "16px" }}>
                Buyer / Business Dashboard
            </h1>
            <p style={{ fontSize: "18px", marginBottom: "32px" }}>
                Browse surplus items, make offers, and track delivery status.
            </p>

            {listings.length === 0 && <p>No produce available right now.</p>}

            {listings.map((listing) => (
                <Card key={listing.id}>
                    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                            }}
                        >
                            <div>
                                <strong>{listing.name}</strong> —{" "}
                                {listing.quantityAvailable}
                                {listing.unit} — $
                                {listing.price.toFixed(2)}/{listing.unit}
                                {listing.offer && (
                                    <span>
                                        {" "}
                                        — Your Offer: ${listing.offer.toFixed(2)}
                                    </span>
                                )}
                            </div>
                            <Button
                                text="Make Offer"
                                primary
                                onClick={() => makeOffer(listing.id)}
                            />
                        </div>

                        {activeOfferId === listing.id && (
                            <div style={{ display: "flex", gap: "8px", marginTop: "8px" }}>
                                <input
                                    type="number"
                                    placeholder="Enter your offer"
                                    value={offerInput}
                                    onChange={(e) => setOfferInput(e.target.value)}
                                    style={{
                                        padding: "6px 12px",
                                        borderRadius: "6px",
                                        border: "1px solid #9bae8c",
                                        flex: 1,
                                    }}
                                />
                                <Button
                                    text="Submit"
                                    primary
                                    onClick={() => submitOffer(listing.id, listing.name, listing.farmerId)}
                                />
                            </div>
                        )}
                    </div>
                </Card>
            ))}
        </div>
    );
}
