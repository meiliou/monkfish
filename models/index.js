const User = require('./User');
const Restaurant = require('./Restaurant');
const Rating = require('./Rating');

// create associations
// User.hasMany(Restaurant, {
//     foreignKey: 'user_id'
// });

// We also need to make the reverse association
// Restaurant.hasMany(User, {
//     foreignKey: 'user_id',
// });

User.belongsToMany(Restaurant, {
    through: Rating,
    as: 'rated_restaurants',
    foreignKey: 'user_id'
});

Restaurant.belongsToMany(User, {
    through: Rating,
    as: 'rated_restaurants',
    foreignKey: 'restaurant_id'
});

Rating.belongsTo(User, {
  foreignKey: 'user_id'
});

Rating.belongsTo(Restaurant, {
  foreignKey: 'restaurant_id'
});

Restaurant.hasMany(Rating, {
  foreignKey: 'restaurant_id'
});

module.exports = { Restaurant, Rating, User }; //add Role
