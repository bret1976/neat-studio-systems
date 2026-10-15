import { z } from "zod";
import { createHash } from "node:crypto";
export const inquirySchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.email().max(254),
  company: z.string().trim().min(2).max(150),
  role: z.enum([
    "Architect",
    "BIM Manager",
    "Interior Designer",
    "Engineer",
    "Design Lead",
    "Other",
  ]),
  software: z.enum(["Revit", "Rhino", "ArchiCAD", "SketchUp", "Other"]),
  teamSize: z.enum(["1–5", "6–20", "21–50", "51+"]),
  challenge: z.string().trim().min(5).max(300),
  message: z.string().trim().min(10).max(3000),
  website: z.string().max(0).optional(),
});
export function inquiriesConfigured() {
  return !!(
    process.env.RESEND_API_KEY &&
    process.env.INQUIRY_FROM &&
    process.env.INQUIRY_TO &&
    process.env.UPSTASH_REDIS_REST_URL &&
    process.env.UPSTASH_REDIS_REST_TOKEN
  );
}
export async function rateLimit(ip: string) {
  const key = `neat:inquiry:${createHash("sha256").update(ip).digest("hex")}`;
  const response = await fetch(
    `${process.env.UPSTASH_REDIS_REST_URL}/multi-exec`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.UPSTASH_REDIS_REST_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify([
        ["INCR", key],
        ["EXPIRE", key, "600", "NX"],
      ]),
      signal: AbortSignal.timeout(5000),
    },
  );
  if (!response.ok) throw Error("limiter unavailable");
  const results = await response.json();
  if (
    !Array.isArray(results) ||
    results.some((r) => r.error) ||
    typeof results[0]?.result !== "number"
  )
    throw Error("limiter unavailable");
  return results[0].result <= 5;
}
export async function deliverInquiry(input: z.infer<typeof inquirySchema>) {
  const text = Object.entries(input)
    .filter(([k]) => k !== "website")
    .map(([k, v]) => `${k.toUpperCase()}: ${v}`)
    .join("\n\n");
  const result = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.INQUIRY_FROM,
      to: [process.env.INQUIRY_TO],
      reply_to: input.email,
      subject: "NEAT — New demo inquiry",
      text,
    }),
    signal: AbortSignal.timeout(10000),
  });
  if (!result.ok) throw Error("delivery failed");
  const body = await result.json();
  if (typeof body.id !== "string" || !body.id)
    throw Error("delivery not acknowledged");
  return body.id;
}
