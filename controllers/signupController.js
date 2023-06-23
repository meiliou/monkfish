// Import required modules and files
const { validationResult } = require('express-validator');
const { User } = require('../models');

const signupController = {
  signup: (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    User.create({
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
      hospitalityExperience: req.body.hospitalityExperience
    })
      .then(dbUserData => res.json(dbUserData))
      .catch(err => {
        console.log(err);
        res.status(500).json({ error: 'An error occurred' });
      });
  }
};

module.exports = signupController;
