"use client";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function SuccessPage() {
    const searchParams = useSearchParams();
    const listingId = searchParams.get("listingId");

    useEffect(() => {
        if (listingId) {
            fetch(`/api/produce/mark-sold/${listingId}`, { method: "POST" });
        }
    }, [listingId]);

    return (
        <div className="p-10">
            <h1 className="text-3xl font-bold mb-4">Payment Successful!</h1>
            <p>The farmer has been notified of your purchase.</p>
        </div>
    );
}
