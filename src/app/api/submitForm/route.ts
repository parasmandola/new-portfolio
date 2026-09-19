import { connectDB } from "@/db/connectDB";
import FormResponse from "@/models/formResponse.model";
import { sendMailNotification } from "@/lib/mail";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connectDB();
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const formResponse = new FormResponse({ name, email, message });

    await Promise.all([
      formResponse.save(),
      sendMailNotification({ name, email, message }).catch((err) =>
        console.error("Failed to send notification email:", err)
      ),
    ]);

    return NextResponse.json(
      { message: "Form submitted successfully" },
      { status: 200 }
    );
  } catch (err: any) {
    console.error(err);
    return NextResponse.json(
      { message: err?.message || "Error submitting form" },
      { status: 500 }
    );
  }
}
