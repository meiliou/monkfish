const router = require('express').Router();
const { Restaurant, Rating, User } = require('../../models');
const sequelize = require('../../config/connection');
// const withAuth = require('../../utils/auth');

// get all restaurants
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
          attributes: ['id', 'rating', 'comment', 'restaurant_id', 'user_id'], // add 'user_id' to attributes , 'created_at' WHY???
          order: [['created_at', 'DESC']], // newest rating first
          include: {
            model: User, // added this back
            attributes: ['username']
          }
        }
        // {
        //   model: User, // added this back
        //   attributes: ['username']
        // }
      ]
    })
        .then(dbRestaurantData => res.json(dbRestaurantData))
        .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

router.get('/:id', (req, res) => {
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
        attributes: ['id', 'rating', 'comment', 'restaurant_id', 'user_id'], // add 'user_id' to attributes , 'created_at'
        order: [['created_at', 'DESC']], // newest rating first
        include: {  
          model: User,  // added this back
          attributes: ['username']
        }
      }
      // {
      //   model: User, // added this back
      //   attributes: ['username']
      // }
    ]
  })
    .then(dbRestaurantData => {
      if (!dbRestaurantData) {
        res.status(404).json({ message: 'No restaurant found with this id' });
        return;
      }
      res.json(dbRestaurantData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// router.post('/', withAuth, (req, res) => {
router.post('/', (req, res) => {
    // expects {name: 'The Monkfish', description: 'Best restaurant ever', address: 'Cape Town, South Africa', restaurant_url: 'www.themonkfish.com'}
    Restaurant.create({
        name: req.body.name,
        description: req.body.description,
        address: req.body.address,
        restaurant_url: req.body.restaurant_url
    })
      .then(dbRestaurantData => res.json(dbRestaurantData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

// router.put('/:id', withAuth, (req, res) => {
router.put('/:id', (req, res) => {
    Restaurant.update(
      {
        name: req.body.name,
        description: req.body.description,
        address: req.body.address,
        restaurant_url: req.body.restaurant_url
      },
      {
        where: {
          id: req.params.id
        }
      }
    )
      .then(dbRestaurantData => {
        if (!dbRestaurantData) {
          res.status(404).json({ message: 'No restaurant found with this id' });
          return;
        }
        res.json(dbRestaurantData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

// router.delete('/:id', withAuth, (req, res) => {
router.delete('/:id', (req, res) => {
    Restaurant.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(dbRestaurantData => {
        if (!dbRestaurantData) {
          res.status(404).json({ message: 'No restaurant found with this id' });
          return;
        }
        res.json(dbRestaurantData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

module.exports = router;