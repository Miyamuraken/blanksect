"use client";

import { useState } from "react";

export default function EmailCapture({ ctaLabel = "Enter the Society", id }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [message, setMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: id || "general" }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Something went wrong.");
      setStatus("success");
      setMessage("You're in. Watch your inbox.");
      setEmail("");
    } catch (err) {
      setStatus("error");
      setMessage(err.message || "Couldn't sign you up. Try again.");
    }
  }

  return (
    <form className="email-capture" onSubmit={handleSubmit}>
      <div className="email-row">
        <input
          type="email"
          required
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-label="Email address"
          disabled={status === "loading" || status === "success"}
        />
        <button type="submit" disabled={status === "loading" || status === "success"}>
          {status === "loading" ? "..." : ctaLabel}
        </button>
      </div>
      {message && (
        <p className={`email-message ${status === "error" ? "is-error" : "is-success"}`}>
          {message}
        </p>
      )}

      <style jsx>{`
        .email-capture {
          width: 100%;
          max-width: 420px;
        }
        .email-row {
          display: flex;
          gap: 0;
          border: 1px solid var(--border);
          background: var(--bg-raised);
        }
        input {
          flex: 1;
          background: transparent;
          border: none;
          color: var(--text);
          font-family: var(--font-body);
          font-size: 0.9rem;
          padding: 0.9rem 1rem;
          outline: none;
        }
        input::placeholder {
          color: var(--text-muted);
        }
        button {
          background: transparent;
          border: none;
          border-left: 1px solid var(--border);
          color: var(--bronze);
          font-family: var(--font-mono);
          font-size: 0.7rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          padding: 0 1.25rem;
          cursor: pointer;
          white-space: nowrap;
          transition: color 0.2s ease, border-color 0.2s ease;
        }
        button:hover:not(:disabled) {
          color: var(--text);
          border-color: var(--bronze);
        }
        button:disabled {
          opacity: 0.5;
          cursor: default;
        }
        .email-message {
          margin-top: 0.6rem;
          font-family: var(--font-mono);
          font-size: 0.72rem;
          letter-spacing: 0.04em;
        }
        .is-success {
          color: var(--bronze);
        }
        .is-error {
          color: var(--accent-bright);
        }
      `}</style>
    </form>
  );
}
