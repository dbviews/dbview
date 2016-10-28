const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(path.join(__dirname, '../../node_modules/')));
app.use(express.static(path.join(__dirname, '../client/')));

app.listen(3000, () => {
  console.log('Listening on port 3000');
});