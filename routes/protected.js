import express from 'express';

const router = express.Router();

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect('/login');
}

router.get('/', ensureAuthenticated, (req, res) => {
  res.send(`Привіт, ${req.user.email}. Це захищена сторінка.`);
});

export default router;