import Link from "next/link";

export default function CancelPage() {
    return (
        <div style={{ padding: "40px", textAlign: "center" }}>
            <h1 style={{ color: "red", fontSize: "32px", marginBottom: "16px" }}>
                Payment Cancelled
            </h1>
            <p style={{ fontSize: "18px" }}>
                Your offer process was cancelled. No charges were made.
            </p>
            <div style={{ marginTop: "40px" }}>
                <Link
                    href="/consumer/dashboard"
                    style={{
                        padding: "10px 20px",
                        backgroundColor: "#0070f3",
                        color: "white",
                        borderRadius: "5px",
                        textDecoration: "none",
                    }}
                >
                    Return to Dashboard
                </Link>
            </div>
        </div>
    );
}
