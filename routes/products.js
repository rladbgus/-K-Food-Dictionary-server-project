const express = require('express');
const router = express.Router();
const { productController } = require('../controller');
console.log(productController,'1123123131313');

router.post('/',productController.store.post);
router.post('/sort/:productId', productController.sendFoodInfo.get)
router.post('/saveImage', productController.saveImage.post); // upload multer 사진미리받아와서 정리한부분
router.post('/upload', productController.upload.post) // 클라이언트에서 음식업로드 시 데이터베이스에 저장
router.post('/like/:productId',productController.likeProduct.post) // 음식찜요청
module.exports = router;