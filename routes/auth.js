import express from 'express';
import passport from 'passport';
import { createUser } from '../models/user.js';

const router = express.Router();

router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/protected',
  failureRedirect: '/login'
}));

router.post('/register', async (req, res) => {
  const { email, password } = req.body;
  await createUser(email, password);
  res.redirect('/login');
});

router.get('/logout', (req, res) => {
  req.logout(err => {
    if (err) return res.status(500).send('Помилка при виході');
    res.redirect('/login');
  });
});

export default router;