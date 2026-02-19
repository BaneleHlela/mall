import { sendMail } from "../config/sendMail.js"; 
import {
	PASSWORD_RESET_REQUEST_TEMPLATE,
	PASSWORD_RESET_SUCCESS_TEMPLATE,
	VERIFICATION_EMAIL_TEMPLATE,
  WELCOME_EMAIL_TEMPLATE,
  STORE_CREATED_EMAIL_TEMPLATE

} from "./emailTemplates.js";

export const sendVerificationEmail = async (email, verificationToken) => {
  try {
    const baseUrl = process.env.CLIENT_URL || "https://yourdomain.com"; // or use your actual domain
    const verificationLink = `${baseUrl}/verify-email?token=${verificationToken}`;

    const html = VERIFICATION_EMAIL_TEMPLATE
      .replace("{verificationCode}", verificationToken)
      .replace("{verificationLink}", verificationLink);

    const response = await sendMail({
      to: email,
      subject: "Verify your email",
      html,
    });

    console.log("Email sent successfully", response);
  } catch (error) {
    console.error("Error sending verification email:", error);
    throw new Error(`Error sending verification email: ${error}`);
  }
};


export const sendWelcomeEmail = async (email, name) => {
  try {
    const html = WELCOME_EMAIL_TEMPLATE
      .replace("{name}", name)
      .replace("{company_info_name}", "The Mall");

    const response = await sendMail({
      to: email,
      subject: "Welcome to The Mall!",
      html,
    });

    console.log("Welcome email sent successfully", response);
  } catch (error) {
    console.error("Error sending welcome email:", error);
    throw new Error(`Error sending welcome email: ${error}`);
  }
};

export const sendPasswordResetEmail = async (email, resetURL) => {
  try {
    const html = PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL);

    const response = await sendMail({
      to: email,
      subject: "Reset your password",
      html,
    });

    console.log("Password reset email sent successfully", response);
  } catch (error) {
    console.error("Error sending password reset email:", error);
    throw new Error(`Error sending password reset email: ${error}`);
  }
};

export const sendResetSuccessEmail = async (email) => {
  try {
    const html = PASSWORD_RESET_SUCCESS_TEMPLATE;

    const response = await sendMail({
      to: email,
      subject: "Password Reset Successful",
      html,
    });

    console.log("Password reset success email sent successfully", response);
  } catch (error) {
    console.error("Error sending password reset success email:", error);
    throw new Error(`Error sending password reset success email: ${error}`);
  }
};

export const sendStoreCreatedEmail = async (email, name, storeName, dashboardURL) => {
  try {
    const html = STORE_CREATED_EMAIL_TEMPLATE
      .replace("{name}", name)
      .replace("{storeName}", storeName)
      .replace("{dashboardURL}", dashboardURL);

    const response = await sendMail({
      to: email,
      subject: `Your store "${storeName}" has been created!`,
      html,
    });

    console.log("Store created email sent successfully", response);
  } catch (error) {
    console.error("Error sending store created email:", error);
    throw new Error(`Error sending store created email: ${error}`);
  }
};


export const sendStoreIsLiveEmail = async () => {

};

