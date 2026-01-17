import React from "react";

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {}

export default function Input(props: InputProps) {
    return (
        <input
            {...props}
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
