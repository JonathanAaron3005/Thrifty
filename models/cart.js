const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('../models/user');
const Item = require('../models/item');

const CartSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    item: {
        type: Schema.Types.ObjectId,
        ref: 'Item'
    },
    quantity: Number
})

module.exports = mongoose.model('Cart', CartSchema);