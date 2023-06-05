/* eslint-disable import/no-extraneous-dependencies */
require('dotenv').config();
const express = require('express');
const fallback = require('express-history-api-fallback');

const PORT = 3000;
const app = express();
const root = `${__dirname}/dist`;
app.use('/', express.static(root));
app.use('/static', express.static(root));
app.use(fallback('index.html', { root }));

app.listen(process.env.API_PORT || PORT, () => {
  console.log(`Приложение запущено на порту: ${process.env.API_PORT || PORT}!`);
});
