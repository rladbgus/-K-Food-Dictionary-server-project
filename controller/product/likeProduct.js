const { User, FoodInfo } = require('../../models');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
dotenv.config();

module.exports = {
  // 페이지 업로드 요청시 데이터 추가하는 로직 테스트가 필요합니다.
  // 클라이언트에서 찜버튼을 클릭했을때 해당음식에 대해서 사용자와 음식정보를 저장해야합니다.
  post: async (req, res) => {
    try {
      // session에서 해당사용자 불러오기 // 이메일로 세션에 저장됨
<<<<<<< HEAD
      // const { userid } = req.session;
      const { productId } = req.params;

      // 데이터베이스에서 클라이언트에서 받은 데이터 찾기
      // 해당 user찾기
      console.log(req.body.email, productId)
      const oneUser = await User.findOne({
        where: { email: req.body.email }
=======
      let token = req.headers.authorization;
      let email;
      const { productId } = req.params;
      if (token.length < 35) {
        email = req.headers.authorization
      } else {
        email = jwt.verify(token, process.env.JWT_SECRET); // {email: wmc15156@naver.com};
        email = email.email;
      }
      // 데이터베이스에서 클라이언트에서 받은 데이터 찾기
      // 해당 user찾기
      console.log('=========', email, productId,'------------');
      const oneUser = await User.findOne({
        where: {email : email}
>>>>>>> 90cea4275b74f1e599549535214e91547528f178
      });

      // req.parmas로 받은데이터를 가지고 데이터베이스에서 찾기
      const foodData = await FoodInfo.findOne({
        where: { foodname: productId }
      });
      console.log(foodData, 'foodData')
      await foodData.addInfos(oneUser.dataValues.id);
      return res.status(201).json({ success: true })
    } catch (e) {
      console.error(e);
      return res.status(500).send('server error');
    }
  }
}