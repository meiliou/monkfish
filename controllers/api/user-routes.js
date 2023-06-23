// Import required modules and files
const sequelize = require('../../config/connection');
const router = require('express').Router();
const { body, validationResult } = require('express-validator');
const signupController = require('../signupController');
const express = require('express');
const { Restaurant, Rating, User } = require('../../models');

// GET /api/users
router.get('/', (req, res) => {
  User.findAll({
    attributes: { exclude: ['password'] }
  })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: 'An error occurred' });
    });
});

// GET /api/users/:id
router.get('/:id', (req, res) => {
  User.findOne({
    where: {
      id: req.params.id
    },
    attributes: { exclude: ['password'] }
  })
    .then(dbUserData => {
      if (!dbUserData) {
        res.status(404).json({ error: 'No user found with this id' });
        return;
      }
      res.json(dbUserData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: 'An error occurred' });
    });
});

// POST /api/users
router.post('/', [
  body('username').notEmpty().withMessage('Username is required'),
  body('password').notEmpty().withMessage('Password is required'),
  body('email').isEmail().withMessage('Must be a valid email address'),
  body('hospitalityExperience').optional()
], (req, res) => {
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
});

// POST /api/users/:id
router.post('/:id', (req, res) => {
  User.update(req.body, {
    individualHooks: true,
    where: {
      id: req.params.id
    }
  })
    .then(([updatedRows]) => {
      if (updatedRows === 0) {
        res.status(404).json({ error: 'No user found with this id' });
        return;
      }
      res.json({ message: 'User updated successfully' });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: 'An error occurred' });
    });
});

router.post('/login', (req, res) => {
    User.findOne({
      where: {
        username: req.body.username
      }
    }).then(dbUserData => {
      if (!dbUserData) {
        res.status(400).json({ message: 'No user with that email username!' });
        return;
      }
      
      // used to check progress prior to adding password encryption
      // res.json({ user: dbUserData });
  
      // Verify user
      // const validPassword = dbUserData.checkPassword(req.body.password);
      // if (!validPassword) {
      //   res.status(400).json({ message: 'Incorrect password!' });
      //   return;
      // }
      
      req.session.save(() => {
        // declare session variables
        req.session.user_id = dbUserData.id;
        req.session.username = dbUserData.username;
        req.session.loggedIn = true;

        res.json({ user: dbUserData, message: 'You are now logged in!' });
      });
    });  
});

router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

router.post('/signup', [
  body('username').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Must be a valid email address'),
  body('password').notEmpty().withMessage('Password is required'),
  body('experience').optional()
], (req, res) => {
  signupController.signup(req, res); // Call signup method of signupController
});

module.exports = router, signupController;

