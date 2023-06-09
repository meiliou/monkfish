const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// create our Restaurant model
class Restaurant extends Model {
  static gotRated(body, models) {
    return models.Rating.create({
      // user_id: body.user_id,  // add back later
      restaurant_id: body.restaurant_id
    }).then(() => {
      return Restaurant.findOne({
        where: {
          id: body.restaurant_id
        },
        attributes: [
          'id',
          'name',
          'description',
          'address',
          'restaurant_url',
          'created_at',
          [
            sequelize.literal('(SELECT COUNT(*) FROM rating WHERE restaurant.id = rating.restaurant_id)'),
            'rating_count'
          ]
        ]
      });
    });
  }
}

// create fields/columns for Restaurant model
Restaurant.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false
      },
      restaurant_url: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isURL: true
        }
      }
    },
    {
      sequelize,
      freezeTableName: true,
      underscored: true,
      modelName: 'restaurant'
    }
);


module.exports = Restaurant;