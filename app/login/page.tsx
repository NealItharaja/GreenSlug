import Input from "../../components/Input";
import Button from "../../components/Button";

export default function Login() {
  return (
    <div style={{ padding: "80px 20px", textAlign: "center" }}>
      <h1 style={{ marginBottom: "24px" }}>Login / Sign Up</h1>
      <div style={{ display: "flex", flexDirection: "column", maxWidth: "400px", margin: "0 auto", gap: "16px" }}>
        <Input placeholder="Email" type="email" />
        <select style={{ padding: "12px", borderRadius: "8px", border: "1px solid var(--green-soft)", fontSize: "16px" }}>
          <option>Farmer</option>
          <option>Restaurant / Buyer</option>
          <option>Food Bank / NPO</option>
        </select>
        <Button text="Send Magic Link" primary />
      </div>
    </div>
  );
}
