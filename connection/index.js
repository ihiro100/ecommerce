// const model = require('../models');
const mongoconn = require('./mongoconnection.js');
const boom = require('boom');
let connection = async function () {

    try {
        await mongoconn();
    } catch (error) {
        boom.badImplementation('database error');
    }
}
module.exports = connection;
