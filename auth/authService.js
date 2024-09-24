const { createError, handleError } = require("../utils/handleErrors");
const { verifyToken1 } = require("./providers/jwt");
const congif = require('config')

const tokenGenerator = congif.get('TOKEN_GENERATOR');

const auth = (req, res, next) => {

    if (tokenGenerator == 'jwt') {
        try {
            let token = req.header('x-auth-token')
            if (!token) {
                let error = new Error;
                error.message = 'Authentication Error: Please Login';
                createError('Authentication', error)
            }
            const userInfo = verifyToken1(token)
            if (!userInfo) {
                let error = new Error;
                error.message = 'Authentication Error: Unauthorize user'
                createError('Authentication', error)
            }
            req.user = userInfo
            return next()
        } catch (error) {
            handleError(res, 401, error.message)
        }
    }

    return handleError(res, 500, 'you did not use valid token generator');

}

module.exports = auth;