const express = require('express');

const addRouter = express.Router();

addRouter
    .post('/', (req, res) => {
        const {sector, name} = req.body;
        res.render('home/index', {
            cookie: {
                base: '',
                glaze: '',
                addons: ['nuts'],
            },
        })
    })



module.exports = {
    addRouter,
}
