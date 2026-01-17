"use client";

import { useState } from "react";
import { createListing, updateListing } from "@/lib/api";

import { useSearchParams } from "next/navigation";

export default function FarmerDashboard() {
  const searchParams = useSearchParams();
  const farmerId = searchParams.get("id");

  const [type, setType] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  const [status, setStatus] = useState("open");
  const [listingId, setListingId] = useState(""); // for updates

  async function handleCreate() {
    const result = await createListing({ farmerId, type, quantity, price, status });
    console.log("Created:", result);
    if (result.success) setListingId(result.listingId);
  }

  async function handleUpdate() {
    if (!listingId) return alert("No listing selected to update");
    const result = await updateListing({ listingId, quantity, price, status });
    console.log("Updated:", result);
  }

  return (
    <div style={{ padding: "40px" }}>
      <h1>Farmer Dashboard</h1>

      <div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "400px" }}>
        <input
          placeholder="Type (e.g., Vegetables)"
          value={type}
          onChange={(e) => setType(e.target.value)}
        />
        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
        />
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="open">Open</option>
          <option value="sold">Sold</option>
        </select>

        <button onClick={handleCreate}>Create Listing</button>
        <button onClick={handleUpdate}>Update Listing</button>
      </div>
    </div>
  );
}
