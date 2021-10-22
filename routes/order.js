const express = require('express');

const orderRouter = express.Router();

orderRouter
    .get('/basket', (req, res) => {
        res.render('order/summary')
    })

    .post('/basket', (req, res) => {
        const {base} = req.body;


    })

module.exports = {
    orderRouter,
}
