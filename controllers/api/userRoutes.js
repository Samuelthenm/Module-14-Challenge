const router = require('express').Router();
const { User } = require('../../models');


router.get('/', async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: { exclude: ['password'] }
        });
        res.json(users);
    } catch (err) {
        console.error('Error fetching users:', err);
        res.status(500).json(err);
    }
});


router.post('/login', async (req, res) => {
    try {
        console.log('Received Login Data:', req.body);

        const userData = await User.findOne({ where: { username: req.body.username } });

        if (!userData) {
            console.error('User not found');
            return res.status(400).json({ message: 'Incorrect username or password, please try again' });
        }

        const validPassword = await userData.checkPassword(req.body.password);

        if (!validPassword) {
            console.error('Invalid password');
            return res.status(400).json({ message: 'Incorrect username or password, please try again' });
        }

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            console.log('Login successful');
            res.json({ user: userData, message: 'Login successful!' });
        });
    } catch (err) {
        console.error('Server error during login:', err);
        res.status(500).json({ message: 'Internal server error, please try again later.' });
    }
});


router.post('/signup', async (req, res) => {
    try {
        console.log('Received Signup Data:', req.body);

        const newUser = await User.create({
            username: req.body.username,
            password: req.body.password
        });

        req.session.save(() => {
            req.session.user_id = newUser.id;
            req.session.logged_in = true;

            console.log('Signup successful');
            res.status(200).json(newUser);
        });
    } catch (err) {
        console.error('Server error during signup:', err);
        res.status(500).json({ message: 'Internal server error, please try again later.' });
    }
});


router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            console.log('Logout successful');
            res.status(204).end();
        });
    } else {
        console.error('Logout attempt failed - No active session');
        res.status(404).end();
    }
});

module.exports = router;
