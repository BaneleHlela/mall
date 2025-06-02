// sendMail.ts
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  secure: true,
  host: "smtp.gmail.com",
  port: 465,
  auth: {
    user: "gizahlela@gmail.com",
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

export async function sendMail({ to, subject, html }) {
  return transporter.sendMail({
    to,
    subject,
    html,
  });
}
