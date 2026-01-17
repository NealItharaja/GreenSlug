import { auth0 } from "./lib/auth0";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
    const pathname = req.nextUrl.pathname;

    // Public paths (skip auth)
    const publicPaths = ["/", "/login", "/signup"];
    if (publicPaths.some(path => pathname.startsWith(path))) {
        return NextResponse.next();
    }

    // Check Auth0 session
    const session = await auth0.getSession(req.headers.get("cookie") || "");
    if (!session || !session.user) {
        // API request → 401
        if (pathname.startsWith("/api")) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        // Page request → redirect to login
        return NextResponse.redirect(new URL("/auth/login", req.url));
    }

    // Authenticated → continue
    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
