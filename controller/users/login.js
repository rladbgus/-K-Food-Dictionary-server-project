const { User } = require('../../models');
const dotenv = require('dotenv');
const crypto = require('crypto');

dotenv.config();

module.exports = {
    post: async (req, res) => {
        console.log(req.body)
        User.findOne({
            where: {
                email: req.body.email,
                password: crypto.createHash('sha256').update(req.body.password).digest('hex')
            }
        })
            .then(data => {
                if (!data) {
                    console.log('if문안')

                    res.status(404).send('unvalid user')
                } else {
                    console.log('else문')
                    req.session.userid = data.email
                    res.status(200).send({
                        id: data.id,
                        username: data.username
                    })
                }
            })
            .catch(error => {
                res.status(500).send(error);
            })
    }
};