const morgan = require('morgan');
const currentTime = require('../../utils/timeService');
const chalk = require('chalk')

// morgan.token('currentTime', currentTime())

const morganLogger = morgan((tokens, req, res) => {
    const { year, mounth, day, hours, seconds, minutes } = currentTime()
    let log = [
        // tokens.currentTime,
        `[${year}/${mounth}/${day} ${hours}:${minutes}:${seconds}]`,
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        '-',
        tokens['response-time'](req, res), 'ms'
    ].join(' ')
    return res.statusCode >= 400 ? chalk.redBright(log) : chalk.cyanBright(log)
});

module.exports = morganLogger