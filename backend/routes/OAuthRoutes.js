import express from "express";
import passport from "passport";
import { handleOAuthSuccess } from "../utils/handleOAuthSuccess.js";

const router = express.Router();

// Google Authentication
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  async (req, res) => {
    try {
      await handleOAuthSuccess(req.user, res);
    } catch (err) {
      console.error("Google OAuth error:", err);
      res.redirect(`${process.env.CLIENT_URL}/login?error=server`);
    }
  }
);

// Facebook Authentication
router.get("/facebook", passport.authenticate("facebook", { scope: ["email"] }));

router.get(
  "/facebook/callback",
  passport.authenticate("facebook", { session: false }),
  async (req, res) => {
    try {
      await handleOAuthSuccess(req.user, res);
    } catch (err) {
      console.error("Facebook OAuth error:", err);
      res.redirect(`${process.env.CLIENT_URL}/login?error=server`);
    }
  }
);

export default router;
