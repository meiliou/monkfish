const router = require('express').Router();

const apiRoutes = require('./api');

router.use('/api', apiRoutes);

router.use((req, res) => {
  res.status(404).end();
});

router.get('/', (req, res) => {
  res.render('homepage');
});



module.exports = router;