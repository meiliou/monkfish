const router = require('.');
const User = require('../../models/User');

exports.signup = (req, res) => {
  const { username, password } = req.body;

  // Validate user inputs
  // ...

  // Check if user already exists in the database
  User.findOne({ username }, (err, existingUser) => {
    if (err) {
      // Handle database error
      return res.status(500).json({ error: 'Database error' });
    }

    if (existingUser) {
      // User already exists, handle accordingly (e.g., display error message)
      return res.status(400).json({ error: 'User already exists' });
    }

    // Create a new user record in the database
    const newUser = new User({ username, password });
    newUser.save((err) => {
      if (err) {
        // Handle database error
        return res.status(500).json({ error: 'Database error' });
      }

      // User created successfully, return success response
      res.json({ message: 'User created successfully' });
    });
  });
};

module.exports = router