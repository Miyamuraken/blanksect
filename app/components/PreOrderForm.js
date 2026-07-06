"use client";

import { useState } from "react";

const WHATSAPP_NUMBER = "916238108677";
const UPI_ID = "abhinavsivakumar1022@okaxis";
const SIZES = ["S", "M", "L", "XL"];

export default function PreOrderForm() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [size, setSize] = useState("M");
  const [copied, setCopied] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim()) return;

    const message = [
      "Hi! I'd like to pre-order the Blanksect I AM. Tee.",
      `Name: ${name.trim()}`,
      `Size: ${size}`,
      "",
      "I'll send my UPI payment confirmation here once done.",
    ].join("\n");

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  }

  async function handleCopyUpi() {
    try {
      await navigator.clipboard.writeText(UPI_ID);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      /* clipboard blocked — the UPI id is still visible to copy manually */
    }
  }

  if (!open) {
    return (
      <button type="button" className="preorder-btn" onClick={() => setOpen(true)}>
        Pre-order
      </button>
    );
  }

  return (
    <div className="preorder-panel">
      <form className="preorder-form" onSubmit={handleSubmit}>
        <input
          type="text"
          required
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <select value={size} onChange={(e) => setSize(e.target.value)}>
          {SIZES.map((s) => (
            <option key={s} value={s}>
              Size {s}
            </option>
          ))}
        </select>
        <button type="submit" className="preorder-submit">
          Continue on WhatsApp
        </button>
      </form>

      <div className="preorder-upi">
        <span className="preorder-upi-label">Pay via UPI to confirm:</span>
        <button type="button" className="preorder-upi-value" onClick={handleCopyUpi}>
          {copied ? "Copied!" : UPI_ID}
        </button>
      </div>

      <style jsx>{`
        .preorder-panel {
          margin-top: 1.25rem;
          padding: 1.25rem;
          border: 1px solid rgba(244, 242, 236, 0.18);
          background: #111110;
          max-width: 420px;
        }
        .preorder-form {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        input,
        select {
          background: transparent;
          border: 1px solid rgba(244, 242, 236, 0.25);
          color: #f4f2ec;
          font-family: var(--font-body);
          font-size: 0.9rem;
          font-weight: 500;
          padding: 0.7rem 0.85rem;
          outline: none;
        }
        input::placeholder {
          color: rgba(244, 242, 236, 0.55);
        }
        select option {
          background: #111110;
          color: #f4f2ec;
        }
        .preorder-submit {
          background: transparent;
          border: 1px solid #d4af6a;
          color: #d4af6a;
          font-family: var(--font-mono);
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 0.8rem;
          cursor: pointer;
          transition: background 0.2s ease, color 0.2s ease;
        }
        .preorder-submit:hover {
          background: #d4af6a;
          color: #111110;
        }
        .preorder-upi {
          margin-top: 1rem;
          padding-top: 1rem;
          border-top: 1px solid rgba(244, 242, 236, 0.18);
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }
        .preorder-upi-label {
          font-family: var(--font-mono);
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: rgba(244, 242, 236, 0.65);
        }
        .preorder-upi-value {
          background: none;
          border: none;
          color: #f4f2ec;
          font-family: var(--font-mono);
          font-size: 0.85rem;
          font-weight: 600;
          text-align: left;
          padding: 0;
          cursor: pointer;
          text-decoration: underline;
          text-decoration-color: rgba(244, 242, 236, 0.35);
          text-underline-offset: 3px;
        }
        .preorder-upi-value:hover {
          text-decoration-color: #d4af6a;
        }
      `}</style>
    </div>
  );
}
