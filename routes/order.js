const express = require('express');

const orderRouter = express.Router();

orderRouter
    .get('/basket', (req, res) => {
        const cookieData = req.cookies['Cookie-Maker'];

        res.render('order/summary', {
            cookieData,
        })
    })

    .post('/basket/set-cookie', (req, res) => {
        const {base} = req.body;

        if (base) {
            res.cookie('Cookie-Maker', req.body);
        }

        res.end();
    })

module.exports = {
    orderRouter,
}
