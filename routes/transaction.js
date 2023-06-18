const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Transaction = require('../models/transaction');
const Cart = require('../models/cart');

router.get('/', async (req, res) => {
    const transactions = await Transaction.find({ user: req.user });
    for (let detail of transactions.detail){
        await detail.populate('item');
    }
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

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const transaction = await Transaction.findById(id).populate('item');
    res.render("transactions/detail", { transaction });
})

module.exports = router;