"use client";

import { useSearchParams, useRouter } from "next/navigation";

export default function Signup() {
    const params = useSearchParams();
    const email = params.get("email");
    const router = useRouter();

    return (
        <div style={{ textAlign: "center", padding: 80 }}>
            <h1>Sign up as</h1>

            <button onClick={() => router.push(`/signup/farmer?email=${email}`)}>
                Farmer
            </button>

            <button onClick={() => router.push(`/signup/customer?email=${email}`)}>
                Customer
            </button>
        </div>
    );
}
