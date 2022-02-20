const express = require('express');
const routes = require('./controllers');
const sequelize = require('./config/connection');
const app = express();

//use Heroku's process.env.PORT
const PORT = process.env.PORT || 3001;
const path = require('path');

//tell Handlebars about helpers
const helpers = require('./utils/helpers'); //helps with date formatting

const exHb = require('express-handlebars');

//pass the helpers to the existing exHb.create()
const handlebars = exHb.create({ helpers });

const session = require('express-session');

const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sesh = {
    secret: `'${process.env.SS}'`,
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize,
    })
};

app.use(session({secret: sesh}));

app.use(express.static(path.join(__dirname, 'public'))); //link static files
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// activate routes
app.use(routes);

//activate connection to db/server
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`🎯 Now Listening on ${PORT}! `));
});
