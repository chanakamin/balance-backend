import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { AuthService } from '../services/authService';
import { ExpressUser, User } from '../types';

// Configure Passport Local Strategy
passport.use(
  new LocalStrategy(
    {
      usernameField: 'username',
      passwordField: 'password',
    },
    async (username, password, done) => {
      try {
        const user = await AuthService.authenticate({ username, password });

        if (!user) {
          return done(null, false, { message: 'Invalid username or password' });
        }

        return done(null, {
          id: user.id,
          username: user.username,
        });
      } catch (err) {
        return done(err);
      }
    }
  )
);

// Serialize user for session
passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

// Deserialize user from session
passport.deserializeUser(async (id: any, done) => {
  try {
    const user = await AuthService.getUserById(id);

    if (!user) {
      return done(null, false);
    }

    done(null, {
      id: user.id,
      username: user.username,
    });
  } catch (err) {
    done(err);
  }
});

export default passport;
