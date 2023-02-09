const express = require('express');
const PORT = 3000;

const app = express();

app.use("/",express.static(`${__dirname}/dist`));

app.listen(PORT, () => {
  console.log(`Приложение запущено на порту: ${PORT}!`);
  console.log(`${__dirname}/dist`)
});