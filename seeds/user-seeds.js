const { User } = require('../models');

const userData = [
    {
        id: 0,
        username: "martin_b",
        email: "martin_b@gmail.com",
        password: "p@ssword1",
        role: 1,
        hospitalityExperience: "test",
    },
    {
        id: 1,
        username: "matt_b",
        email: "mathew_b@gmail.com",
        password: "p@ssword2",
        role: 1,
        hospitalityExperience: "test",
    },
    {
        id: 2,
        username: "shaun_c",
        email: "shaun_c@gmail.com",
        password: "p@ssword3",
        role: 1,
        hospitalityExperience: "test",
    },
    {
        id: 3,
        username: "lee_n",
        email: "lee_n@gmail.com",
        password: "p@ssword4",
        role: 1,
        hospitalityExperience: "test",
    },
    {
        id: 4,
        username: "priya_r",
        email: "priya_r@gmail.com",
        password: "p@ssword5"
    }
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;