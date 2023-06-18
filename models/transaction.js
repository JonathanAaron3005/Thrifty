const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const transactionSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    date: Date,
    detail: [
        {
            item: {
                type: Schema.Types.ObjectId,
                ref: 'Item'
            },
            quantity: Number
        }
    ]
})

module.exports = mongoose.model('Transaction', transactionSchema)