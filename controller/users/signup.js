const { User } = require('../../models');
const dotenv = require('dotenv');
const crypto = require('crypto');

dotenv.config();

module.exports = {
    post: async (req, res) => {
        User.findOrCreate({
            where: {
                email: req.body.email,
                username: req.body.username,
                password: crypto.createHash('sha256').update(req.body.password).digest('hex'),
            }
        })
            .then(([result, created]) => {
                if (created) {
                    res.status(200).send({
                        id: result.id,
                        username: result.username,
                        createdAt: result.createdAt
                    });
                } else {
                    res.status(409).send('Already signed up');
                }
            })
            .catch(error => {
                console.log(error);
                res.status(500).send(error);
            })
    }
}