const router = require('express').Router();
const { Post, User, Comment } = require('../../models');


router.get('/', async (req, res) => {
    try {
        const posts = await Post.findAll({
            include: [{ model: User, attributes: ['username'] }]
        });
        res.json(posts);
    } catch (err) {
        res.status(500).json(err);
    }
});


router.get('/:id', async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [
                { model: User, attributes: ['username'] },
                { 
                    model: Comment,
                    include: [{ model: User, attributes: ['username'] }] 
                }
            ]
        });

        if (!postData) {
            res.status(404).json({ message: 'Post not found.' });
            return;
        }

        const post = postData.get({ plain: true });

        res.render('singlePost', { post, logged_in: req.session.logged_in });
    } catch (err) {
        console.error('Error loading post:', err);
        res.status(500).json({ message: 'Failed to load post.' });
    }
});


router.post('/', async (req, res) => {
    console.log(' Incoming Data:', req.body); 

    try {
        const newPost = await Post.create({
            title: req.body.title,
            content: req.body.content,
            user_id: req.session.user_id
        });

        res.status(200).json(newPost);
    } catch (err) {
        console.error(' Error creating post:', err);
        res.status(400).json({ message: 'Failed to create post.' });
    }
});


router.put('/:id', async (req, res) => {
    try {
        const updatedPost = await Post.update(
            {
                title: req.body.title,
                content: req.body.content
            },
            {
                where: {
                    id: req.params.id,
                    user_id: req.session.user_id
                }
            }
        );

        if (!updatedPost[0]) {
            res.status(404).json({ message: 'No post found with this ID!' });
            return;
        }

        res.status(200).json({ message: 'Post updated successfully.' });
    } catch (err) {
        console.error('Error updating post:', err);
        res.status(500).json({ message: 'Failed to update post.' });
    }
});


router.delete('/:id', async (req, res) => {
    try {
        const postData = await Post.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id
            }
        });

        if (!postData) {
            res.status(404).json({ message: 'No post found with this id!' });
            return;
        }

        res.status(200).json({ message: 'Post deleted successfully.' });
    } catch (err) {
        console.error(' Error deleting post:', err);
        res.status(500).json({ message: 'Failed to delete post.' });
    }
});

module.exports = router;