"use client";

import Card from "../../../components/Card";
import Button from "../../../components/Button";
import { useState } from "react";

type Listing = {
  id: number;
  type: string;
  quantity: string;
  price: string;
  status: "Open" | "Sold";
};

export default function FarmerDashboard() {
  const [listings, setListings] = useState<Listing[]>([
    { id: 1, type: "Tomatoes", quantity: "50kg", price: "$2/kg", status: "Open" },
    { id: 2, type: "Eggs", quantity: "200pcs", price: "$0.2/pc", status: "Open" },
  ]);

  const markSold = (id: number) => {
    setListings(prev => prev.map(l => l.id === id ? { ...l, status: "Sold" } : l));
    alert("Marked Sold!");
  };

  return (
    <div style={{ padding: "40px 20px", maxWidth: "1000px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "40px", marginBottom: "16px" }}>Farmer Dashboard</h1>
      <p style={{ fontSize: "18px", marginBottom: "32px" }}>
        List your surplus items with prices and track their status.
      </p>

      {listings.map(listing => (
        <Card key={listing.id}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span>
              {listing.type} — {listing.quantity} — {listing.price} — {listing.status === "Open" ? "🟢 Open" : "🔴 Sold"}
            </span>
            {listing.status === "Open" && (
              <Button text="Mark Sold" primary onClick={() => markSold(listing.id)} />
            )}
          </div>
        </Card>
      ))}
    </div>
  );
}
