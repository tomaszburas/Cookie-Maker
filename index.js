const express = require('express');
const cookieParser = require('cookie-parser');
const hbs = require('express-handlebars');

const {homeRouter} = require("./routes/home");
const {addRouter} = require('./routes/add');
const {orderRouter} = require('./routes/order');

const app = express();

app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

app.engine('.hbs', hbs({extname: '.hbs'}));
app.set('view engine', '.hbs');

app.use('/', homeRouter);
app.use('/add', addRouter);
app.use('/order', orderRouter);

app.listen(process.env.PORT || 3000)
