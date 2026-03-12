import nodemailer from "nodemailer";
import asyncHandler from "express-async-handler";

export const sendEmail = asyncHandler(async (req, res) => {
  const {
    destinationEmail = process.env.CONTACT_EMAIL || "contact@themallbeta.com",
    senderEmail,
    name,
    subject,
    message,
    phone,
  } = req.body;

  if (!senderEmail || !name || !subject || !message) {
    res.status(400);
    throw new Error("senderEmail, name, subject and message are required.");
  }

  // Create a transporter
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST, // e.g., "smtp.gmail.com"
    port: process.env.SMTP_PORT, // e.g., 587
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER, // Your SMTP username
      pass: process.env.GMAIL_APP_PASSWORD, // Your SMTP password
    },
  });

  // Email options
  const mailOptions = {
    from: `"${name}" <${senderEmail}>`,
    to: destinationEmail,
    subject,
    html: `
      <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px;">
        <p><strong>From:</strong> ${name} &lt;${senderEmail}&gt;</p>
        ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ""}
        <p><strong>Message:</strong></p>
        <div style="padding: 12px; background: #f7f7f7; border-radius: 8px;">${message
          .replace(/\n/g, "<br />")}
        </div>
        <p style="margin-top: 24px;">Thanks,<br/>The Mall Support Team</p>
      </div>
    `,
  };

  try {
    // Send email
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Email sent successfully!" });
  } catch (error) {
    res.status(500);
    throw new Error("Failed to send email. Please try again later.");
  }
});