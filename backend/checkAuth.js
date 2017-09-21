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
  // validate the input
  // create a user in the DB
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