const User = require('./User');
const Restaurant = require('./Restaurant');
const Rating = require('./Rating');

// create associations
User.hasMany(Post, {
    foreignKey: 'user_id'
});

// We also need to make the reverse association
// Restaurant can belong to one user, but not many users
Restaurant.belongsTo(User, {
    foreignKey: 'user_id',
});

User.belongsToMany(Restaurant, {
    through: Rating,
    as: 'rated_restaurants',
    foreignKey: 'user_id'
});

Restaurant.belongsToMany(User, {
    through: Rating,
    as: 'rated_restaurants',
    foreignKey: 'post_id'
});

Rating.belongsTo(User, {
  foreignKey: 'user_id'
});

Rating.belongsTo(Restaurant, {
  foreignKey: 'restaurant_id'
});

User.hasMany(Rating, {
  foreignKey: 'user_id'
});

Restaurant.hasMany(Rating, {
  foreignKey: 'restaurant_id'
});

module.exports = { Restaurant, Rating, User}; //add User, Role