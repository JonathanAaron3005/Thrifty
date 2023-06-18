if (process.env.NODE_ENV !== "production") {
  require('dotenv').config();
}

//server setup
const express = require('express');
const ejsMate = require('ejs-mate');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const methodOverride = require('method-override');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const mongoSanitize = require('express-mongo-sanitize');

//require from local folder
const User = require('./models/user')
const Store = require('./models/store')
const Item = require('./models/item');

//database setup
const mongoOptions = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  serverSelectionTimeoutMS: 1000,
}

mongoose.connect('mongodb://localhost:27017/thrifting', mongoOptions)
  .then(() => console.log("Connected to localhost!"), function () { return mongoose.connect('mongodb://127.0.0.1:27017/thrifting', mongoOptions) })
  .then(() => console.log("Connected to 127.0.0.1!"), () => console.log("Failed connecting to mongoose!"))

//setup session
const sessionConfig = {
  name: 'session',
  secret: 'thisshouldbeabettersecret!',
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    // secure: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7
  }
}

const app = express();

app.use(session(sessionConfig));
app.use(flash());

//setup passport
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//setup locals
app.use(async (req, res, next) => {
  if (req.user) {
    req.user.populate('role').execPopulate()
      .then(async (populatedUser) => {
        res.locals.currentUser = populatedUser;
        res.locals.userStore = await Store.findOne({ user: populatedUser._id });
        res.locals.success = req.flash('success');
        res.locals.error = req.flash('error');
        next();
      })
      .catch((err) => {
        res.send(err)
      });
  } else {
    res.locals.currentUser = null;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
  }
});

//setup ejs
app.engine('ejs', ejsMate)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

//setup post method
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

//setup router
const itemRoutes = require('./routes/item');
const userRoutes = require('./routes/user');
const storeRoutes = require('./routes/store');
const reviewRoutes = require('./routes/review');
const cartRoutes = require('./routes/cart');
const trRoutes = require('./routes/transaction');

//public setup
app.use(express.static(path.join(__dirname, 'public')))


app.use('/item', itemRoutes);
app.use('/user', userRoutes);
app.use('/store', storeRoutes);
app.use('/item/:id/reviews', reviewRoutes);
app.use('/cart', cartRoutes);
app.use('/transaction', trRoutes);

app.get('/homepage', async (req, res) => {
  const user = await User.findById(req.user._id).populate('role');
  if(user.role.name === 'buyer'){
    res.redirect('/item');
  } else {
    const items = await Item.find({ user: req.user });
    res.render('homepage', { items });
  }
})

app.get('/', (req, res) => {
  res.redirect('/homepage');
})

app.listen(3000, () => {
  console.log('Serving on port 3000');
})