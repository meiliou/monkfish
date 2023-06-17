const router = require('express').Router();
const { Rating } = require('../../models');
// const withAuth = require('../../utils/auth');

router.get('/', (req, res) => {
    Rating.findAll({
        attributes: [
          'id',
          'rating',
          'comment', 
          // 'user_id', 
          'restaurant_id',
          'created_at'
          ],
        order: [['created_at', 'DESC']],
      })
        .then(dbRatingData => res.json(dbRatingData))
        .catch(err => {
        console.log(err);
        res.status(500).json(err);
        });
});

router.get('/:id', (req, res) => {
  Rating.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      'id',
      'rating',
      'comment',
      'restaurant_id',
      // 'user_id', 
      'created_at'
    ],
    order: [['created_at', 'DESC']],
    include: [
      // add back in later
      // {
      //   model: User,
      //   attributes: ['username']
      // }
    ]
  })
    .then(dbPostData => {
      if (!dbPostData) {
        res.status(404).json({ message: 'No rating found with this id' });
        return;
      }
      res.json(dbPostData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});





// router.post('/', withAuth, (req, res) => {
router.post('/', (req, res) => {
  // check the session
  if (req.session) {
    Rating.create({
      rating: req.body.rating,
      comment: req.body.comment,
      restaurant_id: req.body.restaurant_id
      // use the id from the session - add this back later
    //   user_id: req.session.user_id
    })
      .then(dbRatingData => res.json(dbRatingData))
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  }
});

// router.delete('/:id', withAuth, (req, res) => {
router.delete('/:id', (req, res) => {
    Rating.destroy({
        where: {
          id: req.params.id
        }
      })
        .then(dbRatingData => {
          if (!dbRatingData) {
            res.status(404).json({ message: 'No rating found with this id' });
            return;
          }
          res.json(dbRatingData);
        })
        .catch(err => {
          console.log(err);
          res.status(500).json(err);
        });
});

// router.put('/:id', withAuth, (req, res) => {
  router.put('/:id', (req, res) => {
    Rating.update(
      {
        rating: req.body.rating,
        comment: req.body.comment
      },
      {
        where: {
          id: req.params.id
        }
      }
    )
      .then(dbPostData => {
        if (!dbPostData) {
          res.status(404).json({ message: 'No post found with this id' });
          return;
        }
        res.json(dbPostData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

module.exports = router;