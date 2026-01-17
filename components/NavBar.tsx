import Button from "./Button";

export default function Navbar() {
  return (
    <nav style={{ display: "flex", justifyContent: "space-between", padding: "16px 32px", backgroundColor: "var(--green-deep)", color: "white" }}>
      <div style={{ fontWeight: "bold", fontSize: "24px" }}>GreenSlug</div>
      <div style={{ display: "flex", gap: "12px" }}>
        <Button text="Login" />
        <Button text="Sign Up" primary />
      </div>
    </nav>
  );
}
