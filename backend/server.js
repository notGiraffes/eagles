/*
Run server to persist data
router in a separate file
*/
const bodyparser = require('body-parser');
const express = require('express');
const app = express();
const router = require('./router.js');
const database = require('./database.js');
const path = require('path');


app.use(express.static('../frontend/public'));

app.set('port', (process.env.PORT || 3000));

app.use(['/','/slides','/lessons','tutorials'], bodyparser.json());
app.use(['/','/slides','/lessons','tutorials'], router);

app.get('*', (req, res) => {
  res.redirect('/');
});


const server = app.listen(app.get('port'));