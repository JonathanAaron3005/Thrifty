const express = require('express');
const router = express.Router();
const Cart = require('../models/cart');
const Item = require('../models/item');

router.get('/', async (req, res) => {
    const carts = await Cart.find({ user: req.user }).populate('item');
    res.render('carts/view', { carts });
})

router.post('/:itemId', async (req, res) => {
    const { itemId } = req.params;
    if (req.body.quantity < 0) {
        req.flash('error', 'quantity cannot be below 0!');
        res.redirect(`/item/${itemId}`);
    } else {
        const item = await Item.findById(itemId);
        const existingCart = await Cart.findOne({ item: item, user: req.user._id });
        if(existingCart) {
            existingCart.quantity += parseInt(req.body.quantity);
            await existingCart.save();
        } else{
            const cart = new Cart(req.body);
            cart.user = req.user._id;
            cart.item = itemId;
            await cart.save();
        }
        req.flash('success', `${item.name} added to cart!`);
        res.redirect(`/cart`);
    }
})

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    await Cart.findByIdAndDelete(id);
    req.flash('success', 'Successfully deleted item')
    res.redirect('/cart');
})

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    if (req.body.quantity < 0) {
        req.flash('error', 'quantity cannot be below 0!');
        res.redirect(`/cart`);
    } else {
        console.log(req.body)
        const cart = await Cart.findByIdAndUpdate(id, req.body).populate('item');
        await cart.save();

        req.flash('success', `${cart.item.name} quantity updated!`);
        res.redirect('/cart');
    }
})

module.exports = router;