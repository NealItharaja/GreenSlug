"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/NavBar";
import Card from "@/components/Card";
import Button from "@/components/Button";
import { fetchProduce } from "@/lib/api/produce";

type Listing = {
    id: string;
    name: string;
    quantityAvailable: number;
    unit: string;
    price: number;
    category?: string;
};

export default function FarmerListingsPage() {
    const searchParams = useSearchParams();
    const farmerId = searchParams.get("id");
    const [listings, setListings] = useState<Listing[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!farmerId) return;

        fetchProduce().then((produce) => {
            const mine = produce
                .filter((p: any) => p.farmerId === farmerId)
                .map((p: any) => ({
                    id: p._id,
                    name: p.name,
                    quantityAvailable: p.quantityAvailable,
                    unit: p.unit,
                    price: p.pricePerUnit,
                    category: p.category,
                }));
            setListings(mine);
            setLoading(false);
        });
    }, [farmerId]);

    return (
        <Suspense fallback={<p>Loading listings...</p>}>
            <Navbar />
            <main
                style={{ minHeight: "100vh", background: "linear-gradient(180deg, #f3faf6, #ffffff)", padding: "120px 20px" }}
            >
                <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
                    <header style={{ marginBottom: "36px" }}>
                        <h1 style={{ fontSize: "38px", fontWeight: 900, color: "#0f3d2a", marginBottom: "8px" }}>📦 My Live Listings</h1>
                        <p style={{ fontSize: "18px", color: "#4a6b5d" }}>
                            View and manage all produce you currently have listed.
                        </p>
                    </header>

                    <div style={{ marginBottom: "28px" }}>
                        <Button
                            text="➕ Create New Listing"
                            onClick={() => (window.location.href = `/farmer/dashboard?id=${farmerId}`)}
                        />
                    </div>

                    {loading && <p>Loading your listings...</p>}
                    {!loading && listings.length === 0 && <p>You don’t have any active listings yet.</p>}

                    <div style={{ display: "grid", gap: "20px" }}>
                        {listings.map((listing) => (
                            <Card key={listing.id}>
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "20px" }}>
                                    <div>
                                        <strong>{listing.name}</strong>
                                        {listing.category && <span style={{ color: "#6b8f7d" }}> • {listing.category}</span>}
                                        <div style={{ marginTop: "6px" }}>
                                            {listing.quantityAvailable}
                                            {listing.unit} available — ${listing.price.toFixed(2)}/{listing.unit}
                                        </div>
                                    </div>
                                    <Button text="Edit" onClick={() => alert("Editing listings coming next 👀")} />
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </main>
        </Suspense>
    );
}
