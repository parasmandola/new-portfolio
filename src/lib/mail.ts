import nodemailer from "nodemailer";
import { renderSenderEmail, renderNotificationEmail } from "@/lib/emaleTemplates";

export async function sendMailNotification({
  name,
  email,
  message,
}: {
  name: string;
  email: string;
  message: string;
}) {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.warn("SMTP credentials missing. Skipping email dispatch.");
    return;
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: Number(process.env.SMTP_PORT) || 587,
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const senderHTML = await renderSenderEmail(name);
  const notificationHTML = await renderNotificationEmail({ name, email, message });

  const targetEmail = process.env.NOTIFICATION_EMAIL || process.env.SMTP_USER || "parasmandola73@gmail.com";

  await Promise.all([
    transporter.sendMail({
      from: `"Paras Mandola" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "Thanks for contacting me!",
      html: senderHTML,
    }),
    transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.SMTP_USER}>`,
      to: targetEmail,
      subject: "New portfolio submission",
      html: notificationHTML,
    }),
  ]);
}
