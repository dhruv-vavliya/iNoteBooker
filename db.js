
require('dotenv').config()
const mongo = require('mongoose');

const mongo_connector = async ()=>{
    await mongo.connect(process.env.DB_URI);
}

module.exports = mongo_connector;