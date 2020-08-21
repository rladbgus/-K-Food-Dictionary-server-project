const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/google',
  passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login', 'email'], prompt: 'select_account' }));

router.get('/google/callback', (req, res, next) => {
  passport.authenticate('google', (authError, user,) => {
    
    req.session.userid = user.dataValues.email
    res.cookie('user', user.dataValues.username);
    res.redirect(`http://localhost:3000?data=${user.dataValues.email}`);
    req.login(user,(err) => {
      if(err) {
        res.status(404).send('구글로그인 에러');
      }
    })
  })(req, res, next)
})

module.exports = router;