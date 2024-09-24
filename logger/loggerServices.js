const morganLogger = require("./loggers/morganLogger");
const config = require('config');

const LOGGER = config.get('LOGGER');

const loggerService = () => {
    if (LOGGER === 'morgan') {
        return morganLogger
    }
};

module.exports = loggerService;