// app/postLogin/page.tsx
import { auth0 } from "@/lib/auth0";
import clientPromise from "@/lib/mongodb";
import { redirect } from "next/navigation";

export default async function PostLoginPage({ request }: { request: Request }) {
    const session = await auth0.getSession(request);

    if (!session || !session.user) {
        redirect("/login");
    }

    const { email } = session.user;
    const client = await clientPromise;
    const db = client.db("myDatabase");

    const farmer = await db.collection("farmers").findOne({ email });
    if (farmer) redirect(`/farmer/dashboard?id=${farmer._id}`);

    const customer = await db.collection("customers").findOne({ email });
    if (customer) redirect(`/consumer/dashboard?id=${customer._id}`);

    // New user → redirect to signup
    redirect(`/signup?email=${email}`);

    return <div>Loading...</div>;
}
