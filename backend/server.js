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
const morgan = require('morgan');
const checkAuth = require('./checkAuth');
const session = require('express-session');

app.set('trust proxy', 1) // trust first proxy 
app.use(session({
  secret: 'super secret',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))


app.use(bodyparser.json());
app.use(morgan('tiny'));

app.use(express.static('../frontend/public'));

app.get('/logout', (req, res) => res.redirect('/'));
app.post('/createAccount', checkAuth.createAccount);
app.post('/login', checkAuth.attemptLoggin);
app.use(checkAuth.checkUser);

app.set('port', (process.env.PORT || 3000));

app.use(['/','/slides','/lessons','tutorials'], router);

app.get('*', (req, res) => {
  res.redirect('/');
});



const server = app.listen(app.get('port'));