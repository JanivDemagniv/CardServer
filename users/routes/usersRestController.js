const auth = require("../../auth/authService");
const { handleError } = require("../../utils/handleErrors");
const { createUser, getUser, getUsers, loginUser, editUser, deleteUser, changeIsBusiness } = require("../models/userAccessDataService");
const express = require('express');
const { validateRegistration, validateLogin } = require("../validation/userValidationService");
const router = express.Router();


router.post('/', async (req, res) => {
    try {
        const errorMessage = validateRegistration(req.body);

        if (errorMessage) handleError(res, 400, 'Validation Error:' + errorMessage)

        let newUser = await createUser(req.body);
        res.send(newUser);
    } catch (error) {
        handleError(res, 400, error.message)
    };
});

router.post("/login", async (req, res) => {
    try {
        const errorMessage = validateLogin(req.body);
        if (errorMessage) return handleError(res, 400, 'Validate Error:' + errorMessage)

        let { email, password } = req.body;
        const token = await loginUser(email, password);
        res.send(token);
    } catch (error) {
        handleError(res, 400, error.message);
    }
});

router.get('/', auth, async (req, res) => {
    try {
        let userInfo = req.user;
        if (!userInfo.isAdmin) {
            handleError(res, 403, 'You Are not Authorized');
        }
        let users = await getUsers();
        res.send(users);
    } catch (error) {
        handleError(res, 400, error.message);
    };
});

router.get('/:id', auth, async (req, res) => {
    try {
        const { id } = req.params;
        const userInfo = req.user;
        if (userInfo._id !== id && !userInfo.isAdmin) {
            let error = new Error;
            error.message = 'You are not athurized to see user info';
            handleError(res, 403, error);
        }
        const user = await getUser(id);
        res.send(user);
    } catch (error) {
        handleError(res, 400, error.message);
    };
});

router.put('/:id', auth, async (req, res) => {
    try {
        const { id } = req.params;
        const userInfo = req.user;
        const userFromDb = await getUser(id);

        if (userInfo._id != userFromDb._id) {
            let error = new Error;
            error.message = 'You are not athurized to edit user';
            handleError(res, 403, error.message);
        };

        const updatedUser = await editUser(id, req.body);
        res.send(updatedUser);
    } catch (error) {
        handleError(res, 400, error.message)
    };
});

router.patch('/:id', auth, async (req, res) => {
    try {
        const { id } = req.params;
        const userInfo = req.user;
        const userFromDb = await getUser(id)

        if (userInfo._id !== id && !userInfo.isAdmin) {
            let error = new Error;
            error.message = 'You are not Authorize to change this';
            handleError(res, 403, error.message);
        };
        const newUser = await changeIsBusiness(id, userFromDb.isBusiness);
        res.send(newUser);
    } catch (error) {
        handleError(res, 400, error.message);
    };
});

router.delete('/:id', auth, async (req, res) => {
    try {
        const { id } = req.params;
        const userInfo = req.user;

        if (userInfo._id !== id && !userInfo.isAdmin) {
            let error = new Error;
            error.message = 'You are not authorize to delete this user';
            handleError(res, 403, error.message);
        };

        const userToDelete = await deleteUser(id);
        res.send(userToDelete);
    } catch (error) {
        handleError(res, 400, error.message);
    };
});


module.exports = router;