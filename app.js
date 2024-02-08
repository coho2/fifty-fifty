const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to the database
// ...

// Set view engine to Handlebars
app.engine('handlebars', require('express-handlebars').engine());
app.set('view engine', 'handlebars');

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(session({ secret: 'secret-key', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

// Passport config
passport.use(new LocalStrategy({ usernameField: 'email' },
  (email, password, done) => {
    // Query the database for the user with the given email
    // If the user exists, compare the password to the hashed password in the database
    // If the passwords match, call `done` with the user object
    // If the passwords don't match, or if the user doesn't exist, call `done` with a `false` value
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  // Query the database for the user with the given id
  // Call `done` with the user object
});

// Routes
app.get('/', (req, res) => {
  res.render('index');
});

app.get('/register', (req, res) => {
  res.render('register');
});

app.post('/register', (req, res) => {
  // Validate the user input
  // Save the user to the database
  // Assign a unique account number

  // Hash the password
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Internal Server Error');
    }

    // Save the user to the database with the hashed password
    // Assign a unique account number

    // Redirect the user to the login page
    res.redirect('/login');
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});