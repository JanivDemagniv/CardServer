const { createError } = require("../../utils/handleErrors");
const Card = require("./mongodb/Card");

const getCards = async () => {
    try {
        const cards = await Card.find();
        return cards
    } catch (error) {
        createError("Mongoose", error)
    }
}

const getCard = async (cardId) => {
    try {
        const card = await Card.findById(cardId);
        return card
    } catch (error) {
        createError('Mongoose', error)
    }
}

const getMyCards = async (userId) => {
    try {
        let cards = await Card.find({ user_id: userId });
        return cards
    } catch (error) {
        createError('Mongoose', error);
    }
}

const createCard = async (newCard) => {
    try {
        let card = new Card(newCard);
        card = await card.save();
        return card;
    } catch (error) {
        createError('Mongoose', error)
    }
};

const updateCard = async (cardId, updateCard) => {
    try {
        let card = await Card.findByIdAndUpdate(cardId, updateCard, { new: true })
        return card
    } catch (error) {
        createError('Mongoose', error);
    }
}

const updateBizNumber = async (cardId, bizNumber) => {
    try {
        let card = await Card.findByIdAndUpdate(cardId, bizNumber)
        return card
    } catch (error) {
        createError('Mongoose', error);
    }
}

const updateLike = async (cardId, userId) => {
    try {
        let card = await Card.findById(cardId);
        if (card) {
            if (card.likes.includes(userId)) {
                let newLikes = card.likes.filter((like) => like != userId);
                card.likes = newLikes;
            } else {
                card.likes.push(userId)
            }
            await card.save()
            return card
        }
        let error = new Error;
        error.message = 'Card not found';
        createError('Path', error);
    } catch (error) {
        createError('Mongoose', error)
    }
}

const deleteCard = async (cardId) => {
    try {
        let card = await Card.findByIdAndDelete(cardId);
        return card
    } catch (error) {
        createError('Mongoose', error);
    }
}

module.exports = { createCard, getCards, getCard, getMyCards, updateCard, updateBizNumber, updateLike, deleteCard };