export async function createCheckoutSession(data: {
    produceId: string;
    offerAmount: number;
    produceName: string;
    farmerId: string;
}) {
    const res = await fetch("/api/checkout_sessions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    return res.json();
}

export async function finalizeOffer(sessionId: string) {
    const res = await fetch("/api/offers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId }),
    });
    return res.json();
}

export async function fetchOffers(farmerId: string) {
    const res = await fetch(`/api/offers?farmerId=${farmerId}`);
    return res.json();
}

export async function acceptOffer(offerId: string) {
    const res = await fetch("/api/offers", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ offerId, status: "accepted" }),
    });
    return res.json();
}
