const router = require('express').Router();

const userRoutes = require('../api/user-routes');
const restaurantRoutes = require('../api/restaurant-routes');
const signupController = require('../api/user-routes');
const dashboardRoutes = require('../dashboard-routes');
//const loginRoutes = require('./api/login-routes');
const homeRoutes = require('../home-routes');
//const signupController = require('../../controllers/api/signup');


router.use('/users', userRoutes);
router.use('/restaurants', restaurantRoutes);
router.use('/signup', signupController);
router.use('/dashboard', dashboardRoutes);
//router.use('/login', loginRoutes);
router.use('/', homeRoutes);




router.use((req, res) => {
    res.status(404).end();
});

module.exports = router;

