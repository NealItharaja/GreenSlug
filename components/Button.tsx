"use client";
import Link from "next/link";
import { MouseEventHandler } from "react";

type ButtonProps = {
  text: string;
  primary?: boolean;
  href?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

export default function Button({ text, primary, href, onClick }: ButtonProps) {
  const style: React.CSSProperties = {
    padding: "12px 28px",
    borderRadius: "12px",
    border: "none",
    cursor: "pointer",
    fontSize: "18px",
    fontWeight: 600,
    backgroundColor: primary ? "var(--green-primary)" : "white",
    color: primary ? "white" : "var(--green-deep)",
    boxShadow: primary
      ? "0 6px 15px rgba(52,146,101,0.4)"
      : "0 4px 12px rgba(0,0,0,0.1)",
    transition: "all 0.2s ease-in-out",
  };

  if (href) {
    return (
      <Link href={href} style={style}>
        {text}
      </Link>
    );
  }

  return (
    <button style={style} onClick={onClick}>
      {text}
    </button>
  );
}

