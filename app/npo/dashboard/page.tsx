"use client";

import Card from "../../../components/Card";
import Button from "../../../components/Button";
import { useState } from "react";

type Listing = {
  id: number;
  type: string;
  quantity: string;
};

export default function NPODashboard() {
  const [listings, setListings] = useState<Listing[]>([
    { id: 1, type: "Tomatoes", quantity: "50kg" },
    { id: 2, type: "Eggs", quantity: "200pcs" },
  ]);

  const requestDonation = (id: number) => {
    alert(`Donation request sent for ${listings.find(l => l.id === id)?.type}!`);
  };

  return (
    <div style={{ padding: "40px 20px", maxWidth: "1000px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "40px", marginBottom: "16px" }}>NPO / Food Bank Dashboard</h1>
      <p style={{ fontSize: "18px", marginBottom: "32px" }}>
        Request donations or discounted items, track goals, and manage food drives.
      </p>

      {listings.map(listing => (
        <Card key={listing.id}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span>{listing.type} — {listing.quantity}</span>
            <Button text="Request Donation" primary onClick={() => requestDonation(listing.id)} />
          </div>
        </Card>
      ))}
    </div>
  );
}

