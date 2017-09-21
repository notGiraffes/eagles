const schema = require('./schema.js');
let User = schema.User;

exports.attemptLoggin = (req, res) => {
  let username = req.body.username || '';
  let password = req.body.password || '';
  // // query db for user with password
  User.find({ username: username, password: password  })
    .then((users) => {
      if(users.length === 0) throw new Error('no Users');
      let user = users[0];
      user.password = '';
      req.session.username = username;
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify({
        loggedIn: true,
        userData: user
      }));
    })
    .catch((err) => {
      console.log('failed logging in: ', err);
      res.send({ loggedIn: false });
    });
}

exports.logout = (req, res) => {
  console.log('destroying your session');
  req.session.destroy();
  res.redirect('/');
}

exports.createAccount = (req, res) => {
  var username = req.body.username;
  var password = req.body.password;
  var lessons = req.body.lessons || [];
  var favorites = req.body.favorites || [];
  var createdLessons = req.body.createdLessons || [];
  User.create({
    username: username, 
    password: password,
    lessons: lessons, 
    favorites: favorites, 
    createdLessons: createdLessons
  })
  .then(function(result) {
    console.log('created user: ', result);
    req.session.username = result.username;
    result.password = '';
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({
      loggedIn: true,
      userData: result
    }));
  })
  .catch(function(err) {
    res.send(err);
  })
}

exports.checkUser = (req, res, next) => {
  // make sure the person making requests is logged in
  if (!req.session.username) {
    console.log('stopped: ', req.session.username);
    res.redirect('/');
  } else {
    console.log('sent along: ', req.session.username);
    next();
  }
}