"use client";

import Card from "../../../../../Downloads/BaseVersion-main/BaseVersion-main/components/Card";
import Button from "../../../../../Downloads/BaseVersion-main/BaseVersion-main/components/Button";
import { useState } from "react";

type User = { id: number; name: string; role: string; verified: boolean };

export default function AdminDashboard() {
  const [users, setUsers] = useState<User[]>([
    { id: 1, name: "John's Farm", role: "Farmer", verified: false },
    { id: 2, name: "Happy Eats", role: "Buyer", verified: false },
    { id: 3, name: "Food Bank NYC", role: "NPO", verified: false },
  ]);

  const issueCertificate = (id: number) => {
    setUsers(prev =>
      prev.map(u => (u.id === id ? { ...u, verified: true } : u))
    );
    alert("Certificate issued!");
  };

  return (
    <div style={{ padding: "40px 20px", maxWidth: "900px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "40px", marginBottom: "24px" }}>Admin Dashboard</h1>

      {users.map(user => (
        <Card key={user.id}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span>
              {user.name} — {user.role} — {user.verified ? "✅ Verified" : "❌ Not Verified"}
            </span>
            {!user.verified && (
              <Button text="Issue Certificate" primary onClick={() => issueCertificate(user.id)} />
            )}
          </div>
        </Card>
      ))}
    </div>
  );
}
