const express = require('express');
const { COOKIE_BASES, COOKIE_GLAZE, COOKIE_ADDONS } = require('../data/cookies-data');

const homeRouter = express.Router();

homeRouter
  .get('/', (req, res) => {
    const cookieData = req.cookies['Cookie-Maker'];

    res.render('home/index', {
      cookieData,
      bases: Object.entries(COOKIE_BASES),
      glazes: Object.entries(COOKIE_GLAZE),
      addons: Object.entries(COOKIE_ADDONS),
    });
  })

  .get('/get-cookie', (req, res) => {
    const cookieData = req.cookies['Cookie-Maker'];

    if (cookieData) {
      res.json(cookieData);
    } else {
      res.json({ base: null });
    }
  });

module.exports = {
  homeRouter,
};
