"use client";

export default function LoginButton() {
    return (
        <button
            onClick={() => (window.location.href = "/api/auth/login")}
            style={{
                padding: "12px 24px",
                background: "#0070f3",
                color: "white",
                borderRadius: 6,
            }}
        >
            Continue with Auth0
        </button>
    );
}
