const { FoodInfo } = require('../../models');
const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  // 페이지 업로드 요청시 데이터 추가하는 로직 테스트가 필요합니다.
  // 대분류
  get: async (req, res) => {
    let sumFoodData = []
    try {
      const { productId } = req.params;
      console.log(productId);
      const foodData = await FoodInfo.findAll({
        where: { sort: productId }
      });
      // 모든 데이터 합친 후 클라이언트에 넘겨주기
      foodData.forEach((e) => {
        e.image = e.image.split(',');
        sumFoodData.push({id: e.id, foodname: e.foodname, sort: e.sort, spicy: e.spicy, tip: e.tip, image: e.image, foodInfo: e.foodInfo });
      });
      
      return res.status(200).json({success: true, data: sumFoodData});

    } catch (e) {
      console.error(e);
      return res.status(404).json({ success: false });
    }
  }
}