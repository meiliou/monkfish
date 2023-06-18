const User = require('../models/User');

const signupController = {
  getSignup: (req, res) => {
    const { error } = req.query;
    const loggedIn = req.session.user ? true : false;
    res.render('signup', { error, loggedIn });
  },

  postSignup: (req, res) => {
    const { username, password } = req.body;

    // Validate user inputs
    if (!username || !password) {
      return res.redirect('/signup?error=Please%20enter%20all%20fields');
    }

    User.findOne({ username })
      .then(existingUser => {
        if (existingUser) {
          return res.redirect('/signup?error=User%20already%20exists');
        }

        return User.create({ username, password });
      })
      .then(newUser => {
        res.redirect('/login');
      })
      .catch(err => {
        console.log(err);
        return res.status(500).json({ error: 'Database error' });
      });
  }
};

module.exports = signupController;
