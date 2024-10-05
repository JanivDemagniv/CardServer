const { generateAuthToken } = require("../../auth/providers/jwt");
const { createError } = require("../../utils/handleErrors");
const { comparePasswords, generateUserPassword } = require("../helpers/bcryp");
const { oppositeArgument } = require("../helpers/functions");
const User = require("./mongodb/User");
const _ = require('lodash')

const createUser = async (newUser) => {
    try {
        let user = new User(newUser);
        user.password = generateUserPassword(user.password);
        user = await user.save();
        let resUser = _.pick(user, ['_id', 'email', 'name']);
        return resUser;
    } catch (error) {
        createError('mongoose', error)
    };
};

const getUser = async (userId) => {
    try {
        const user = await User.findById(userId);
        return user;
    } catch (error) {
        createError('moogoose', error);
    };
};

const getUsers = async () => {
    try {
        const users = await User.find();
        return users;
    } catch (error) {
        createError('mongoose', error);
    }
}

const loginUser = async (email, password) => {
    try {
        const userFromDb = await User.findOne({ email });
        if (!userFromDb) {
            let error = new Error;
            error.message = 'Authentication Error: Invalid email or password';
            createError('Authentication', error);
        };
        if (!comparePasswords(password, userFromDb.password)) {
            let error = new Error;
            error.message = 'Authentication Error: Invalid email or password';
            createError('Authentication', error);
        }
        userToken = generateAuthToken(userFromDb);
        return userToken
    } catch (error) {
        createError('mongoose', error);
    };
};

const editUser = async (userId, userToUpdate) => {
    try {
        let newUpdatedUser = await User.findByIdAndUpdate(userId, userToUpdate);
        return newUpdatedUser;
    } catch (error) {
        createError('Mongoose', error);
    };
};

const changeIsBusiness = async (userId, isBusiness) => {
    try {
        let newIsBusiness = oppositeArgument(isBusiness)
        let updatedUser = await User.findByIdAndUpdate(userId, { isBusiness: newIsBusiness });
        return updatedUser;
    } catch (error) {
        createError('Mongoose', error);
    };
};

const deleteUser = async (userId) => {
    try {
        let deleteUser = await User.findByIdAndDelete(userId);
        return deleteUser
    } catch (error) {
        createError('Mongoose', error)
    }
};

module.exports = { createUser, getUser, getUsers, loginUser, editUser, changeIsBusiness, deleteUser }