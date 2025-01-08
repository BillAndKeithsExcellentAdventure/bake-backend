import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import config from './config.js';
import User from './models/user.js';

export const configurePassport = () => {
  // Configure Google OAuth2 strategy
  passport.use(
    new GoogleStrategy(
      {
        clientID: config.googleClientID,
        clientSecret: config.googleClientSecret,
        callbackURL: config.callbackURL,
      },
      async (accessToken, refreshToken, profile, done) => {
        const defaultUser = {
          fullName: profile.displayName,
          email: profile.emails[0].value,
          picture: profile.photos[0].value,
          googleId: profile.id,
        };

        const user = await User.findOrCreate({
          where: { googleId: profile.id },
          defaults: defaultUser,
        }).catch((err) => {
          console.log('Error signing up', err);
          done(err, null);
        });

        if (user && user[0]) return done(null, user && user[0]);
      }
    )
  );

  // Serialize user info into the session
  passport.serializeUser((user, done) => {
    done(null, user);
  });

  // Deserialize user info from the session
  passport.deserializeUser(async (user, done) => {
    const outUser = await User.findOne({ where: { id: user.id } }).catch(
      (err) => {
        console.log('Error deserializing', err);
        done(err, null);
      }
    );

    done(null, outUser);
  });
};
