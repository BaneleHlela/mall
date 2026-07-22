// sendMail.ts
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  secure: true,
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

export async function sendMail({ to, subject, html, from }) {
  return transporter.sendMail({
    from: from || process.env.SMTP_USER,
    to,
    subject,
    html,
  });
}

transporter.verify().then(
  () => console.log("SMTP ready"),
  (err) => console.error("SMTP verify failed (email sending may be unavailable):", err.message)
);