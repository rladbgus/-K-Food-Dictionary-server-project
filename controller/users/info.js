const { User, FoodInfo } = require('../../models');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

dotenv.config();

module.exports = {
  get: (req, res) => {
<<<<<<< HEAD
<<<<<<< HEAD
    console.log(req.session, '------------------');
=======
    console.log(req.headers.authorization,'여기')
    
>>>>>>> 4513762663f0a0fc1a291831dcdce87620daa582
=======
    let email;
>>>>>>> 90cea4275b74f1e599549535214e91547528f178
    try {
      let token = req.headers.authorization; // 토큰
      if (token.length < 35) {
        email = req.headers.authorization
      } else {
        email = jwt.verify(token, process.env.JWT_SECRET); // {email: wmc15156@naver.com};
        email = email.email;
      }
      if (email) {
        User.findOne({
          where: {
            email
          },
          include: [{
            model: FoodInfo,
            attributes: ['id', 'foodname', 'spicy', 'tip', 'image', 'foodInfo'],
            as: "Liked",
          }],
        })
          .then(result => {
            console.log(result, 'then문');
            let arr = [];

            result.Liked.forEach((v, i) => {
<<<<<<< HEAD
=======
              console.log('=========',v.dataValues,'-==-=-=-=-=-=--==-');
>>>>>>> 90cea4275b74f1e599549535214e91547528f178
              const obj = {};
              if (i === 0) {
                const userInfo = {};
                userInfo.username = result.dataValues.username;
                userInfo.email = result.dataValues.email;
                arr.push(userInfo);
              }
              obj.id = v.dataValues.id;
              obj.foodname = v.dataValues.foodname;
              obj.spicy = v.dataValues.spicy;
              obj.image = v.dataValues.image;
              obj.foodInfo = v.dataValues.foodInfo
              obj.sort =v.dataValues.sort
              arr.push(obj);
            });
            console.log(arr, '--------------');
            if (arr.length === 0) {
              const { username, email } = result
              return res.status(200).send({ success: true, username: username, email: email })
            } else {
              return res.status(200).send(arr);
            }
          })
      } else {
        return res.status(401).send('need user session');
      }
    } catch (e) {
      console.error(e);
      if (e.name === 'TokenExpiredError') {
        return res.status(419).json({
          code: 419,
          message: '토큰이 만료되었습니다.'
        })
      }
      return res.status(401).send('유효하지 않는 사용자입니다.');
    }
  }
};