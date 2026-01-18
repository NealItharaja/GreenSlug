"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { createProduceClient } from "@/lib/api/produce";
import Navbar from "@/components/NavBar";

export default function FarmerDashboard() {
    const searchParams = useSearchParams();
    const farmerId = searchParams.get("id");

    const [name, setName] = useState("");
    const [category, setCategory] = useState("Vegetables");
    const [quantity, setQuantity] = useState<number | "">("");
    const [price, setPrice] = useState<number | "">("");
    const [unit, setUnit] = useState("kg");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    async function handleCreate() {
        if (!farmerId) return alert("Missing farmer ID");
        if (!name || !quantity || !price)
            return alert("Please fill all required fields");

        setLoading(true);
        setSuccess(false);

        await createProduceClient({
            farmerId,
            name,
            category,
            pricePerUnit: Number(price),
            unit,
            quantityAvailable: Number(quantity),
        });


        setLoading(false);
        setSuccess(true);

        setName("");
        setQuantity("");
        setPrice("");
    }

    return (
        <>
            {/* ✅ NAVBAR */}
            <Navbar />

            {/* PAGE CONTENT */}
            <main
                style={{
                    minHeight: "100vh",
                    background: "linear-gradient(180deg, #f3faf6, #ffffff)",
                    padding: "120px 20px", // ⬅ extra top padding for navbar
                }}
                >
                <div
                    style={{
                        maxWidth: "820px",
                        margin: "0 auto",
                        background: "#ffffff",
                        borderRadius: "28px",
                        padding: "48px",
                        boxShadow: "0 30px 60px rgba(0,0,0,0.08)",
                    }}
                >
                    {/* HEADER */}
                    <header
                        style={{
                            marginBottom: "36px",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            gap: "20px",
                            flexWrap: "wrap",
                        }}
                    >
                        <div>
                            <h1
                                style={{
                                    fontSize: "38px",
                                    fontWeight: 900,
                                    color: "#0f3d2a",
                                    marginBottom: "8px",
                                }}
                            >
                                🌾 Farmer Dashboard
                            </h1>

                            <p
                                style={{
                                    fontSize: "18px",
                                    color: "#4a6b5d",
                                    lineHeight: 1.6,
                                }}
                            >
                                List your surplus produce and connect directly with local buyers and nonprofits.
                            </p>
                        </div>

                        {/* DASHBOARD SWITCH */}
                        <button
                            onClick={() =>
                                window.location.href = `/farmer/listings?id=${farmerId}`
                            }
                            style={{
                                padding: "12px 18px",
                                borderRadius: "14px",
                                border: "1px solid #cfe5da",
                                background: "#f3faf6",
                                color: "#136942",
                                fontSize: "15px",
                                fontWeight: 800,
                                cursor: "pointer",
                                whiteSpace: "nowrap",
                            }}
                        >
                            📦 My Live Listings
                        </button>
                    </header>
                    {/* FORM */}
                    <section style={{ display: "grid", gap: "22px" }}>
                        <Field label="Produce Name *">
                            <input
                                placeholder="e.g. Organic Tomatoes"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </Field>

                        <Field label="Category">
                            <select value={category} onChange={(e) => setCategory(e.target.value)}>
                                <option>Vegetables</option>
                                <option>Fruits</option>
                                <option>Dairy</option>
                                <option>Eggs</option>
                                <option>Grains</option>
                                <option>Other</option>
                            </select>
                        </Field>
                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: "2fr 1fr",
                                gap: "18px",
                            }}
                        >
                            <Field label="Quantity Available *">
                                <input
                                    type="number"
                                    placeholder="50"
                                    value={quantity}
                                    onChange={(e) =>
                                        setQuantity(e.target.value === "" ? "" : Number(e.target.value))
                                    }
                                />
                            </Field>

                            <Field label="Unit">
                                <select value={unit} onChange={(e) => setUnit(e.target.value)}>
                                    <option value="kg">kg</option>
                                    <option value="lb">lb</option>
                                    <option value="box">box</option>
                                    <option value="crate">crate</option>
                                </select>
                            </Field>
                        </div>
                        <Field label="Price per Unit ($) *">
                            <input
                                type="number"
                                placeholder="2.50"
                                value={price}
                                onChange={(e) =>
                                    setPrice(e.target.value === "" ? "" : Number(e.target.value))
                                }
                            />
                        </Field>

                        <button
                            onClick={handleCreate}
                            disabled={loading}
                            style={{
                                marginTop: "18px",
                                padding: "16px",
                                borderRadius: "14px",
                                border: "none",
                                background: "linear-gradient(135deg, #136942, #1b8c5a)",
                                color: "#ffffff",
                                fontSize: "17px",
                                fontWeight: 800,
                                cursor: loading ? "not-allowed" : "pointer",
                                boxShadow: "0 12px 30px rgba(19,105,66,0.35)",
                            }}
                        >
                            {loading ? "Creating Listing..." : "Create Produce Listing"}
                        </button>

                        {success && (
                        <div
                            style={{
                                background: "#e6f4ef",
                                color: "#136942",
                                padding: "14px",
                                borderRadius: "12px",
                                textAlign: "center",
                                fontWeight: 700,
                            }}
                        >
                            ✅ Your produce listing is live!
                        </div>
                    )}
                </section>
            </div>
        </main>
    </>
    );
}

function Field({
                   label,
                   children,
               }: {
    label: string;
    children: React.ReactNode;
}) {
    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <label
                style={{
                    fontSize: "14px",
                    fontWeight: 700,
                    color: "#134a33",
                }}
            >
                {label}
            </label>

            {cloneWithStyle(children)}
        </div>
    );
}

function cloneWithStyle(child: any) {
    return {
        ...child,
        props: {
            ...child.props,
            style: {
                width: "100%",
                padding: "14px",
                borderRadius: "12px",
                border: "1px solid #d6e6df",
                fontSize: "15px",
                outline: "none",
                background: "#ffffff",
            },
        },
    };
}
