const { User } = require('../models');

const userData = [
    {
        username: 'AndresZ25',
        password: 'password123',
    },
    {
        username: 'Darlene',
        password: 'password456',
    },
];

const seedUsers = () => User.bulkCreate(userData, { individualHooks: true });

module.exports = seedUsers;