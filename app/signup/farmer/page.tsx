"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function FarmerSignup() {
    const params = useSearchParams();
    const router = useRouter();

    const [name, setName] = useState("");
    const [farmName, setFarmName] = useState("");

    async function submit() {
        const res = await fetch("/api/auth/signup/farmer", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name,
                farmName,
                email: params.get("email"),
            }),
        });

        const data = await res.json();
        router.push(`/farmer/dashboard?id=${data.id}`);
    }

    return (
        <div>
            <h1>Farmer Signup</h1>
            <input placeholder="Name" onChange={e => setName(e.target.value)} />
            <input placeholder="Farm Name" onChange={e => setFarmName(e.target.value)} />
            <button onClick={submit}>Create Account</button>
        </div>
    );
}
