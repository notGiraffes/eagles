/*
Run server to persist data
router in a separate file
*/
const bodyparser = require('body-parser');
const express = require('express');
const app = express();
// const router = require('./router.js');
// const database = require('./database.js');


app.use(express.static('../frontend/public'));

app.set('port', (process.env.PORT || 3000));



app.use('/', bodyparser.json());
app.use('/tutorials', bodyparser.json());
app.use('/lessons', bodyparser.json());
app.use('/', router);
app.use('/tutorials', router);
app.use('/lessons', router);

app.use('/', bodyparser.json());
app.use('/slides', bodyparser.json());
app.use('/lessons', bodyparser.json());
app.use('/tutorials', bodyparser.json());


app.use('/', router);
app.use('/slides', router);
app.use('/lessons', router);
app.use('/tutorials', router);


const server = app.listen(app.get('port'));