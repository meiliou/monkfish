const router = require('express').Router();

const userRoutes = require('./user-routes');
const restaurantRoutes = require('./restaurant-routes');
//const signupController = require('../../controllers/api/signup');


router.use('/users', userRoutes);
router.use('/restaurants', restaurantRoutes);
//router.post('/api/signup', signupController);




router.use((req, res) => {
    res.status(404).end();
});

module.exports = router;

