"use client";

import Button from "../components/Button";

export default function Home() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "32px",
        backgroundColor: "#7ebeab",
        padding: "40px 20px",
        textAlign: "center",
      }}
    >
      <h1 style={{ fontSize: "56px", fontWeight: 800, color: "#134a33" }}>GreenSlug</h1>
      <p style={{ fontSize: "22px", color: "#134a33", maxWidth: "700px" }}>
        Connect farms with restaurants and nonprofits. Reduce waste. Feed communities.
      </p>

      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "20px" }}>
        <Button text="I'm a Farmer" primary href="/farmer/dashboard" />
        <Button text="I'm a Buyer / Business" href="/consumer/dashboard" />
        <Button text="I'm an NPO / Food Bank" href="/npo/dashboard" />
        <Button text="Admin Dashboard" href="/admin/dashboard" />
      </div>
    </div>
  );
}


