const multer = require('multer');
const dotenv = require('dotenv');
const path = require('path');
const multerS3 = require('multer-s3');
const AWS = require('aws-sdk');
dotenv.config();

AWS.config.update({
  accessKeyId: process.env.S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  region: 'ap-northeast-2'
})


const upload = multer({
  storage: multerS3({
    s3: new AWS.S3(),
    bucket: 'k-food-images',
    key(req, file, cb) {
      cb(null, `original/${Date.now()}_${path.basename(file.originalname)}`);
    }
  })
}).single("file");

module.exports = {
  // 페이지 업로드 요청시 데이터 추가하는 로직 테스트가 필요합니다.

  post: async (req, res) => {
    try {
      upload(req, res, err => {
        if (err) {
          return res.json({ success: false, err })
        } else {
          return res.json({ success: true, filePath: res.req.file.path, fileName: req.file.location })
        }
      })
    } catch (e) {
      console.error(e);
      res.status(404).send('저장하지 못했습니다.');
    }

  }
}

// 서버에 이미지 저장방법
// var storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/')
//   },
//   filename: function (req, file, cb) {
//     const ext = path.extname(file.originalname) // 확장자 
//     const basename = path.basename(file.originalname, ext)
//     cb(null, `${basename} ${new Date().getTime()}${ext}`) // 파일명
//   }
// })


// var upload = multer({ storage: storage }).single("file")