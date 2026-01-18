"use client";

import Navbar from "components/NavBar";
import Button from "components/Button";
import { useRouter } from "next/navigation";

export default function InfoPage() {
    const router = useRouter();

    return (
        <div
            style={{
                minHeight: "100vh",
                background:
                    "linear-gradient(180deg, #7ebeab 0%, #6fbfa5 60%, #f7f9f7 100%)",
            }}
        >
            <Navbar />

            {/* ---------- HERO ---------- */}
            <section
                style={{
                    padding: "120px 20px 90px",
                    textAlign: "center",
                    maxWidth: "1100px",
                    margin: "0 auto",
                }}
            >
                <h1
                    style={{
                        fontSize: "56px",
                        fontWeight: 900,
                        color: "#0f3d2a",
                        marginBottom: "22px",
                        letterSpacing: "-1px",
                    }}
                >
                    Food Waste in California
                </h1>

                <p
                    style={{
                        fontSize: "21px",
                        color: "#134a33",
                        maxWidth: "800px",
                        margin: "0 auto",
                        lineHeight: 1.7,
                    }}
                >
                    California grows more food than any other state — yet millions of
                    pounds of it are wasted every day. GreenSlug connects surplus food
                    directly to local demand, reducing waste while strengthening
                    California’s food economy.
                </p>
            </section>

            {/* ---------- CALIFORNIA STATS ---------- */}
            <section
                style={{
                    backgroundColor: "#f7f9f7",
                    padding: "100px 20px",
                }}
            >
                <div
                    style={{
                        maxWidth: "1100px",
                        margin: "0 auto",
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                        gap: "36px",
                    }}
                >
                    <StatCard
                        value="6M+"
                        label="tons of food wasted in California each year"
                        icon="🚯"
                    />
                    <StatCard
                        value="$18B+"
                        label="lost annually from food waste in California"
                        icon="💸"
                    />
                    <StatCard
                        value="#1"
                        label="largest agricultural producer in the U.S."
                        icon="🌾"
                    />
                </div>
            </section>

            {/* ---------- FARMERS ---------- */}
            <section
                style={{
                    padding: "100px 20px",
                    maxWidth: "1100px",
                    margin: "0 auto",
                }}
            >
                <h2
                    style={{
                        fontSize: "42px",
                        fontWeight: 800,
                        color: "#0f3d2a",
                        marginBottom: "26px",
                        textAlign: "center",
                    }}
                >
                    Supporting California Farmers
                </h2>

                <InfoGrid
                    items={[
                        {
                            icon: "🌾",
                            title: "Sell Surplus Produce",
                            text:
                                "California farmers lose revenue due to cosmetic standards, overproduction, and timing. GreenSlug helps convert surplus into income instead of waste.",
                        },
                        {
                            icon: "📍",
                            title: "Local Buyers, Fast",
                            text:
                                "Connect directly with nearby restaurants, grocers, and nonprofits across California.",
                        },
                        {
                            icon: "💰",
                            title: "Flexible & Fair Pricing",
                            text:
                                "Negotiate prices dynamically to match real-time supply and demand.",
                        },
                    ]}
                />
            </section>

            {/* ---------- BUSINESSES ---------- */}
            <section
                style={{
                    backgroundColor: "#f7f9f7",
                    padding: "100px 20px",
                }}
            >
                <h2
                    style={{
                        fontSize: "42px",
                        fontWeight: 800,
                        color: "#0f3d2a",
                        marginBottom: "26px",
                        textAlign: "center",
                    }}
                >
                    Helping California Businesses
                </h2>

                <InfoGrid
                    items={[
                        {
                            icon: "🏪",
                            title: "Lower Sourcing Costs",
                            text:
                                "Access fresh, local produce at competitive prices directly from California farmers.",
                        },
                        {
                            icon: "⏱️",
                            title: "Faster Procurement",
                            text:
                                "Reduce middlemen and sourcing delays with transparent, direct listings.",
                        },
                        {
                            icon: "♻️",
                            title: "Meet Sustainability Mandates",
                            text:
                                "Align with California’s food recovery and waste reduction goals while strengthening local supply chains.",
                        },
                    ]}
                />
            </section>

            {/* ---------- POLICY CONTEXT ---------- */}
            <section
                style={{
                    padding: "90px 20px",
                    maxWidth: "1000px",
                    margin: "0 auto",
                    textAlign: "center",
                }}
            >
                <h2
                    style={{
                        fontSize: "36px",
                        fontWeight: 800,
                        color: "#0f3d2a",
                        marginBottom: "20px",
                    }}
                >
                    Built for California’s Food System
                </h2>

                <p
                    style={{
                        fontSize: "18px",
                        color: "#134a33",
                        lineHeight: 1.7,
                    }}
                >
                    With California’s strict food waste reduction policies and massive
                    agricultural output, efficient redistribution is no longer optional.
                    GreenSlug provides the digital infrastructure needed to move food
                    quickly, locally, and responsibly.
                </p>
            </section>

            {/* ---------- CTA ---------- */}
            <section
                style={{
                    padding: "100px 20px",
                    textAlign: "center",
                    background: "linear-gradient(135deg, #349265, #2f7f5b)",
                }}
            >
                <h2
                    style={{
                        fontSize: "38px",
                        fontWeight: 800,
                        color: "#ffffff",
                        marginBottom: "16px",
                    }}
                >
                    Reduce Waste. Strengthen California.
                </h2>

                <p
                    style={{
                        fontSize: "18px",
                        color: "#e6f4ef",
                        maxWidth: "660px",
                        margin: "0 auto 36px",
                        lineHeight: 1.6,
                    }}
                >
                    GreenSlug connects California’s farms and businesses to ensure food
                    feeds people — not landfills.
                </p>

                <Button
                    text="Join GreenSlug"
                    primary
                    onClick={() => router.push("/login")}
                />
            </section>
        </div>
    );
}

/* ---------- COMPONENTS ---------- */

function StatCard({
                      value,
                      label,
                      icon,
                  }: {
    value: string;
    label: string;
    icon: string;
}) {
    return (
        <div
            style={{
                backgroundColor: "#ffffff",
                padding: "42px 32px",
                borderRadius: "22px",
                boxShadow: "0 14px 32px rgba(0,0,0,0.08)",
                textAlign: "center",
            }}
        >
            <div style={{ fontSize: "42px", marginBottom: "12px" }}>{icon}</div>
            <div
                style={{
                    fontSize: "38px",
                    fontWeight: 900,
                    color: "#136942",
                    marginBottom: "10px",
                }}
            >
                {value}
            </div>
            <p
                style={{
                    fontSize: "16px",
                    color: "#134a33",
                    lineHeight: 1.5,
                }}
            >
                {label}
            </p>
        </div>
    );
}

function InfoGrid({
                      items,
                  }: {
    items: { icon: string; title: string; text: string }[];
}) {
    return (
        <div
            style={{
                maxWidth: "1100px",
                margin: "0 auto",
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "36px",
            }}
        >
            {items.map((item, i) => (
                <div
                    key={i}
                    style={{
                        backgroundColor: "#ffffff",
                        padding: "38px 34px",
                        borderRadius: "22px",
                        boxShadow: "0 12px 28px rgba(0,0,0,0.08)",
                        textAlign: "center",
                    }}
                >
                    <div style={{ fontSize: "40px", marginBottom: "16px" }}>
                        {item.icon}
                    </div>
                    <h3
                        style={{
                            fontSize: "22px",
                            fontWeight: 700,
                            color: "#136942",
                            marginBottom: "12px",
                        }}
                    >
                        {item.title}
                    </h3>
                    <p
                        style={{
                            fontSize: "16px",
                            color: "#134a33",
                            lineHeight: 1.6,
                        }}
                    >
                        {item.text}
                    </p>
                </div>
            ))}
        </div>
    );
}
