// // const session = require('express-session');
// const { User } = require('../models'); //table이름 User맞나용
// const dotenv = require('dotenv');

// dotenv.config();

// module.exports = {
//     post: async (req, res) => {
//         User.findOne({
//             where: {
//                 email: req.body.email,
//                 password: req.body.password
//             }
//         })
//             .then( data => {
//                 console.log(data)
//             })
//             .catch(error => {
//                 res.status(400).end(error);
//             })
//     }
// };