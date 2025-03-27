const { Post } = require('../models');

const postData = [
    {
        title: 'Understanding MVC',
        content: 'MVC stands for Model-View-Controller and is an important design pattern.',
        user_id: 1  
    },
    {
        title: 'Sequelize Basics',
        content: 'Sequelize is an ORM that makes database interactions easier in Node.js.',
        user_id: 2 
    }
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;