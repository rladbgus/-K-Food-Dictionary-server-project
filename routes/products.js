const express = require('express');
const router = express.Router();
const { productController } = require('../controller');
console.log(productController,'1123123131313');


router.post('/',productController.store.post); // 
router.get('/sort/:productId', productController.sendFoodInfo.get) // 대분류에 해당하는 모든소분류데이터 처리하는 라우터
router.post('/saveImage', productController.saveImage.post); // upload multer 사진미리받아와서 정리한부분
router.post('/upload', productController.upload.post) // 클라이언트에서 음식업로드 시 데이터베이스에 저장
router.get('/like/:productId',productController.likeProduct.post) // 음식찜요청
router.get('/foodinfo', productController.allFoodInfo.get) // 모든 음식정보 불러오기
router.post('/likefood/delete', productController.likeFoodDelete.post) // 좋아요 음식 지우기
module.exports = router;

