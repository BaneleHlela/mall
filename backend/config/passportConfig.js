import passport from 'passport';
import GoogleStrategy from "passport-google-oauth20";
import { v4 as uuidv4 } from 'uuid'; 
import bcrypt from 'bcryptjs';       
import { Strategy as FacebookStrategy } from 'passport-facebook';
import  User  from '../models/UserModel.js';

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});


passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/api/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ googleId: profile.id });
        let isNewUser = false;

        if (!user) {
          const nameParts = profile.displayName?.split(' ') || ['Unknown', 'User'];
          const firstName = nameParts[0];
          const lastName = nameParts.slice(1).join(' ') || 'User';

          const randomPassword = uuidv4();
          const hashedPassword = await bcrypt.hash(randomPassword, 10);

          user = await User.create({
            googleId: profile.id,
            email: profile.emails?.[0].value,
            firstName,
            lastName,
            password: hashedPassword,
            avatar: profile.photos?.[0].value,
            isVerified: true,
          });

          isNewUser = true;
        }

        return done(null, { ...user.toObject(), isNewUser });
      } catch (error) {
        return done(error, null);
      }
    }
  )
);



// Facebook OAuth Strategy
passport.use(new FacebookStrategy(
  {
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: "/api/auth/facebook/callback",
    profileFields: ['id', 'first_name', 'last_name', 'email', 'picture.type(large)']
  },
  async ( accessToken, refreshToken, profile, done) => { // ✅ FIXED
    try {
      let user = await User.findOne({ facebookId: profile.id });
      let isNewUser = false;

      if (!user) {
        const firstName = profile.name?.givenName || 'Unknown';
        const lastName = profile.name?.familyName || 'User';

        const randomPassword = uuidv4();
        const hashedPassword = await bcrypt.hash(randomPassword, 10);

        user = await User.create({
          facebookId: profile.id,
          firstName,
          lastName,
          password: hashedPassword,
          email: profile.emails?.[0]?.value,
          avatar: profile.photos?.[0]?.value,
          isVerified: true
        });

        isNewUser = true;
      }

      return done(null, { ...user.toObject(), isNewUser });
    } catch (error) {
      return done(error, null);
    }
  }
));



export default passport;
