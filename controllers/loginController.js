const User = require('../models/User');

const loginController = {
  getLogin: (req, res) => {
    const { error } = req.query;
    const loggedIn = req.session.user ? true : false;
    res.render('login', { error, loggedIn });
  },

  postLogin: (req, res) => {
    const { username, password } = req.body;

    User.findOne({ username })
      .then(user => {
        if (!user || !user.checkPassword(password)) {
          return res.redirect('/login?error=Invalid%20username%20or%20password');
        }

        req.session.user = user;
        res.redirect('/dashboard');
      })
      .catch(err => {
        console.log(err);
        return res.status(500).json({ error: 'Database error' });
      });
  }
};

module.exports = loginController;
