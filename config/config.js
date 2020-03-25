const env = process.env.NODE_ENV;
const config = require(__dirname + '/../config/config.json')[env];

module.exports = config;