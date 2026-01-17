import Input from "./Input";
import Button from "./Button";

export default function ListingForm() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px", maxWidth: "400px" }}>
      <Input placeholder="Food Type (Vegetables, Milk, Eggs…)" />
      <Input placeholder="Quantity" />
      <Input placeholder="Price" type="number" />
      <Button text="Post Listing" primary />
    </div>
  );
}
