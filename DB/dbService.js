const connectToLocalDb = require('./mongoDb/connectToMongoDbLocaly');
const connectToAtlasDb = require('./mongoDb/connectToAtlas');
const congif = require('config');
const createUserMockData = require('../users/helpers/mockData/mockData');

const ENVIRONMENT = congif.get('ENVIRONMENT');

const connectToDb = async () => {
    if (ENVIRONMENT === 'development') {
        await connectToLocalDb();
    };
    if (ENVIRONMENT === 'production') {
        await connectToAtlasDb();
    };

    await createUserMockData()
};

module.exports = connectToDb;