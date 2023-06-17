// Controller - Login Route
app.post('/login', (req, res) => {
    const { username, password } = req.body;
  
    // Your authentication logic here
    User.findOne({ username: username }, (err, user) => {
      if (err) {
        // Handle database error
        return res.status(500).json({ error: 'Database error' });
      }
  
      if (!user) {
        // User not found in the database
        return res.render('login', { error: 'Invalid username or password' });
      }
  
      // Check password
      if (!user.checkPassword(password)) {
        // Incorrect password
        return res.render('login', { error: 'Invalid username or password' });
      }
  
      // Credentials are valid, continue with session management
      req.session.user = user; // Store user data in session
      res.redirect('/dashboard'); // Redirect to dashboard or desired page
    });
  });

  // Controller - Dashboard Route
app.get('/dashboard', (req, res) => {
    // Access authenticated user from session
    const user = req.session.user;
  
    // Check if user is logged in
    if (!user) {
      // User not authenticated, redirect to login page or show error
      return res.redirect('/login');
    }
  
    // User is authenticated, render the dashboard page
    res.render('dashboard', { user });
  });
  
  