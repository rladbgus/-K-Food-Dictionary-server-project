const { User } = require('../../models');
const dotenv = require('dotenv');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
dotenv.config();

module.exports = {
    post: async (req, res) => {
        console.log('여기');
        const { email, password } = req.body;

        // jwt 발급
        let token = jwt.sign({
            // email : email = email => 키와벨류값이 같으면 email로 생략가능 ES6문법
            email
        }, 'qlalfdldi', {
            expiresIn: '20m'
        });

        const oneUser = await User.findOne({
            where: {
                email,
                password: crypto.createHash('sha256').update(password).digest('hex')
            }
        });
        if (!oneUser) {
            console.log('여기');
            return res.status(404).send('unvaild user');
        } else {
            return res.status(200).json({ success: true, token })
        }

    }
};

// User.findOne({
//   where: {
//       email: req.body.email,
//       password: crypto.createHash('sha256').update(req.body.password).digest('hex')
//   }
// })
//   .then(data => {
//       if (!data) {
//           res.status(404).send('unvalid user')
//       } else {
//           req.session.userid = data.email
//           res.cookie('user','김현진');
//           res.status(200).send({
//               id: data.id,
//               username: data.username
//           })
//       }
//   })
//   .catch(error => {
//       res.status(500).send(error);
//   })