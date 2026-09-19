import { NextResponse } from "next/server";
import { z } from "zod";
import { sendMailNotification } from "@/lib/mail";

const schema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  message: z.string().min(1),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, message } = schema.parse(body);

    await sendMailNotification({ name, email, message });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
