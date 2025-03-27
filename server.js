const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const helpers = require('./utils/helpers'); 
const SequelizeStore = require('connect-session-sequelize')(session.Store);


const postRoutes = require('./controllers/api/postRoutes');
const commentRoutes = require('./controllers/api/commentRoutes');
const userRoutes = require('./controllers/api/userRoutes');  

const sequelize = require('./config/connection'); 
const routes = require('./controllers'); 
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

const hbs = exphbs.create({ helpers });

const sess = {
    secret: 'Super secret secret',
    cookie: {
        maxAge: 600000, 
        httpOnly: true,
        secure: false,
        sameSite: 'strict',
    },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize,
    }),
};

app.use(session(sess));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));


app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/users', userRoutes);  
app.use(routes);

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(` Server running on http://localhost:${PORT}`));
});


app.use((err, req, res, next) => {
    console.error(' Server Error:', err);
    res.status(500).json({ message: 'Internal server error' });
});