const express = require('express');
const router = express.Router();
const User = require('../models/user')
const Role = require('../models/role');
const passport = require('passport');

router.get('/', (req, res) => {
    res.send('seller')
})

router.get('/register', (req, res) => {
    res.render('users/register')
})

router.post('/register', async (req, res) => {
    const { email, username, password, DOB, phoneNumber, address, role } = req.body;

    const findRole = await Role.findOne({ name: role });
    if (findRole == null) {
        req.flash('error', "You cannot assign other roles.");
        res.redirect('/user/register');
        return;
    }

    const roleId = findRole._id;
    const user = new User({ email, username, DOB, phoneNumber, address, role: roleId });
    const registeredUser = await User.register(user, password);

    req.login(registeredUser, err => {
        if (err) return next(err);
        if (role == "seller") {
            req.flash('success', 'Welcome to Thrifty! Create a Store to Start Selling Items!');
            res.redirect('/store/new');
        } else {
            req.flash('success', 'Welcome to Thrifty!');
            res.redirect('/homepage');
        }
    })
})

router.get('/login', (req, res) => {
    res.render('users/login');
})

router.post('/login', 
    passport.authenticate('local', { failureFlash: true, failureRedirect: '/user/login' }),
    async (req, res) => {
        req.flash('success', 'Welcome back!');
        res.redirect('/homepage');
    })

router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success', "Successfully Logged Out!");
    res.redirect('/homepage');
})


module.exports = router;