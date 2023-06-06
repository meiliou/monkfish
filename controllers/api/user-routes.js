const express = require('express');
const router = express.Router();
const { User } = require('../../models'); 

// GET /api/users
router.get('/', (req, res) => {
    // Access our User model and run .findAll() method)
    User.findAll({
        attributes: { exclude: ['password'] }
    })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
        console.log(err); 
        res.status(500).json(err); 
    });
}
);
router.get('/:id', (req, res) => {});

// POST /api/users
router.post('/', (req, res) => {
    User.create({
        username: req.body.username, 
        password: req.body.password
    })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
        console.log(err); 
        res.status(500).json(err); 
    });
});

// POST /api/users/1
router.post('/:id', (req, res) => {
    User.update(req.body, {
        individualHooks: true, 
        where: {
            id: req.params.id
        }
    })
    .then(dbUserData => {
        if (!dbUserData[0]) {
            res.status(404).json({ message: 'No user found with this id' }); 
            return; 
        }
        res.json(dbUserData); 
    })
    .catch(err => {
        console.log(err); 
        res.status(500).json(err); 
    });
});

// DELETE /api/users/1
router.delete('/:id', (req, res) => {
    User.destroy({
        where: {
            id: req.params.id 
        }
    })
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(404).json({ message: 'No Restaurant found with this id' }); 
            return; 
        }
        res.json(dbUserData); 
    })
    .catch(err => {
        console.log(err); 
        res.status(500).json(err); 
    });
});

module.exports = router;
