const { User } = require('../../models');
const dotenv = require('dotenv');
// const crypto = require('crypto');

dotenv.config();

module.exports = {
    post: async (req, res) => {
        User.findOne({
            where: {
                email: req.body.email,
                password: req.body.password
            }
        })
            .then(data => {
                if (!data) {
                    res.status(404).send('unvalid user')
                } else {
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