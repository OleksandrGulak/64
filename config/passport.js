import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcrypt';
import users from '../models/user.js';

export default function configurePassport(passport) {
  passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
    const user = users.find(u => u.email === email);
    if (!user) return done(null, false, { message: 'Користувача не знайдено' });

    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) return done(err);
      if (!isMatch) return done(null, false, { message: 'Невірний пароль' });
      return done(null, user);
    });
  }));

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    const user = users.find(u => u.id === id);
    done(null, user);
  });
}