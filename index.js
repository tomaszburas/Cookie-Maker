const express = require('express');
const cookieParser = require('cookie-parser');
const hbs = require('express-handlebars');

const { homeRouter } = require('./routes/home');
const { orderRouter } = require('./routes/order');
const { handlebarsHelpers } = require('./handlebars-helpers');

const PORT = 3000;

const app = express();

app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

app.engine('.hbs', hbs({
  extname: '.hbs',
  helpers: handlebarsHelpers,
}));
app.set('view engine', '.hbs');

app.use('/', homeRouter);
app.use('/order', orderRouter);

app.listen(process.env.PORT || PORT);
