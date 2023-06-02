const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Role = require('./role');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    DOB: Date,
    address: [String],
    phoneNumber: String,
    role: {
        type: Schema.Types.ObjectId,
        ref: 'Role'
    }
})

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);

