const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// create our Restaurant model
class Restaurant extends Model {}
//   static upvote(body, models) {
//     return models.Vote.create({
//       user_id: body.user_id,
//       Restaurant_id: body.Restaurant_id
//     }).then(() => {
//       return Restaurant.findOne({
//         where: {
//           id: body.Restaurant_id
//         },
//         attributes: [
//           'id',
//           'Restaurant_url',
//           'title',
//           'created_at',
//           [
//             sequelize.literal('(SELECT COUNT(*) FROM vote WHERE Restaurant.id = vote.Restaurant_id)'),
//             'vote_count'
//           ]
//         ]
//       });
//     });
//   }
// }

// create fields/columns for Restaurant model
Restaurant.init(
    {
      id: {
        type: DataTypes.INTEGER,
      //  allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING,
       // allowNull: false
      },
      description: {
        type: DataTypes.STRING,
       /// allowNull: false
      },
      address: {
        type: DataTypes.STRING,
        //allowNull: false
      },
      restaurant_url: {
        type: DataTypes.STRING,
      //  allowNull: false,
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