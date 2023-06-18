const router = require('express').Router();
const { User, Restaurant } = require('../models');
const withAuth = require('../utils/auth');


const getUserData = async (userId) => {
  const user = await User.findOne({
    where: {
      id: userId
    },
    attributes: ['username', 'email', 'hospitalityExperience']
  });

  const posts = await Post.findAll({
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
  });

  // const ratings = await Rating.findAll({
  //   where: {
  //     user_id: userId
  //   },
  //   attributes: ['id', 'title', 'content', 'created_at'],
  //   include: [
  //     {
  //       model: User,
  //       attributes: ['username']
  //     }
  //   ]
  // });

  const restaurants = await Restaurant.findAll({
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
  });

  //const postData = posts.map((post) => post.get({ plain: true }));
  //const ratingData = ratings.map((rating) => rating.get({ plain: true }));
  const restaurantData = restaurants.map((restaurant) => restaurant.get({ plain: true }));

  return {
   // posts: postData,
    //ratings: ratingData,
    restaurants: restaurantData,
    user: user
  };
};

router.get('/dashboard', withAuth, async (req, res) => {
  try {
    const userId = req.session.user_id;
    const userData = await getUserData(userId);

    // Fetch the user data from the database
    const user = await User.findOne({
      where: {
        id: userId
      },
      attributes: ['username', 'email', 'hospitalityExperience']
    });

    res.render('dashboard', {
      ...userData,
      loggedIn: true,
      user: user // Pass the user data to the template
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// // Render user's reviews
// router.get('/reviews', withAuth, async (req, res) => {
//   try {
//     const userId = req.session.user_id;
//     const userData = await getUserData(userId);

//     // Additional logic specific to the 'reviews' route

//     res.render('reviews', {
//       ...userData,
//       loggedIn: true
//     });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json(err);
//   }
// });


// Render other dashboard routes
router.get('/login', (req, res) => {
  res.render('login');
});

router.get('/signup', (req, res) => {
  res.render('signup');
});

module.exports = router;
