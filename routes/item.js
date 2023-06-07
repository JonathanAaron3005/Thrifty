const express = require('express');
const router = express.Router();
const Item = require('../models/item');
const Store = require('../models/store');

router.get('/', async (req, res) => {
    const items = await Item.find({});
    res.render('items/view', { items });
})

router.get('/new', async (req, res) => {
    res.render('items/new');
})

router.post('/', async (req, res) => {
    const currentUser = req.user._id;
    const store = await Store.findOne({ user: currentUser })
    const item = new Item(req.body)
    item.user = currentUser;
    store.items.push(item);

    await item.save();
    await store.save();
    res.send('item added')
})

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const item = await Item.findById(id).populate({
        path: 'reviews',
        populate: {
            path: 'user'
        }
    }).populate('user');
    if (!item) {
        req.flash('error', 'Cannot find that item!');
        return res.redirect('/homepage');
    }
    const store = await Store.findOne({ items: { $elemMatch: { $eq: id } } });

    res.render('items/detail', { item, store});
})

module.exports = router;