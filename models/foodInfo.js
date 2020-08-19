const DataTypes = require('sequelize');
const { Model } = DataTypes;

module.exports = class FoodInfo extends Model {
  // static init(sequelize) {
  //   // return super.init({
  //   //   // id가 기본적으로 들어있다.
  //   //   content: {
  //   //     type: DataTypes.TEXT,
  //   //     allowNull: false,
  //   //   },
  //   //   // RetweetId
  //   // }, {
  //   //   modelName: 'Foodna',
  //   //   tableName: 'posts',
  //   //   charset: 'utf8mb4',
  //   //   collate: 'utf8mb4_general_ci', // 이모티콘 저장
  //   //   sequelize,
  //   // });
  // }

  static init(sequelize) {
    return super.init({
      // id가 기본적으로 들어있다.
      foodname: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      sort: {
        // 대분류
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      like: {
        // 찜하기
        type: DataTypes.BOOLEAN
      },
      spicy: {
        //매움정도 
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      tip: {
        // 꿑팁들 내용
        type: DataTypes.TEXT,
        allowNull: false,
      },
      image: {
        // 음식 사진 이미지
        type: DataTypes.TEXT,
        allowNull: false,
      },
      foodInfo: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      video: {
        // 음식 먹방영상 
        // 일단 추가
        type: DataTypes.TEXT,
      },
      foodStore: {
        // 주변음식가게  정보
        type: DataTypes.TEXT,
      }
    }, {
      modelName: 'FoodInfo',
      tableName: 'food_info',
      charset: 'utf8',
      collate: 'utf8_general_ci', // 한글 저장
      sequelize,
    });
  }
  static associate(db) {
    db.FoodInfo.belongsToMany(db.User, { through: 'Like', as: 'Infos' })
  }

};

// const DataTypes = require('sequelize');
// const { Model } = DataTypes;

// module.exports = class Post extends Model {
//   static init(sequelize) {
//     return super.init({
//       // id가 기본적으로 들어있다.
//       content: {
//         type: DataTypes.TEXT,
//         allowNull: false,
//       },
//       // RetweetId
//     }, {
//       modelName: 'Post',
//       tableName: 'posts',
//       charset: 'utf8mb4',
//       collate: 'utf8mb4_general_ci', // 이모티콘 저장
//       sequelize,
//     });
//   }
//   static associate(db) {
//     db.Post.belongsToMany(db.User, { through: 'Like', as: 'Likers',onDelete: 'cascade' }) // post.addLikers, post.removeLikers
//   }
// };
