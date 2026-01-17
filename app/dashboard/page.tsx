import { auth0 } from "@/lib/auth0";
import { getFarmers } from "@/lib/db/farmers";
import { getCustomers } from "@/lib/db/customers";
import { redirect } from "next/navigation";

export default async function Dashboard() {
    console.log("Dashboard page accessed");
    const session = await auth0.getSession();

    if (!session || !session.user) {
        console.log("No session, redirecting to login");
        redirect("/auth/login");
    }

    const email = session.user.email;
    console.log("User email:", email);

    const farmers = await getFarmers();
    const farmer = farmers.find(f => f.email === email);
    if (farmer) {
        console.log("User is farmer, redirecting to:", `/farmer/dashboard?id=${farmer._id}`);
        redirect(`/farmer/dashboard?id=${farmer._id}`);
    }

    const customers = await getCustomers();
    const customer = customers.find(c => c.email === email);
    if (customer) {
        console.log("User is customer, redirecting");
        redirect(`/consumer/dashboard?id=${customer._id}`);
    }

    // If user not found in either DB, redirect to signup
    console.log("User not found, redirecting to signup");
    redirect(`/signup?email=${email}`);
}
