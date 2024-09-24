const { generateAuthToken } = require("../../auth/providers/jwt");
const { createError } = require("../../utils/handleErrors");
const { comparePasswords, generateUserPassword } = require("../helpers/bcryp");
const User = require("./mongodb/User");
const _ = require('lodash')

const createUser = async (newUser) => {
    try {
        let user = new User(newUser);
        user.password = generateUserPassword(user.password)
        user = await user.save();
        let resUser = _.pick(user, ['_id', 'email', 'name'])
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
        createError('mongoose', error)
    }
}

const loginUser = async (email, password) => {
    try {
        const userFromDb = await User.findOne({ email });
        if (!userFromDb) {
            let error = new Error;
            error.message = 'Authentication Error: Invalid email or password';
            createError('Authentication', error)
        };
        if (!comparePasswords(password, userFromDb.password)) {
            let error = new Error;
            error.message = 'Authentication Error: Invalid email or password';
            createError('Authentication', error);
        }
        userToken = generateAuthToken(userFromDb);
        return userToken
    } catch (error) {
        createError('mongoose', error)
    }
}

module.exports = { createUser, getUser, getUsers, loginUser }