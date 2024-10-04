const express = require('express');
const { createCard, getCards, getCard, getMyCards, updateCard, updateBizNumber, deleteCard, updateLike } = require("../models/cardsAccessDataService");
const auth = require('../../auth/authService');
const normalizeCard = require('../helpers/normalize');
const { handleError } = require('../../utils/handleErrors');
const validateCard = require('../validation/cardValidationService');
const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const cards = await getCards();
        res.send(cards);
    } catch (error) {
        handleError(res, 400, error.message);
    };
});

router.get('/my-cards', auth, async (req, res) => {
    try {
        const userInfo = req.user;
        const id = req.user._id;

        if (!userInfo.isBusiness) {
            handleError(res, 403, 'Only buissness member have cards');
        }
        const cards = await getMyCards(id);
        res.send(cards);
    } catch (error) {
        handleError(res, 400, error.message);
    };
});


router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const card = await getCard(id);
        res.send(card);
    } catch (error) {
        handleError(res, 400, error.message);
    };
});

router.post("/", auth, async (req, res) => {
    try {
        const userInfo = req.user;
        if (!userInfo.isBusiness || !userInfo.isAdmin) {
            handleError(res, 403, 'you are not authuraize');
        };

        const errorMessage = validateCard(req.body);
        if (errorMessage !== '') {
            return handleError(res, 400, 'Validate Error:' + errorMessage);
        };

        let card = await normalizeCard(req.body, userInfo._id);
        card = await createCard(card);
        res.status(201).send(card);
    } catch (error) {
        handleError(res, 400, error.message);
    };
});


router.put('/:id', auth, async (req, res) => {
    try {
        const userInfo = req.user;
        const { id } = req.params;
        const newCard = req.body;
        const fullCardFromDb = await getCard(id);

        if (userInfo._id != fullCardFromDb.user_id && !userInfo.isAdmin) {
            return handleError(res, 403, 'Athorization error: you are no allowed to edit the card');
        };

        const errorMessage = validateCard(newCard);
        if (errorMessage !== "") {
            return handleError(res, 400, 'Validation Error' + errorMessage);
        };

        let card = await normalizeCard(newCard, userInfo._id);
        card = await updateCard(id, card);
        res.send(card);
    } catch (error) {
        handleError(res, 400, error.message);
    };
});

router.patch('/:id', auth, async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user._id;
        let card = await updateLike(id, userId);
        res.send(card);
    } catch (error) {
        handleError(res, 400, error.message);
    };
});

router.patch('/:id', async (req, res) => {
    try {
        let card = await updateBizNumber(req.body._id, req.body);
        res.send(card);
    } catch (error) {
        handleError(res, 400, error.message);
    };
});

router.delete('/:id', auth, async (req, res) => {
    try {
        let { id } = req.params;
        let userInfo = req.user;
        let fullCardFromDb = await getCard(id);

        if (userInfo._id != fullCardFromDb.user_id && !userInfo.isAdmin) {
            handleError(res, 403, 'You Are not allowed to Delete');
        };

        let card = await deleteCard(id);
        res.send(card);
    } catch (error) {
        handleError(res, 400, error.message);
    };
});

module.exports = router;