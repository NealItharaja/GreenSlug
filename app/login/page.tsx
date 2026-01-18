"use client";

import { useRouter } from "next/navigation";
import Button from "@/components/Button";

export default function Login() {
    const router = useRouter();

    function handleLogin() {
        window.location.href = "/auth/login";
    }

    return (
        <main
            style={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "linear-gradient(180deg, #f3faf6, #ffffff)",
                padding: "20px",
            }}
        >
            <div
                style={{
                    width: "100%",
                    maxWidth: "420px",
                    background: "#ffffff",
                    borderRadius: "24px",
                    padding: "48px 40px",
                    boxShadow: "0 30px 60px rgba(0,0,0,0.08)",
                    textAlign: "center",
                }}
            >
                <h1
                    style={{
                        fontSize: "32px",
                        fontWeight: 900,
                        color: "#0f3d2a",
                        marginBottom: "12px",
                    }}
                >
                    Welcome to GreenSlug
                </h1>

                <p
                    style={{
                        fontSize: "16px",
                        color: "#4a6b5d",
                        lineHeight: 1.6,
                        marginBottom: "36px",
                    }}
                >
                    Sign in or create an account to access your dashboard and start
                    connecting with local food partners.
                </p>

                <Button
                    text="Continue"
                    primary
                    onClick={handleLogin}
                />

                <p
                    style={{
                        fontSize: "13px",
                        color: "#6b8f7d",
                        marginTop: "28px",
                        lineHeight: 1.5,
                    }}
                >
                    Secure authentication powered by Auth0
                </p>
            </div>
        </main>
    );
}
