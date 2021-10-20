const express = require('express');
const {COOKIE_BASES, COOKIE_GLAZE, COOKIE_ADDONS} = require("../data/cookies-data");

const homeRouter = express.Router();

homeRouter
    .get('/', (req, res) => {
        res.render('home/index', {
            cookie: {
                base: 'light',
                glaze: 'chocolate',
                addons: ['kiwi'],
            },
            bases: Object.entries(COOKIE_BASES),
            glazes: Object.entries(COOKIE_GLAZE),
            addons: Object.entries(COOKIE_ADDONS)
        });
    });

module.exports = {
    homeRouter
}
