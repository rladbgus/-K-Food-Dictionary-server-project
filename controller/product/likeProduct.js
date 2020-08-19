const { User, FoodInfo } = require('../../models');
const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  // 페이지 업로드 요청시 데이터 추가하는 로직 테스트가 필요합니다.
  // 클라이언트에서 찜버튼을 클릭했을때 해당음식에 대해서 사용자와 음식정보를 저장해야합니다.
  post: async (req, res) => {
    try {
      // session에서 해당사용자 불러오기 // 이메일로 세션에 저장됨
      // const { userid } = req.session;
      const { productId } = req.params;

      // 데이터베이스에서 클라이언트에서 받은 데이터 찾기
      // 해당 user찾기
      console.log(req.body.email, productId)
      const oneUser = await User.findOne({
        where: { email: req.body.email }
      });

      // req.parmas로 받은데이터를 가지고 데이터베이스에서 찾기
      const foodData = await FoodInfo.findOne({
        where: { foodname: productId }
      });

      await foodData.addInfos(oneUser.dataValues.id);
      return res.status(201).json({ success: true })
      // FoodInfo.findOne({
      //   where: { id: 2 }
      // })
      //   .then((res) => {
      //     console.dir(res);
      //     res.addInfos(2);
      //   })
      // console.log(info)
      // if (!info) {
      //   return res.status(403).send('해당음식이 없습니다.');
      // } else {
      //   // 해당사용자와 음식테이블 관계설정해서 넣기
      //   console.log(info)
      //   await info.addImages(2);
      // }
    } catch (e) {
      console.error(e);
      return res.status(500).send('server error');
    }
  }
}