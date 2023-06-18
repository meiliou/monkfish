const router = require('express').Router();

const userRoutes = require('./user-routes');
const restaurantRoutes = require('./restaurant-routes');
const ratingRoutes = require('./rating-routes');

router.use('/users', userRoutes);
router.use('/restaurants', restaurantRoutes);
router.use('/ratings', ratingRoutes);

module.exports = router;