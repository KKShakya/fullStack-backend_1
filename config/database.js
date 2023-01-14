const mongoose = require('mongoose');
require('dotenv').config();

let mongoUrl = process.env.mongoUrl;

const connection = mongoose.connect(mongoUrl);

module.exports = {connection};