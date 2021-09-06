import express from "express";
import passport from "passport";
const router = express.Router()


router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', 
  passport.authenticate('google',  { successRedirect : '/auth/login', failureRedirect: '/auth/login' }),
  function(req, res) {
    res.redirect('/auth/login');
  }
);

export default router