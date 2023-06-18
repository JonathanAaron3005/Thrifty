const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Transaction = require('../models/transaction');
const Cart = require('../models/cart');

router.get('/', async (req, res) => {
    const transactions = await Transaction.find({ user: req.user }).populate('detail.item');
    res.render('transactions/view', { transactions });
})

router.post('/', async (req, res) => {
    const cart = await Cart.find({ user: req.user })
    const tr = new Transaction();
    tr.user = req.user;
    tr.date = Date.now();
    tr.detail = cart.map(c => ({ item: c.item, quantity: c.quantity }));

    await tr.save();
    await Cart.deleteMany({ user: req.user });
    res.redirect('/transaction');
})

module.exports = router;