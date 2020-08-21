const { FoodInfo } = require('../../models');
const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  // 페이지 업로드 요청시 데이터 추가하는 로직 테스트가 필요합니다.
  
  get: async (req, res) => {
    try {
      const allFoodInfo = await FoodInfo.findAll({
        attributes: ['id', 'foodname', 'spicy', 'tip', 'image', 'foodInfo']
      });
      let sumFoodData = allFoodInfo.map((v) => {
        return v.dataValues;
      });
      res.status(200).json(sumFoodData);
    } catch (e) {
      console.error(e);
      res.status(404).send('저장하지 못했습니다.');
    }
  }
}