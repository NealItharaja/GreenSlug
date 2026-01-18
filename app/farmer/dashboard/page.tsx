"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { createProduceClient } from "@/lib/api/produce";

export default function FarmerDashboard() {
    const searchParams = useSearchParams();
    const farmerId = searchParams.get("id");

    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [quantity, setQuantity] = useState(0);
    const [price, setPrice] = useState(0);
    const [unit, setUnit] = useState("kg");

    async function handleCreate() {
        if (!farmerId) return alert("Missing farmer ID");

        const result = await createProduceClient({
            farmerId,
            name,
            category,
            pricePerUnit: price,
            unit,
            quantityAvailable: quantity,
        });

        console.log("Produce created:", result);
    }

    return (
        <div style={{ padding: "40px" }}>
            <h1>Farmer Dashboard</h1>

            <div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "400px" }}>
                <input
                    placeholder="Produce name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <input
                    placeholder="Category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                />

                <input
                    type="number"
                    placeholder="Quantity Available"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                />

                <input
                    type="number"
                    placeholder="Price per unit"
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                />

                <input
                    placeholder="Unit (kg, lb, box)"
                    value={unit}
                    onChange={(e) => setUnit(e.target.value)}
                />

                <button onClick={handleCreate}>Create Produce Listing</button>
            </div>

            <hr style={{ margin: "40px 0" }} />

            <OffersSection farmerId={farmerId} />
        </div>
    );
}

function OffersSection({ farmerId }: { farmerId: string }) {
    const [offers, setOffers] = useState<any[]>([]);

    useEffect(() => {
        if (farmerId) {
            import("@/lib/api/offers").then((mod) => {
                mod.fetchOffers(farmerId).then(setOffers);
            });
        }
    }, [farmerId]);

    const handleAccept = async (offerId: string) => {
        const { acceptOffer } = await import("@/lib/api/offers");
        await acceptOffer(offerId);
        setOffers((prev) =>
            prev.map((o) => (o._id === offerId ? { ...o, status: "accepted" } : o))
        );
        alert("Offer accepted!");
    };

    return (
        <div>
            <h2>Incoming Offers</h2>
            {offers.length === 0 && <p>No offers yet.</p>}
            <ul style={{ listStyle: "none", padding: 0 }}>
                {offers.map((offer) => (
                    <li
                        key={offer._id}
                        style={{
                            border: "1px solid #ddd",
                            padding: "16px",
                            marginBottom: "8px",
                            borderRadius: "8px",
                        }}
                    >
                        <div>
                            <strong>Amount: ${offer.offerAmount.toFixed(2)}</strong>
                            <span
                                style={{
                                    marginLeft: "10px",
                                    padding: "4px 8px",
                                    borderRadius: "4px",
                                    backgroundColor:
                                        offer.status === "accepted"
                                            ? "#d4edda"
                                            : offer.status === "paid"
                                                ? "#fff3cd"
                                                : "#f8d7da",
                                    color:
                                        offer.status === "accepted"
                                            ? "#155724"
                                            : offer.status === "paid"
                                                ? "#856404"
                                                : "#721c24",
                                }}
                            >
                                {offer.status.toUpperCase()}
                            </span>
                        </div>
                        <div style={{ marginTop: "8px" }}>
                            <small>From: {offer.customerEmail || "Anonymous"}</small>
                        </div>
                        {offer.status === "paid" && (
                            <button
                                onClick={() => handleAccept(offer._id)}
                                style={{
                                    marginTop: "8px",
                                    padding: "6px 12px",
                                    backgroundColor: "#28a745",
                                    color: "white",
                                    border: "none",
                                    borderRadius: "4px",
                                    cursor: "pointer",
                                }}
                            >
                                Accept Offer
                            </button>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}
