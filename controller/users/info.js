const { User } = require('../../models');
const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  get: (req, res) => {
    if (req.session.userid) {
      User.findOne({
        where: {
          email: req.session.userid
        }
      })
        .then(result => {
          console.log(result);
          res.status(200).send({
            username: result.username,
            email: result.email
          });
        })
    } else {
      res.status(401).send('need user session');
    }
  }
};