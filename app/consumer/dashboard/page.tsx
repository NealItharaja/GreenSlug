"use client";

import Card from "../../../components/Card";
import Button from "../../../components/Button";
import { useState } from "react";

type Listing = {
  id: number;
  type: string;
  quantity: string;
  price: string;
  deliveryStatus: string;
};

export default function ConsumerDashboard() {
  const [listings, setListings] = useState<Listing[]>([
    { id: 1, type: "Tomatoes", quantity: "50kg", price: "$2/kg", deliveryStatus: "Pending" },
    { id: 2, type: "Eggs", quantity: "200pcs", price: "$0.2/pc", deliveryStatus: "Delivered" },
  ]);

  const makeOffer = (id: number) => {
    alert(`Offer made for ${listings.find(l => l.id === id)?.type}!`);
  };

  return (
    <div style={{ padding: "40px 20px", maxWidth: "1000px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "40px", marginBottom: "16px" }}>Buyer / Business Dashboard</h1>
      <p style={{ fontSize: "18px", marginBottom: "32px" }}>
        Browse surplus items, make offers, and track delivery status.
      </p>

      {listings.map(listing => (
        <Card key={listing.id}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              {listing.type} — {listing.quantity} — {listing.price} — Delivery: {listing.deliveryStatus}
            </div>
            <Button text="Make Offer" primary onClick={() => makeOffer(listing.id)} />
          </div>
        </Card>
      ))}
    </div>
  );
}
