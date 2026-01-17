"use client";

import Card from "../../../components/Card";
import Button from "../../../components/Button";
import { useState } from "react";

type Listing = {
  id: number;
  type: string;
  quantity: string;
  price: number; // stored as number for bargaining
  deliveryStatus: string;
  offer?: number; // buyer offer
};

export default function ConsumerDashboard() {
  const [listings, setListings] = useState<Listing[]>([
    { id: 1, type: "Tomatoes", quantity: "50kg", price: 2, deliveryStatus: "Pending" },
    { id: 2, type: "Eggs", quantity: "200pcs", price: 0.2, deliveryStatus: "Delivered" },
  ]);

  const [activeOfferId, setActiveOfferId] = useState<number | null>(null);
  const [offerInput, setOfferInput] = useState("");

  const makeOffer = (id: number) => {
    setActiveOfferId(id);
  };

  const submitOffer = (id: number) => {
    const offer = parseFloat(offerInput);
    if (!isNaN(offer) && offer > 0) {
      setListings(prev =>
        prev.map(l => (l.id === id ? { ...l, offer } : l))
      );
      alert(`Offer of $${offer} submitted for ${listings.find(l => l.id === id)?.type}!`);
      setOfferInput("");
      setActiveOfferId(null);
    } else {
      alert("Enter a valid number for your offer.");
    }
  };

  return (
    <div style={{ padding: "40px 20px", maxWidth: "1000px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "40px", marginBottom: "16px" }}>Buyer / Business Dashboard</h1>
      <p style={{ fontSize: "18px", marginBottom: "32px" }}>
        Browse surplus items, make offers, and track delivery status.
      </p>

      {listings.map(listing => (
        <Card key={listing.id}>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                {listing.type} — {listing.quantity} — ${listing.price.toFixed(2)}/unit — Delivery: {listing.deliveryStatus}
                {listing.offer && <span> — Your Offer: ${listing.offer.toFixed(2)}</span>}
              </div>
              <Button text="Make Offer" primary onClick={() => makeOffer(listing.id)} />
            </div>

            {activeOfferId === listing.id && (
              <div style={{ display: "flex", gap: "8px", marginTop: "8px" }}>
                <input
                  type="number"
                  placeholder="Enter your offer"
                  value={offerInput}
                  onChange={e => setOfferInput(e.target.value)}
                  style={{ padding: "6px 12px", borderRadius: "6px", border: "1px solid #9bae8c", flex: 1 }}
                />
                <Button text="Submit" primary onClick={() => submitOffer(listing.id)} />
              </div>
            )}
          </div>
        </Card>
      ))}
    </div>
  );
}
