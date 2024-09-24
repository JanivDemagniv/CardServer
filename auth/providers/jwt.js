const jwt = require('jsonwebtoken');
require('dotenv').config()

const SECRET_WORD = process.env.JWT_SECRET

const generateAuthToken = (user) => {
    const token = jwt.sign({ _id: user._id, isAdmin: user.isAdmin, isBusiness: user.isBusiness, initAt: new Date() }, SECRET_WORD);
    return token
}

const verifyToken = (tokenFromClient) => {
    const checkToken = jwt.verify(tokenFromClient, SECRET_WORD, (err, decoded) => {
        if (err) {
            return null
        } else {
            return decoded
        }
    });
}

const verifyToken1 = (tokenFromClient) => {
    try {
        const checkToken = jwt.verify(tokenFromClient, SECRET_WORD);
        return checkToken
    } catch (err) {
        return null
    }
}

module.exports = { generateAuthToken, verifyToken, verifyToken1 }