import { NextRequest, NextResponse } from "next/server";
import { auth0 } from "@/lib/auth0";

export async function GET(req: NextRequest) {
    try {
        // Get the Auth0 session from the request
        const session = await auth0.getSession(req.headers.get("cookie") || "");

        if (!session || !session.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // Return Auth0 user profile only
        const { sub, email, name, picture } = session.user;

        return NextResponse.json({
            auth0User: { sub, email, name, picture },
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
