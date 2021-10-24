const express = require('express');
const {COOKIE_BASES, COOKIE_GLAZE, COOKIE_ADDONS, COUPON_CODE} = require("../data/cookies-data");
const {handlebarsHelpers} = require("../handlebars-helpers");

const orderRouter = express.Router();

orderRouter
    .get('/basket', (req, res) => {
        const cookieData = req.cookies['Cookie-Maker'];
        const cookieCoupon = req.cookies['Cookie-Maker-coupon'];

        let nameCoupon;
        let valueCoupon;

        if (cookieCoupon) {
            [nameCoupon, valueCoupon] = cookieCoupon;
        } else {
            nameCoupon = null;
            valueCoupon = null;
        }

        res.render('order/summary', {
            cookieData,
            nameCoupon,
            valueCoupon,
            bases: Object.entries(COOKIE_BASES),
            glazes: Object.entries(COOKIE_GLAZE),
            addons: Object.entries(COOKIE_ADDONS)
        })
    })

    .post('/basket/set-cookie', (req, res) => {
        const {base} = req.body;
        if (base) {res.cookie('Cookie-Maker', req.body)}
        res.end();
    })

    .get('/thanks', (req, res) => {
        res.clearCookie('Cookie-Maker');
        res.clearCookie('Cookie-Maker-coupon');
        res.render('order/thanks');
    })

    .post('/coupon', (req, res) => {
        const {coupon} = req.body
        const cookieData = req.cookies['Cookie-Maker'];
        const coupons = Object.entries(COUPON_CODE)

        const findCoupon = coupons.find(e => e[0] === coupon);

        if (!findCoupon) {
            res.json(null)
        } else {
            const couponValue = findCoupon[1];
            const bases = Object.entries(COOKIE_BASES);
            const glazes = Object.entries(COOKIE_GLAZE);
            const addons = Object.entries(COOKIE_ADDONS);

            const summary = handlebarsHelpers.summaryPrice(cookieData, bases, glazes, addons);

            const newPrice = summary - (summary * (couponValue/100));

            res.cookie('Cookie-Maker-coupon', findCoupon)
            res.json({newPrice, findCoupon});
        }
    })

module.exports = {
    orderRouter,
}
