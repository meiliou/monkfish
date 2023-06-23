const router = require('express').Router();
const apiRoutes = require('./api');
const homeRoutes = require('./home-routes');
const restaurantRoutes = require('./api/restaurant-routes');
const userRoutes = require('./api/user-routes');
const dashboardRoutes = require('./dashboard-routes');
const signupController = require('./signupController');

router.use('/api', apiRoutes);
router.use('/restaurant', restaurantRoutes);
router.use('/user', userRoutes);
router.use('/', homeRoutes);
router.use('/dashboard', dashboardRoutes);

// Use the signupController.signup function as middleware
router.post('/signup', signupController.signup);

module.exports = router;
