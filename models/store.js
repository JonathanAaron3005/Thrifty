const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const storeSchema = new Schema({
    name: String,
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

module.exports = mongoose.model('Store', storeSchema);