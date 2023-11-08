'use strict';

const general = require('./general_routes');
const gateway1 = require('./gateway1_routes');

// Determine the base path
const _basepath = process.env.BASEPATH || '';
const basepath = _basepath ? `/${_basepath}` : '';
console.log(`Starting ${basepath ? `with basepath: ${basepath}` : 'without basepath'}`);

// Set up routes
module.exports = function (app) {
    app.use(`${basepath}/general`, general);
    app.use(`${basepath}/gateway1`, gateway1);
    app.get('/check', (req, res) => {
        res.send('Server is running');
    })
};
