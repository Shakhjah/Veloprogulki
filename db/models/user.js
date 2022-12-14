const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Rate, BikeTrack, Comment }) {
      this.hasMany(Rate, { foreignKey: 'userId' });
      this.hasMany(BikeTrack, { foreignKey: 'userId' });
      this.hasMany(Comment, { foreignKey: 'userId' });
    }
  }
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'User',
    timestamps: false,
  });
  return User;
};
