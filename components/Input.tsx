type InputProps = { placeholder: string; type?: string };

export default function Input({ placeholder, type = "text" }: InputProps) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      style={{
        padding: "12px",
        borderRadius: "8px",
        border: "1px solid var(--green-soft)",
        fontSize: "16px",
        width: "100%",
      }}
    />
  );
}
