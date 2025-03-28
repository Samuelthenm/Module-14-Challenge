const router = require('express').Router();
const { Post, User, Comment } = require('../models');

router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [{ model: User, attributes: ['username'] }],
        });

        const posts = postData.map((post) => post.get({ plain: true }));

        res.render('homepage', {
            posts,
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});


router.get('/post/:id', async (req, res) => { 
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [
                { model: User, attributes: ['username'] },
                {
                    model: Comment,
                    include: { model: User, attributes: ['username'] },
                },
            ],
        });

        if (!postData) {
            res.status(404).json({ message: 'No post found with this ID' });
            return;
        }

        const post = postData.get({ plain: true });

        res.render('singlePost', {
            post,
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        console.error('Error fetching post:', err);
        res.status(500).json(err);
    }
});


router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/dashboard');
        return;
    }

    res.render('login');
});

module.exports = router; 