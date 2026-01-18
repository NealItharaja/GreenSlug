export async function createProduceClient(data: {
    farmerId: string;
    name: string;
    category?: string;
    pricePerUnit: number;
    unit: string;
    quantityAvailable: number;
    harvestDate?: string;
}) {
    const res = await fetch("/api/produce", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });

    return res.json();
}

export async function fetchProduce(farmerId?: string) {
    const url = farmerId
        ? `/api/produce?farmerId=${farmerId}`
        : "/api/produce";

    const res = await fetch(url);
    return res.json();
}
