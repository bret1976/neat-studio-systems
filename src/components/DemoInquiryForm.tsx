"use client";
import { useState } from "react";
import Link from "next/link";
export function DemoInquiryForm({ configured }: { configured: boolean }) {
  const [status, setStatus] = useState("");
  const [pending, setPending] = useState(false);
  return (
    <form
      className="inquiry-form"
      onSubmit={async (e) => {
        e.preventDefault();
        if (pending) return;
        setPending(true);
        setStatus("");
        const form = e.currentTarget;
        const data = Object.fromEntries(new FormData(form));
        try {
          const response = await fetch("/api/inquiries", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
          });
          const result = await response.json();
          setStatus(result.message || "Unable to submit. Please try again.");
          if (response.ok) form.reset();
        } catch {
          setStatus(
            "The request could not be sent. Please check your connection and try again.",
          );
        } finally {
          setPending(false);
        }
      }}
    >
      <label>
        FULL NAME *
        <input name="name" autoComplete="name" required maxLength={100} />
      </label>
      <label>
        WORK EMAIL *
        <input
          name="email"
          type="email"
          autoComplete="email"
          required
          maxLength={254}
        />
      </label>
      <label>
        COMPANY OR STUDIO *
        <input
          name="company"
          autoComplete="organization"
          required
          maxLength={150}
        />
      </label>
      <label>
        ROLE *
        <select name="role" required defaultValue="">
          <option value="" disabled>
            Select your role
          </option>
          {[
            "Architect",
            "BIM Manager",
            "Interior Designer",
            "Engineer",
            "Design Lead",
            "Other",
          ].map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
      </label>
      <label>
        DESIGN SOFTWARE *
        <select name="software" required defaultValue="">
          <option value="" disabled>
            Select software interest
          </option>
          {["Revit", "Rhino", "ArchiCAD", "SketchUp", "Other"].map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
      </label>
      <label>
        TEAM SIZE *
        <select name="teamSize" required defaultValue="">
          <option value="" disabled>
            Select team size
          </option>
          {["1–5", "6–20", "21–50", "51+"].map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
      </label>
      <label className="wide">
        PRIMARY CHALLENGE *
        <input name="challenge" required minLength={5} maxLength={300} />
      </label>
      <label className="wide">
        MESSAGE *
        <textarea name="message" required minLength={10} maxLength={3000} />
      </label>
      <label className="honey" aria-hidden="true">
        LEAVE EMPTY
        <input name="website" tabIndex={-1} autoComplete="off" />
      </label>
      <p className="wide form-notice">
        Software options describe your interests, not existing integrations.
        Please do not include confidential model information. By submitting, you
        acknowledge the <Link href="/privacy">privacy notice</Link>.
      </p>
      {!configured && (
        <p className="wide form-result">
          Demo requests are not yet enabled. Email delivery credentials, sender,
          recipient, and managed rate limiting must be configured before this
          preview can accept inquiries.
        </p>
      )}
      <button className="button dark wide" disabled={!configured || pending}>
        {pending ? "SENDING…" : "REQUEST A DEMO ↗"}
      </button>
      <p role="status" className="wide">
        {status}
      </p>
    </form>
  );
}
