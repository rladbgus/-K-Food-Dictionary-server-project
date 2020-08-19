const DataTypes = require('sequelize');
const { Model } = DataTypes;

module.exports = class User extends Model {
  static init(sequelize) {
    return super.init({
      // id가 기본적으로 들어있다.
      username:{
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      nickname: {
        type: DataTypes.STRING(30),
      },
      email: {
        type: DataTypes.STRING(60), //
        allowNull: false, // 필수
        unique: true, // 고유한 값
      },
      password: {
        type: DataTypes.STRING(200),
      },
      avatar: {
        type: DataTypes.TEXT,
      },
      snsId: {
        type: DataTypes.STRING(60)
      },
      provider: {
        type: DataTypes.STRING(60)
      }
    }, 
   
    {
      modelName: 'User',
      tableName: 'users',
      charset: 'utf8',
      collate: 'utf8_general_ci', // 한글 저장
      sequelize,
    });
  }
  static associate(db) {
    db.User.belongsToMany(db.FoodInfo, {through: 'Like', as:"Liked", onDelete: 'cascade'});
  }
};