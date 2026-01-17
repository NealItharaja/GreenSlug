"use client";

import Navbar from "../components/NavBar";
import Button from "../components/Button";
import { useRouter } from "next/navigation";

export default function Home() {
    const router = useRouter();

    return (
        <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
            <Navbar />

            <main
                style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                    padding: "60px 20px",
                    backgroundColor: "#7ebeab",
                    gap: "24px",
                }}
            >
                <h1 style={{ fontSize: "48px", fontWeight: 700, color: "#134a33" }}>
                    GreenSlug — Surplus Food to Community
                </h1>

                <p style={{ fontSize: "20px", color: "#134a33", maxWidth: "600px" }}>
                    Connect farms with restaurants and nonprofits. Reduce waste. Feed communities.
                </p>

                <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
                    <Button text="Get Started" primary onClick={() => router.push("/login")} />
                </div>
            </main>
        </div>
    );
}
