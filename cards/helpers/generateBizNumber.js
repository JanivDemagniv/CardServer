const _ = require('lodash')
const Card = require("../models/mongodb/Card");
const { createError } = require('../../utils/handleErrors');

const generateBizNumber = async () => {

    let cardsCount = await Card.find().countDocuments();
    if (cardsCount === 9_000_000) {
        createError('You have reach to the maximuim cards count in your system', error)
    }
    let random
    do {
        random = _.random(1_000_000, 9_999_999);
    } while (await isBuizNumberExsist(random))

    return random
}

const isBuizNumberExsist = async (bizNumber) => {
    try {
        const cardsWithTHisBizNumber = await Card.findOne({ bizNumber });
        return Boolean(cardsWithTHisBizNumber)
    } catch (error) {
        createError('mongoose', error)
    }
}

module.exports = { generateBizNumber };