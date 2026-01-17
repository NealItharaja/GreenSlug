"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Input from "@/components/Input";
import Button from "@/components/Button";

export default function Login() {
    const [email, setEmail] = useState("");
    const router = useRouter();

    async function handleLogin() {
        const res = await fetch("/api/auth/check", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
        });

        const data = await res.json();

        if (data.role === "farmer") {
            router.push(`/farmer/dashboard?id=${data.id}`);
        } else if (data.role === "customer") {
            router.push(`/consumer/dashboard?id=${data.id}`);
        } else {
            router.push(`/signup?email=${email}`);
        }
    }

    return (
        <div style={{ padding: "80px 20px", textAlign: "center" }}>
            <h1>Login / Sign Up</h1>
            <div style={{ maxWidth: 400, margin: "0 auto" }}>
                <Input
                    placeholder="Email"
                    type="email"
                    value={email}
                    onChange={(e:any) => setEmail(e.target.value)}
                />
                <Button text="Continue" primary onClick={handleLogin} />
            </div>
        </div>
    );
}
