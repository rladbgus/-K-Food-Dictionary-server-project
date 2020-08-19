const { FoodInfo } = require('../../models');
const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  // 페이지 업로드 요청시 데이터 추가하는 로직 테스트가 필요합니다.
  
  post: async (req, res) => {
    try {
      const { foodName, foodInfo, tip, spicy, sort} = req.body;
      let { image } = req.body;

      image = image.join(',') // 배열로 요청이오므로 문자열로 변환 후 저장
      console.log(req.body);
      const data = await FoodInfo.create({
        foodname: foodName,
        sort: sort,
        spicy: spicy,
        tip: tip,
        image: image,
        foodInfo:foodInfo,
      });
      return res.status(201).json({id: data.id, success: true });
    } catch (e) {
      console.log(e);
      return res.status(404).json({ success: false });
    }
  }
}