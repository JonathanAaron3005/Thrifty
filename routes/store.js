const express = require('express');
const router = express.Router();
const Store = require('../models/store')
const User = require('../models/user')

router.get('/new', (req, res) => {
    res.render('stores/new');
})

router.post('/', async (req, res) => {
    const store = new Store(req.body);
    store.user = req.user._id;
    
    await store.save();
    req.flash('success', 'Successfuly Created Store!');
    res.redirect('/homepage');
})

module.exports = router;