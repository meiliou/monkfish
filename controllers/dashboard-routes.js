const express = require('express').Router;
const router = express.Router();
const sequelize = require('../config/connection');
const { User } = require('../models');

// Get all restuarants render homepage
router.get('/', (req, res) => {
    User.findAll({
        attributes: { exclude: ['password'] }
    })
        .then(dbUserData => {
            // pass a single post object into the homepage template
            res.render('homepage', dbUserData[0].get({ plain: true }));
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// Login
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

