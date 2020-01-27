const createError = require('http-errors');
const mongoose = require('mongoose');

module.exports.base = (req, res, next) => {

    res.json({
        Jeremy : "Mendoza"
    });
};