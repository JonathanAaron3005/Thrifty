const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('../models/user');
const Item = require('../models/item');

const CartSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    items: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Item'
        }
    ]
})

module.exports = mongoose.model('Cart', CartSchema);