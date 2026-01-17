"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Signup() {
    const router = useRouter();
    const [email, setEmail] = useState<string | null>(null);

    useEffect(() => {
        // Fetch email from your post-login API route or session
        fetch("/api/auth0/route") // returns { auth0User }
            .then(res => res.json())
            .then(data => setEmail(data.auth0User.email));
    }, []);

    if (!email) return <div>Loading...</div>;

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
