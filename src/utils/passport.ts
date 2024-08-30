import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from '../config/env';

import dotenv from 'dotenv';
dotenv.config();

import User from '../models/user.model';

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID!,
      clientSecret: GOOGLE_CLIENT_SECRET!,
      callbackURL: '/auth/callback',
    },
    async (_, __, profile, done) => {
      try {
        let user = await User.findOne({ where: { googleId: profile.id } });
        if (!user) {
          user = await User.create({
            googleId: profile.id,
            email: profile.emails![0].value,
            name: profile.displayName,
          });
        } else {
          user.email = profile.emails![0].value;
          user.name = profile.displayName;
          await user.save();
        }
        return done(null, user as User);
      } catch (err) {
        return done(err);
      }
    },
  ),
);

passport.serializeUser((user, done) => {
  done(null, (user as User).googleId);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findOne({ where: { googleId: id as string } });
    done(null, user);
  } catch (err) {
    done(err);
  }
});

export default passport;
