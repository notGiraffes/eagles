const schema = require('./schema.js');
let User = schema.User;

exports.attemptLoggin = (req, res) => {
  let username = req.body.username || '';
  let password = req.body.password || '';
  console.log('attempting loggin with: ', username, password);
  // query db for user with password
  User.find({ username: username, password: password  })
    .then((users) => {
      // console.log('found users', users);
      // if yes, estabish a session
      if(users.length === 0) throw new Error('no Users');
      let user = users[0];
      req.session.user = true;
      res.send({
        loggedIn: true,
        userData: user
      })
    })
    .catch((err) => {
      res.send({ loggedIn: false })
    });
}

exports.createAccount = (req, res) => {
  // validate the input
  // create a user in the DB
}

exports.checkUser = (req, res, next) => {
  // make sure the person making requests is logged in
  if (!req.session.user) {
    console.log('your session: ', req.session);
    res.redirect('/logout');
  } else {
    next();
  }
}