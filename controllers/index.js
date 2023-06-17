const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./home-routes')
const restaurantRoutes = require('./api/restaurant-routes');
const userRoutes = require('./api/user-routes');
const dashboardRoutes = require('./dashboard-routes')
//const signupController = require('./api/signup')
//const ratingRoutes = require('./rating-routes.js');

router.use('/api', apiRoutes);
router.use('/restaurant', restaurantRoutes);
router.use('/user', userRoutes);
router.use('/', homeRoutes)
router.use('/dashboard', dashboardRoutes)
//router.post('/api/signup', signupController.signup);


//router.use('/rating', ratingRoutes);

router.use((req, res) => {
  res.status(404).end();
});


module.exports = router;