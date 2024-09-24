const mongoose = require("mongoose");
require('dotenv').config();

const conectionStringForAtlas = process.env.ATLAS_CONNECTION_STRING

const connectToAtlasDb = async () => {
    try {
        await mongoose.connect(conectionStringForAtlas);
        console.log("Connected to MongoDB in Atlas");
    } catch (error) {
        console.error("Could not connect to MongoDB Atlas", error);
    }
};

module.exports = connectToAtlasDb;