/*
router for coordinating get and post request when server recieves said request.
three schemas for each request
tutorial,lesson,slide
format guide
tut {name:  , lessons: [[]]}  //array of arrays
lesson {name: string, slides: [{}]} //array of object
slide {name:, value:}  //object
*/
const express = require('express');
const schema = require('./schema.js');
const router = express.Router();

router.use(function(req, res, next) {
    //console.log('new log from router.use', req.method, req.body);// log each request to the console
    next(); // continue doing what we were doing and go to the route
});

router.get('/',function(req, res) {
  res.end('router get worked');
});

router.get('/users', function(req, res) {
  schema.user.find({})
  .then(function(users) {
    res.status(200).send(users);
  })
  .catch(function(err) {
    res.status(400).send(err);
  })
})

router.get('/lessons', function(req, res) {
  schema.lesson.find({})
  .then(function(lessons) {
    res.status(200).send(lessons);
  })
  .catch(function(err) {
    res.status(400).send(err);
  })
});

router.get('/slides', function(req, res) {
  schema.slide.find({})
  .then(function(slides) {
    res.status(200).send(slides);
  })
  .catch(function(err) {
    res.status(400).send(err);
  })
});

router.post('/users', function(req, res) {
  var username = req.body.username;
  var lessons = req.body.lessons;
  var favorites = req.body.favorites;
  var createdLessons = req.body.createdLessons;
  schema.user.create({username: username, lessons: [], favorites: [], createdLessons: []})
  .then(result => {
    console.log(result);
    res.status(200).send('posted user');
  })
  .catch(function(err) {
    res.status(400).send(err);
  })
})

router.post('/lessons', function(req, res) {
  var name = req.body.name;
  var createdBy = req.body.createdBy
  var description = req.body.description;
  var slides = req.body.slides;
  schema.lesson.create({ name: name, createdBy: createdBy, description: description, slides: slides })
  .then(result => {
    res.end(`posted lessons`);
  })
  .catch(function(err) {
    res.status(400).send(err);
  })
})

router.post('/slides', function(req, res) {
  var slidename = req.body.name;
  var youTubeUrl = req.body.youTubeUrl;
  var text = req.body.text;
  var quizUrl = req.body.quizUrl;
  var fromLesson = req.body.fromLesson
  schema.slide.create({ name: slidename, youTubeUrl: youTubeUrl, text: text, quizUrl: quizUrl, fromLesson: fromLesson})
  .then(result => {
    res.status(200).send(`posted slide`);
  })
  .catch(function(err) {
    res.status(400).send(err);
  })
});

router.put('/users', function(req, res) {
  var username = req.body.username;
  var lessons = req.body.lessons;
  var favorites = req.body.favorites;
  var createdLessons = req.body.createdLessons;
  schema.user.create({username: username, lessons: [], favorites: [], createdLessons: []})
  .then(result => {
    console.log(result);
    res.status(200).send('posted user');
  })
  .catch(function(err) {
    res.status(400).send(err);
  })
})

module.exports = router;
