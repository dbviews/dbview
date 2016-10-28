const express = require('express');
const app = express();
const path = require('path');

//extra middleware
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}), bodyParser.json());
app.use(express.static(path.join(__dirname, './../client/')));

app.post('/requestDB', userCtrl.sendDB);

app.listen(3000, ()=> console.log('listening on port 3000'));





