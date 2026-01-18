"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Input from "@/components/Input";
import Button from "@/components/Button";

export default function Login() {
    const [email, setEmail] = useState("");
    const router = useRouter();

    async function handleLogin() {
        // Redirect to Auth0 login
        window.location.href = "/auth/login";
    }

    return (
        <div style={{ padding: "80px 20px", textAlign: "center" }}>
            <h1>Login / Sign Up</h1>
            <div style={{ maxWidth: 400, margin: "0 auto" }}>
                <p>Sign in with Auth0 to continue</p>
                <Button text="Continue with Auth0" primary onClick={handleLogin} />
            </div>
        </div>
    );
}
