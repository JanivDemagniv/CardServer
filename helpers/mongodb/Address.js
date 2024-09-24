const { DEFUALTVALIDATOR } = require('./mongooseValidators');
const mongoose = require('mongoose');

const Address = new mongoose.Schema({
    state: {
        type: String,
        maxLength: 256,
        trim: true
    },
    country: DEFUALTVALIDATOR,
    city: DEFUALTVALIDATOR,
    street: DEFUALTVALIDATOR,
    houseNumber: {
        type: Number,
        required: true,
        min: 1
    },
    zip: {
        type: Number,
        default: 0
    }
})

module.exports = { Address }