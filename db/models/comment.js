const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, BikeTrack }) {
      this.belongsTo(User, { foreignKey: 'userId' });
      this.hasMany(BikeTrack, { foreignKey: 'biketrackId' });
    }
  }
  Comment.init({
    biketrackId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    text: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Comment',
    timestamps: false,
  });
  return Comment;
};
