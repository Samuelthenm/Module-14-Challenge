const { Comment } = require('../models');

const commentData = [
    {
        comment_text: 'Great post! Really insightful.',
        post_id: 1,   
        user_id: 2     
    },
    {
        comment_text: 'I love learning about Sequelize!',
        post_id: 2,   
        user_id: 1     
    }
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;