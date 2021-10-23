const express = require('express');
const {COOKIE_BASES, COOKIE_GLAZE, COOKIE_ADDONS} = require("../data/cookies-data");

const orderRouter = express.Router();

orderRouter
    .get('/basket', (req, res) => {
        const cookieData = req.cookies['Cookie-Maker'];

        res.render('order/summary', {
            cookieData,
            bases: Object.entries(COOKIE_BASES),
            glazes: Object.entries(COOKIE_GLAZE),
            addons: Object.entries(COOKIE_ADDONS)
        })


    })

    .post('/basket/set-cookie', (req, res) => {
        const {base} = req.body;

        if (base) {
            res.cookie('Cookie-Maker', req.body);
        }

        res.end();
    })

    .get('/thanks', (req, res) => {
        res.clearCookie('Cookie-Maker');
        res.render('order/thanks');
    })

module.exports = {
    orderRouter,
}
