// Create a new listing
export async function createListing(listing: {
  farmerId: string;
  type: string;
  quantity: number;
  price: number;
  status: string;
}) {
  const res = await fetch("/api/listings/create", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(listing),
  });

  const data = await res.json();
  return data;
}

// Update an existing listing
export async function updateListing(params: {
  listingId: string;
  quantity?: number;
  price?: number;
  status?: string;
}) {
  const res = await fetch("/api/listings/update", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(params),
  });

  const data = await res.json();
  return data;
}
