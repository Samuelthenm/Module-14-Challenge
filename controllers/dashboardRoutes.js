const router = require('express').Router();
const { Post } = require('../models');
const withAuth = require('../utils/auth');  


router.get('/', withAuth, async (req, res) => {
    try {
        const postData = await Post.findAll({
            where: { user_id: req.session.user_id }
        });

        const posts = postData.map((post) => post.get({ plain: true }));

        res.render('dashboard', {
            posts,
            logged_in: true
        });
    } catch (err) {
        res.status(500).json(err);
    }
});


router.get('/new', withAuth, (req, res) => {
    res.render('newPost', { logged_in: true });
});


router.get('/edit/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id);

        if (!postData) {
            res.status(404).json({ message: 'No post found with this ID' });
            return;
        }

        const post = postData.get({ plain: true });

        res.render('editPost', {
            post,
            logged_in: true
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;