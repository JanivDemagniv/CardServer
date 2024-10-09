const connectToLocalDb = require('./mongoDb/connectToMongoDbLocaly');
const connectToAtlasDb = require('./mongoDb/connectToAtlas');
const congif = require('config');
const createUserMockData = require('../users/helpers/mockData/mockData');
const createCardMockData = require('../cards/helpers/mockData/mockData');
const Card = require('../cards/models/mongodb/Card');
const User = require('../users/models/mongodb/User');

const ENVIRONMENT = congif.get('ENVIRONMENT');

const connectToDb = async () => {
    if (ENVIRONMENT === 'development') {
        await connectToLocalDb();

        await createCardMockData();
        await createUserMockData();
    };
    if (ENVIRONMENT === 'production') {
        await connectToAtlasDb();
    };

};

module.exports = connectToDb;