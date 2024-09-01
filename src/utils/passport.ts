import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from '../config/env';

import User from '../models/user.model';
import { createOrUpdateUser } from '../services/auth.service';
import { withTransaction } from './with-transaction.util';

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID!,
      clientSecret: GOOGLE_CLIENT_SECRET!,
      callbackURL: '/auth/callback',
    },
    async (_, __, profile, done) => {
      try {
        return done(
          null,
          await withTransaction(async (tx) =>
            createOrUpdateUser(
              {
                googleId: profile.id,
                email: profile.emails![0].value,
                name: profile.displayName,
              },
              tx,
            ),
          ),
        );
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
