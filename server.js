const express = require('express');
const path = require('path');

const routes = require('./controllers/');
const sequelize = require('./config/connection');
const exphbs = require('express-handlebars');
const hbs = exphbs.create({});

require('dotenv').config();

const SECRET = process.env.SECRET || PD_SECRET;

// configure session
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sess = {
  secret: SECRET,
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

const app = express();
const PORT = process.env.PORT || 3002;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// turn on session
app.use(session(sess));

// make front-end static resources
app.use(express.static(path.join(__dirname, 'public')));

// turn on routes
app.use(routes);

// set up handlebars
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// connection to db and server
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
});