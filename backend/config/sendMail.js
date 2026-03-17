// sendMail.ts
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  secure: true,
  host: process.env.SMTP_HOST,
  port: 465,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.NEO_EMAIL_PASSWORD,
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

await transporter.verify();
console.log("SMTP ready");