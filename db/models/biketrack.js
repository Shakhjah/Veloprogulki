const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class BikeTrack extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Rate, Comment, User }) {
      this.hasMany(Comment, { foreignKey: 'biketrackId' });
      this.hasMany(Rate, { foreignKey: 'trackId' });
      this.belongsTo(User, { foreignKey: 'userId' });
    }
  }
  BikeTrack.init({
    title: DataTypes.STRING,
    city: DataTypes.STRING,
    lengthroad: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    map: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'BikeTrack',
    timestamps: false,
  });
  return BikeTrack;
};
