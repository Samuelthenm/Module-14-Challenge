const router = require('express').Router();
const { Comment, Post, User } = require('../../models');

router.post('/', async (req, res) => {
    // console.log(1); 
 

    if (!req.session.user_id) {
        return res.status(403).json({ message: 'You must be logged in to add a comment.' });
    }

    try {
        const newComment = await Comment.create({
            comment_text: req.body.comment_text,
            post_id: req.body.post_id,
            user_id: req.session.user_id
        });

        res.status(200).json(newComment);
    } catch (err) {
        console.error(' Error creating comment:', err);
        res.status(400).json({ message: 'Failed to add comment.' });
    }
});

router.get('/:postId', async (req, res) => {
    try {
        const comments = await Comment.findAll({
            where: { post_id: req.params.postId },
            include: [
                {
                    model: User,
                    attributes: ['username']
                }
            ]
        });

        if (!comments.length) {
            return res.status(404).json({ message: 'No comments found for this post.' });
        }

        res.status(200).json(comments);
    } catch (err) {
        console.error(' Error fetching comments:', err);
        res.status(500).json({ message: 'Failed to fetch comments.' });
    }
});


router.delete('/:id', async (req, res) => {
    if (!req.session.user_id) {
        return res.status(403).json({ message: 'You must be logged in to delete a comment.' });
    }

    try {
        const commentData = await Comment.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id
            }
        });

        if (!commentData) {
            res.status(404).json({ message: 'No comment found with this ID!' });
            return;
        }

        res.status(200).json({ message: 'Comment deleted successfully.' });
    } catch (err) {
        console.error(' Error deleting comment:', err);
        res.status(500).json({ message: 'Failed to delete comment.' });
    }
});

module.exports = router;