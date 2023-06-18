const router = require('express').Router();

// Define homepage route
router.get('/', (req, res) => {
  res.render('homepage'); // Render the "homepage" template
});

module.exports = router;
