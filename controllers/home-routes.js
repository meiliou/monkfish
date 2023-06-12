const router = require('express').Router();
const sequelize = require('../config/connection');
const { Restaurant, Rating } = require('../models'); //add user back in later

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
        [sequelize.literal('(SELECT COUNT(*) FROM rating WHERE restaurant.id = rating.restaurant_id)'), 'rating_count']
      ],
        order: [['created_at', 'DESC']], // newest restaurant first
      include: [
        // include the Rating model here:
        {
          model: Rating,
          attributes: ['id', 'rating', 'comment', 'restaurant_id'], // add 'user_id' to attributes , 'created_at' WHY???
          // include: {
            // model: User, // add this back later
            // attributes: ['username']
          // }
        },
        // {
        //   model: User, // add this back later
        //   attributes: ['username']
        // }
      ]
    })
      .then(dbRestaurantData => {
        const restaurants = dbRestaurantData.map(post => post.get({ plain: true }));
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
        [sequelize.literal('(SELECT COUNT(*) FROM rating WHERE restaurant.id = rating.restaurant_id)'), 'rating_count']
    ],
    include: [
        {
          model: Rating,
          attributes: ['id', 'rating', 'comment', 'restaurant_id'], // add 'user_id' to attributes , 'created_at'
          // include: {  
        //   //   model: User,  // add this back later
        //   //   attributes: ['username']
          // }
        }
        // {
        //   model: User, // add this back later
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