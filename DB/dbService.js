const connectToLocalDb = require('./mongoDb/connectToMongoDbLocaly');
const connectToAtlasDb = require('./mongoDb/connectToAtlas');
const congif = require('config');

const ENVIRONMENT = congif.get('ENVIRONMENT');

const connectToDb = async () => {
    console.log(ENVIRONMENT);

    if (ENVIRONMENT === 'development') {
        await connectToLocalDb();
    };
    if (ENVIRONMENT === 'production') {
        await connectToAtlasDb();
    };
};

module.exports = connectToDb;