const router = require('express').Router();
const { User, Restaurant } = require('../models');
const { postData, restaurantData, user } = require('./api/restaurant-routes');
// const withAuth = require('../utils/auth');

const getUserData = async (userId) => {
  // Fetch user data from the database
  // ...

  return {
    posts: postData,
    restaurants: restaurantData,
    user: user
  };
};

router.get('/', async (req, res) => {
  try {
    const userId = req.session.user_id;
    const userData = await getUserData(userId);

    res.render('dashboard', {
      layout: 'main', // Use the 'main.handlebars' layout
      ...userData,
      loggedIn: true,
      user: userData.user
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Render other dashboard routes
router.get('/login', (req, res) => {
  res.render('login');
});

router.get('/signup', (req, res) => {
  res.render('signup');
});

module.exports = router;
