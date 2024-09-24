const { DEFUALTVALIDATOR, URL } = require('./mongooseValidators');
const mongoose = require('mongoose');

const Image = new mongoose.Schema({
    url: URL,
    alt: { ...DEFUALTVALIDATOR, required: false, minLength: 0 }
});

module.exports = { Image }