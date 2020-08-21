const { FoodInfo, User } = require('../../models');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
dotenv.config();

module.exports = {
  // 페이지 업로드 요청시 데이터 추가하는 로직 테스트가 필요합니다.

  post: async (req, res) => {
    let email;
    console.log('req');
    console.log(req.body,req.headers,'-------------');
    const { foodName } = req.body;
    try {
      let token = req.headers.authorization; // 토큰
      if (token.length < 35) {
        email = req.headers.authorization
      } else {
        email = jwt.verify(token, process.env.JWT_SECRET); // {email: wmc15156@naver.com};
        email = email.email;
      }
      const oneUser = await User.findOne({
        where: {email}
      });
      console.log('user', oneUser);
      const foodData = await FoodInfo.findOne({
        where: {foodname: foodName}
      });
      await foodData.removeInfos(oneUser.dataValues.id);
      res.status(200).json( { success: true });
    } catch (e) {
      console.log(e);
      res.status(403).send({ success: false })
    }
  }
}