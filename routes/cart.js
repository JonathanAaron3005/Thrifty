const express = require('express');
const router = express.Router();
const Cart = require('../models/cart');
const Item = require('../models/item');

router.get('/', async (req, res) => {
    const carts = await Cart.find({}).populate('item');
    res.render('carts/view', { carts });
})

router.post('/:itemId', async (req, res) => {
    const { itemId } = req.params;
    const item = await Item.findById(itemId);
    const cart = new Cart(req.body);
    cart.user = req.user._id;
    cart.item = itemId;

    await cart.save();
    req.flash('success', `${item.name} added to cart!`);
    
    res.redirect(`/cart`);
})

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    await Cart.findByIdAndDelete(id);
    req.flash('success', 'Successfully deleted item')
    res.redirect('/cart');
})

module.exports = router;