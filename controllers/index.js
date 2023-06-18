const router = require('express').Router();
const apiRoutes = require('./api');
const homeRoutes = require('./home-routes');
const restaurantRoutes = require('./api/restaurant-routes');
const userRoutes = require('./api/user-routes');
const dashboardRoutes = require('./dashboard-routes');
// const signupController = require('../controllers/signupController');
// //const loginRoutes = require('./api/login-routes');
// const loginController = require('../controllers/loginController');

router.use('/api', apiRoutes);
router.use('/restaurant', restaurantRoutes);
router.use('/user', userRoutes);
router.use('/', homeRoutes);
router.use('/dashboard', dashboardRoutes);
// router.post('/signup', signupController.signup);
// router.post('/login', loginController.login);

module.exports = router;
