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

app.use(bodyparser.json());

app.use(session({
  secret: 'super secret',
  cookie: { 
    maxAge: 600000,
    secure: false,
    httpOnly: false
   }
}))

app.use(morgan('tiny'));

app.use(express.static('../frontend/public'));

// -------------------AUTH------------------------- //
app.get('/logout', checkAuth.logout);
app.post('/users', checkAuth.createAccount);
app.post('/login', checkAuth.attemptLoggin);
app.use(checkAuth.checkUser);
// ------------------------------------------------ //

app.set('port', (process.env.PORT || 3000));

app.use(['/','/slides','/lessons','tutorials'], router);

app.get('*', (req, res) => {
  res.redirect('/');
});



const server = app.listen(app.get('port'));