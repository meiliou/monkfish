const router = require('express').Router();

const userRoutes = require('./user-routes');
const restaurantRoutes = require('./restaurant-routes');
const signupController = require('../../controllers/signupController');
const dashboardRoutes = require('../dashboard-routes');
const homeRoutes = require('../home-routes');

router.use('/users', userRoutes);
router.use('/restaurants', restaurantRoutes);
router.post('/signup', signupController.signup); // Use signupController.signup as middleware
router.use('/dashboard', dashboardRoutes);
router.use('/', homeRoutes);

router.use((req, res) => {
  res.status(404).end();
});

module.exports = router;
