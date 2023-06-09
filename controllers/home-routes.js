const router = require('express').Router();
const sequelize = require('../config/connection');
const { Restaurant, Rating, User } = require('../models'); //add user back in later

router.get('/', (req, res) => {
    console.log('======================');
    Restaurant.findAll({
      attributes: [
        'id',
        'name',
        'description',
        'address',
        'restaurant_url',
        'created_at',
        [sequelize.literal('(SELECT COUNT(*) FROM rating WHERE restaurant.id = rating.restaurant_id)'), 'rating_count'],
        [sequelize.literal('(SELECT CAST(AVG(rating) AS DECIMAL(10,1)) FROM rating WHERE restaurant.id = rating.restaurant_id)'), 'average_rating']
    ],
        order: [['created_at', 'DESC']], // newest restaurant first
      include: [
        // include the Rating model here:
        {
          model: Rating,
          attributes: ['id', 'rating', 'comment', 'restaurant_id', 'user_id'], // added 'user_id' back to attributes , 'created_at' WHY???
          order: [['created_at', 'DESC']], // newest rating first
          include: {
            model: User, // added this back
            attributes: ['username']
          }
        },
        // {
        //   model: User, // add this back later (don't need this unless a specific user has access to add a restaurant)
        //   attributes: ['username']
        // }
      ]
    })
      .then(dbRestaurantData => {
        const restaurants = dbRestaurantData.map(restaurant => restaurant.get({ plain: true }));
        res.render('homepage', { 
            restaurants
            // loggedIn: req.session.loggedIn // add this back later
        });
      })
      .catch(err => {
            console.log(err);
            res.status(500).json(err);
      });
});

//  add this back later
// router.get('/login', (req, res) => {
//     if (req.session.loggedIn) {
//       res.redirect('/');
//       return;
//     }
//       res.render('login');
// });

router.get('/restaurant/:id', (req, res) => {
    Restaurant.findOne({
      where: {
        id: req.params.id
      },
      attributes: [
        'id',
        'name',
        'description',
        'address',
        'restaurant_url',
        'created_at',
        [sequelize.literal('(SELECT COUNT(*) FROM rating WHERE restaurant.id = rating.restaurant_id)'), 'rating_count'],
        [sequelize.literal('(SELECT CAST(AVG(rating) AS DECIMAL(10,1)) FROM rating WHERE restaurant.id = rating.restaurant_id)'), 'average_rating']
    ],
    include: [
        {
          model: Rating,
          attributes: ['id', 'rating', 'comment', 'restaurant_id', 'user_id', 'created_at'], // add 'user_id' to attributes , 'created_at'
          order: [['created_at', 'DESC']], // newest rating first
          include: {  
            model: User,  // add this back later
            attributes: ['username']
          }
        }
        // {
        //   model: User, // add this back later (don't need this unless a specific user has access to add a restaurant)
        //   attributes: ['username']
        // }
      ]
    })
      .then(dbRestaurantData => {
        if (!dbRestaurantData) {
          res.status(404).json({ message: 'No restaurant found with this id' });
          return;
        }
  
        // serialize the data
        const restaurant = dbRestaurantData.get({ plain: true });
  
        // pass data to template
        res.render('single-restaurant', { 
          restaurant
        //   loggedIn: req.session.loggedIn  // add this back later
         });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});


module.exports = router;