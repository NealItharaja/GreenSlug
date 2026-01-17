"use client";

import { useState } from "react";
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
        </div>
    );
}
