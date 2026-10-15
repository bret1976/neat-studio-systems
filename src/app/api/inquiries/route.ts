import { NextRequest, NextResponse } from "next/server";
import {
  inquirySchema,
  inquiriesConfigured,
  rateLimit,
  deliverInquiry,
} from "@/lib/inquiries";
export const runtime = "nodejs";
export async function POST(request: NextRequest) {
  const origin = request.headers.get("origin");
  if (origin && origin !== request.nextUrl.origin)
    return NextResponse.json(
      { message: "Submission origin is not allowed." },
      { status: 403 },
    );
  if (!request.headers.get("content-type")?.includes("application/json"))
    return NextResponse.json(
      { message: "JSON content is required." },
      { status: 415 },
    );
  if (Number(request.headers.get("content-length") || 0) > 14000)
    return NextResponse.json(
      { message: "Request is too large." },
      { status: 413 },
    );
  let data;
  try {
    const text = await request.text();
    if (text.length > 14000)
      return NextResponse.json(
        { message: "Request is too large." },
        { status: 413 },
      );
    data = JSON.parse(text);
  } catch {
    return NextResponse.json({ message: "Invalid request." }, { status: 400 });
  }
  const parsed = inquirySchema.safeParse(data);
  if (!parsed.success)
    return NextResponse.json(
      { message: "Please check the required fields and try again." },
      { status: 400 },
    );
  if (!inquiriesConfigured())
    return NextResponse.json(
      {
        message:
          "Inquiry delivery is not configured. This preview cannot accept demo requests yet.",
      },
      { status: 503 },
    );
  try {
    const ip =
      request.headers.get("x-vercel-forwarded-for")?.split(",")[0].trim() ||
      request.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
      "unknown";
    if (!(await rateLimit(ip)))
      return NextResponse.json(
        { message: "Too many requests. Please try again in ten minutes." },
        { status: 429, headers: { "Retry-After": "600" } },
      );
    await deliverInquiry(parsed.data);
    return NextResponse.json(
      {
        message:
          "Your inquiry has been accepted for email delivery. Thank you.",
      },
      { status: 202 },
    );
  } catch {
    return NextResponse.json(
      {
        message: "Your inquiry could not be accepted. Please try again later.",
      },
      { status: 502 },
    );
  }
}
