import { NextResponse } from "next/server";
import { z } from "zod";
import dbConnect from "@/lib/db";
import Lead from "@/models/Lead";
import { sendLeadNotification } from "@/lib/mail";
import { sendWhatsAppNotification } from "@/lib/whatsapp";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const leadSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  company: z.string().optional(),
  subject: z.string().optional(),
  message: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Validate input
    const result = leadSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: "Validation failed", details: result.error.issues },
        { status: 400 }
      );
    }

    const { name, email, phone, company, subject, message } = result.data;

    // Connect to DB and save lead (Wrapped in try/catch so it doesn't block email sending if DB fails)
    let lead = { name, email, phone: phone || "Not provided", company, message, createdAt: new Date() };
    try {
      await dbConnect();
      lead = await Lead.create(lead);
    } catch (dbError) {
      console.warn("Database Error (Email will still be sent):", dbError.message || dbError);
    }

    // Send notifications asynchronously (don't block the response)
    Promise.all([
      sendLeadNotification({ name, email, phone, company, subject, message, createdAt: new Date() }),
      sendWhatsAppNotification(lead)
    ]).catch(err => console.error("Notification Error:", err));

    return NextResponse.json({ success: true, lead }, { status: 201 });
  } catch (error) {
    console.error("Error creating lead:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    // Basic JWT authentication check
    const cookieStore = cookies();
    const token = cookieStore.get("admin_token");

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
      jwt.verify(token.value, process.env.JWT_SECRET || "default_secret");
    } catch (e) {
      return NextResponse.json({ error: "Invalid Token" }, { status: 401 });
    }

    await dbConnect();
    const leads = await Lead.find().sort({ createdAt: -1 });

    return NextResponse.json({ success: true, leads });
  } catch (error) {
    console.error("Error fetching leads:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
