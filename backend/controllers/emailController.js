import nodemailer from "nodemailer";
import asyncHandler from "express-async-handler";

export const sendEmail = asyncHandler(async (req, res) => {
  const { destinationEmail, senderEmail, firstName, lastName, message, phone } = req.body;

  if (!destinationEmail || !senderEmail || !firstName || !lastName || !message || !phone) {
    res.status(400);
    throw new Error("All fields are required.");
  }

  console.log(phone);

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
    from: `"${firstName} ${lastName}" <${senderEmail}>`, // Sender's name and email
    to: destinationEmail, // Destination email
    subject: `Enquiry from ${firstName} ${lastName}`, // Subject line
    html: `
        <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px;">
          <p>Dear Recipient,</p>
          <p>${message}</p>
          <p>Kind regards,<br>${firstName} ${lastName}</p>
          
          <p style="margin-top: 30px;">
            <a href="tel:${phone}" 
              style="display: inline-block; padding: 10px 20px; background-color: #007BFF; color: white; 
                      text-decoration: none; border-radius: 5px; font-weight: bold;">
              Call Me  (${phone})
            </a>
          </p>
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