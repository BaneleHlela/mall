import { generateTokens } from "../config/generateTokens.js";
import { storeRefreshToken } from "../config/storeRefreshToken.js";
import { setCookies } from "../config/setCookies.js";
import { sendWelcomeEmail } from "../emails/email.js";

export const handleOAuthSuccess = async (
  user,
  res
) => {
  if (!user || !user._id) {
    return res.redirect(`${process.env.CLIENT_URL}/login?error=OAuth failed`);
  }

  const { accessToken, refreshToken } = generateTokens(user._id);
  await storeRefreshToken(user._id, refreshToken);
  setCookies(res, accessToken, refreshToken);

  // Send welcome email if it's a new user
  if (user.isNewUser) {
    try {
      await sendWelcomeEmail(user.email, user.name);
    } catch (e) {
      console.error("Failed to send welcome email", e);
    }
  }

  return res.redirect(`${process.env.CLIENT_URL}/oauth-callback`);
};
