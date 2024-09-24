const mongoose = require('mongoose');
const { DEFUALTVALIDATOR } = require('./mongooseValidators');

const Name = new mongoose.Schema({
    first: DEFUALTVALIDATOR,
    middle: {
        type: String,
        maxLength: 256,
        trim: true,
        lowercase: true
    },
    last: DEFUALTVALIDATOR
});

module.exports = { Name };