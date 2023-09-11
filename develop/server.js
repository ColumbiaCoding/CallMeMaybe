// const express = require('express');
// const exphbs = require('express-handlebars');

// const routes = require('./controllers');
// const sequelize = require('./config/connection');


// const app = express();
// const PORT = process.env.PORT || 3001;

// //TODO: Don't forget to configure your app to accept JSON
// app.use(express.static('public'));

// app.engine('handlebars', exphbs.engine());
// app.set('view engine', 'handlebars');

// //TODO: Use the Express Router for more detailed routes
// app.use(routes);
// app.get('/', function (req, res) {
//     res.render('home');
// });

// sequelize.sync({ force: false }).then(() => {
//     app.listen(PORT, () => {
//       console.log(`App listening on port http://localhost:${PORT}`);
//     });
//   });

const path = require('path');
const express = require('express');
// Import express-session
const session = require('express-session');
const exphbs = require('express-handlebars');

const routes = require('./controllers');
const sequelize = require('./config/connection');
const helpers = require('./utils/helpers');

const app = express();
const PORT = process.env.PORT || 3001;

// Set up sessions
const sess = {
  secret: 'Super secret secret',
  resave: false,
  saveUninitialized: true,
};

app.use(session(sess));

const hbs = exphbs.create({ helpers });

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});
