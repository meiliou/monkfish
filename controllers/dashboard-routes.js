const router = require('express').Router();
const { Restaurant, User } = require('../models');
const withAuth = require('../utils/auth');
const { Post } = require('../models');

// Reusable function to fetch posts, reviews, and restaurants
const getUserData = async (userId) => {
  const [posts, reviews, restaurants] = await Promise.all([
    Post.findAll({
      where: {
        user_id: userId
      },
      attributes: ['id', 'title', 'content', 'created_at'],
      include: [
        {
          model: User,
          attributes: ['username']
        }
      ]
    }),
    Post.findAll({
      where: {
        user_id: userId
      },
      attributes: ['id', 'title', 'content', 'created_at'],
      include: [
        {
          model: User,
          attributes: ['username']
        }
      ]
    }),
    Restaurant.findAll({
      where: {
        user_id: userId
      },
      attributes: ['id', 'name', 'address', 'description'],
      include: [
        {
          model: User,
          attributes: ['username']
        }
      ]
    })
  ]);

  const postData = posts.map((post) => post.get({ plain: true }));
  const reviewData = reviews.map((review) => review.get({ plain: true }));
  const restaurantData = restaurants.map((restaurant) =>
    restaurant.get({ plain: true })
  );

  return {
    posts: postData,
    reviews: reviewData,
    restaurants: restaurantData
  };
};

// Render dashboard page
router.get('/', withAuth, async (req, res) => {
  try {
    const userId = req.session.user_id;
    const userData = await getUserData(userId);

    res.render('dashboard', {
      ...userData,
      loggedIn: true
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Render user can see all of their ratings
router.get('/ratings', withAuth, async (req, res) => {
  try {
    const userId = req.session.user_id;
    const userData = await getUserData(userId);

    // Additional logic specific to the 'ratings' route

    res.render('ratings', {
      ...userData,
      loggedIn: true
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Render user can see all of their reviews
router.get('/reviews', withAuth, async (req, res) => {
  try {
    const userId = req.session.user_id;
    const userData = await getUserData(userId);

    // Additional logic specific to the 'reviews' route

    res.render('reviews', {
      ...userData,
      loggedIn: true
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Render user can edit their reviews
router.get('/reviews/:id', withAuth, async (req, res) => {
  try {
    const userId = req.session.user_id;
    const userData = await getUserData(userId);

    // Additional logic specific to the 'reviews/:id' route

    res.render('editReview', {
      ...userData,
      loggedIn: true
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

router.get('/restaurant', (req, res) => {
  res.render('restaurant');
});

router.get('/restaurant/:id/review', (req, res) => {
  res.render('review');
});

router.get('/restaurant/:id/review/:id', (req, res) => {
  res.render('review');
});



module.exports = router;
