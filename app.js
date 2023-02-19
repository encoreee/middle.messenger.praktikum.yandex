require('dotenv').config();
const express = require('express');

const PORT = 3000;
const app = express();
app.use('/', express.static(`${__dirname}/dist`));

app.listen(process.env.API_PORT || PORT, () => {
  // console.log(`Приложение запущено на порту: ${process.env.API_PORT || PORT}!`);
  // console.log(`${__dirname}/dist`);
});
