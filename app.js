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

//database setup
mongoose.connect('mongodb://127.0.0.1:27017/thrifting', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})
.then(() => console.log('Connected!'));

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
app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})

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

//public setup
app.use(express.static(path.join(__dirname, 'public')))


app.use('/item', itemRoutes);
app.use('/user', userRoutes);
app.use('/store', storeRoutes); 
app.use('/item/:id/reviews', reviewRoutes);

app.get('/homepage', (req, res) => {
    res.render('homepage');
})

app.listen(3000, () => {
    console.log('Serving on port 3000');
})