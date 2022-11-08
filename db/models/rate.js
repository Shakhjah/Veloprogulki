'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Rate extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, BikeTrack }) {
      this.hasMany(User, { foreignKey: 'userId' }),
        this.hasMany(BikeTrack, { foreignKey: 'trackId' })
    }
  }
  Rate.init({
    rate: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    trackId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Rate',
    timestamps: false,
  });
  return Rate;
};