"use client";
import { auth0 } from "@/lib/auth0";
import LoginButton from "@/components/LoginButton";

export default async function Login() {
    const session = await auth0.getSession();
    const user = session?.user;

    // @ts-ignore
    // @ts-ignore
    return (
        <div className="app-container">
            <div className="main-card-wrapper">
                <div className="action-card">
                    {user ? (
                        <div className="logged-in-section">
                            <p className="logged-in-message">✅ Successfully logged in!</p>
                        </div>
                    ) : (
                        <>
                            <p className="action-text">
                                Welcome! Please log in to access your protected content.
                            </p>
                            <LoginButton />
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
