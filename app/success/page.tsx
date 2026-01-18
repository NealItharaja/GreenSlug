"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { finalizeOffer } from "@/lib/api/offers";
import Link from "next/link";

export default function SuccessPage() {
    const searchParams = useSearchParams();
    const sessionId = searchParams.get("session_id");
    const [status, setStatus] = useState("processing");

    useEffect(() => {
        if (sessionId) {
            finalizeOffer(sessionId)
                .then((res) => {
                    if (res.success) setStatus("success");
                    else setStatus("error");
                })
                .catch(() => setStatus("error"));
        }
    }, [sessionId]);

    return (
        <Suspense fallback={<p>Loading...</p>}>
            <div style={{ padding: "40px", textAlign: "center" }}>
                {status === "processing" && <h1>Processing your offer...</h1>}
                {status === "success" && (
                    <>
                        <h1 style={{ color: "green", fontSize: "32px", marginBottom: "16px" }}>
                            Offer Submitted Successfully!
                        </h1>
                        <p style={{ fontSize: "18px" }}>
                            The farmer has been notified and will review your offer.
                        </p>
                    </>
                )}
                {status === "error" && (
                    <h1 style={{ color: "red" }}>Something went wrong verifying your payment.</h1>
                )}

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
        </Suspense>
    );
}
