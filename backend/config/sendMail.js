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

export async function sendMail({ to, subject, html }) {
  console.log("Sending email to:", to, "Subject:", process.env.NEO_EMAIL_PASSWORD, process.env.SMTP_USER);
  return transporter.sendMail({
    to,
    subject,
    html,
  });
}
