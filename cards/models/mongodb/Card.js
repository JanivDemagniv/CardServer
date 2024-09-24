const mongoose = require('mongoose');
const { DEFUALTVALIDATOR, PHONE, EMAIL, URL } = require('../../../helpers/mongodb/mongooseValidators');
const { Image } = require('../../../helpers/mongodb/Image');
const { Address } = require('../../../helpers/mongodb/Address');

const cardSchema = new mongoose.Schema({
    title: DEFUALTVALIDATOR,
    subtitle: DEFUALTVALIDATOR,
    description: {
        ...DEFUALTVALIDATOR,
        maxLength: 1024
    },
    phone: PHONE,
    email: EMAIL,
    web: URL,
    image: Image,
    address: Address,
    bizNumber: {
        type: Number,
        required: true,
        min: 1000000,
        max: 9999999
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    likes: [{ type: String }],
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
});

const Card = mongoose.model('card', cardSchema);

module.exports = Card 