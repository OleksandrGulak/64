import express from 'express';
import session from 'express-session';
import passport from 'passport';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import configurePassport from './config/passport.js';

dotenv.config();
const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: false }));
app.use(session({
  secret: process.env.SESSION_SECRET || 'secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: false, // true у production з HTTPS
    maxAge: 3600000
  }
}));

app.use(passport.initialize());
app.use(passport.session());
configurePassport(passport);

app.use('/', (await import('./routes/auth.js')).default);
app.use('/protected', (await import('./routes/protected.js')).default);

export default app;