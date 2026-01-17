"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function CustomerSignup() {
    const params = useSearchParams();
    const router = useRouter();

    const email = params.get("email");

    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [country, setCountry] = useState("");

    async function submit() {
        try {
            const res = await fetch("/api/auth/signup/customer", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name,
                    email,
                    phone,
                    address: {
                        city,
                        state,
                        country,
                    },
                }),
            });

            if (!res.ok) {
                throw new Error(`Signup failed: ${res.statusText}`);
            }

            const data = await res.json();
            console.log("Signup success:", data);
            router.push(`/consumer/dashboard?id=${data.id}`);
        } catch (error) {
            console.error("Signup error:", error);
            alert("Failed to create account. Please check console for details.");
        }
    }

    return (
        <div style={{ padding: "80px 20px", textAlign: "center" }}>
            <h1>Customer Signup</h1>

            <div style={{ maxWidth: 400, margin: "0 auto", display: "flex", flexDirection: "column", gap: 12 }}>
                <input placeholder="Full Name" onChange={e => setName(e.target.value)} />
                <input placeholder="Phone" onChange={e => setPhone(e.target.value)} />
                <input placeholder="City" onChange={e => setCity(e.target.value)} />
                <input placeholder="State" onChange={e => setState(e.target.value)} />
                <input placeholder="Country" onChange={e => setCountry(e.target.value)} />

                <button onClick={submit}>Create Account</button>
            </div>
        </div>
    );
}
