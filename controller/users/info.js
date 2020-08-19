const { User, FoodInfo } = require('../../models');
const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  get: (req, res) => {
    console.log(req.session, '------------------');
    try {
      if (req.session.userid) {
        User.findOne({
          where: {
            email: req.session.userid
          },
          include: [{
            model: FoodInfo,
            attributes: ['id', 'foodname', 'spicy', 'tip', 'image', 'foodInfo'],
            as: "Liked",
          }],

        })
          .then(result => {
            let arr = [];

            result.Liked.forEach((v, i) => {
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
              arr.push(obj);
            });
            return res.status(200).send(arr);
          })
      } else {
        return res.status(401).send('need user session');
      }
    } catch (e) {
      console.error(e);
      return res.status(500).send('server error');
    }
  }
};