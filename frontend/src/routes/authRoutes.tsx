import { Route } from "react-router-dom";
import SignUpPage from "../pages/auth/SignUpPage";
import LoginPage from "../pages/auth/LoginPage";
import EmailVerificationPage from "../pages/auth/EmailVerificationPage";
import ForgotPasswordPage from "../pages/auth/ForgotPasswordPage";
import ResetPasswordPage from "../pages/auth/ResetPasswordPage";
import RedirectAuthenticatedUser from "../components/the_mall/authorization/RedirectAuthenticatedUser";
import OAuthCallback from "../components/the_mall/authorization/OAuthCallback";

const authRoutes = [
  <Route key="signup" path="/signup" element={<SignUpPage />} />,
  <Route
    key="login"
    path="/login"
    element={
      <RedirectAuthenticatedUser>
        <LoginPage />
      </RedirectAuthenticatedUser>
    }
  />,
  <Route key="verify" path="/verify-email" element={<EmailVerificationPage />} />,
  <Route
    key="forgot"
    path="/forgot-password"
    element={
      <RedirectAuthenticatedUser>
        <ForgotPasswordPage />
      </RedirectAuthenticatedUser>
    }
  />,
  <Route
    key="reset"
    path="/reset-password/:token"
    element={
      <RedirectAuthenticatedUser>
        <ResetPasswordPage />
      </RedirectAuthenticatedUser>
    }
  />,
  <Route path="/oauth-callback" element={<OAuthCallback />} />
];

export default authRoutes;
