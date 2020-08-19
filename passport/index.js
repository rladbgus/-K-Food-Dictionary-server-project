const passport = require('passport');
const kakao = require('./kakao');
const { User } = require('../models');

module.exports = () => {
  passport.serializeUser((user, done) => { // 서버쪽에 [{ id: 1, cookie: 'clhxy' }]
    done(null, user.id);
    console.log('시리얼라이즈11')
  });

  passport.deserializeUser(async (id, done) => {
    try {
      console.log('시리얼라이즈22')
      const user = await User.findOne({ where: { id }});
      done(null, user); // req.user
    } catch (error) {
      console.error(error);
      done(error);
    }
  });

  kakao();
};
