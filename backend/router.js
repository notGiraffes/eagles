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
const axios = require('axios');
const router = express.Router();
const key = require('./config/youtube.js')
var user = schema.user;
var lesson = schema.lesson;
var slide = schema.slide

router.use(function(req, res, next) {
    //console.log('new log from router.use', req.method, req.body);// log each request to the console
    next(); // continue doing what we were doing and go to the route
});

router.get('/query', function(req, res) {
  axios({
    method: 'get', 
    url: 'https://www.googleapis.com/youtube/v3/videos',
    params: {
      id: req.query.string,
      part: 'snippet,contentDetails,statistics',
      key: key
    }
  })
  .then((response) => {
    console.log('Youtube API get request success', response.data.items);
    // Send back (res.send) to SlideCreator, add to database from there.
  })
  .catch((err) => {
    console.log('Youtube API get request error', err);
  })
})

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
  user.findById(req.query._id, function(err, user) {
    if (err) res.status(400).send(err);

    if (req.body.username) user.username = req.body.username;
    if (req.body.lessons) user.lessons = req.body.lessons;
    if (req.body.favorites) user.favorites = req.body.favorites;
    if (req.body.createdLessons) user.createdLessons = req.body.createdLessons;

    user.save(function (err) {
      if (err) res.send(err);
      res.send('user updated')
    })
  })
})

router.put('/lessons', function(req, res) {
  lesson.findById(req.query._id, function(err, lesson) {
    if (err) res.status(400).send(err);

    if (req.body.name) lesson.name = req.body.name;
    if (req.body.createdBy) lesson.createdBy = req.body.createdBy;
    if (req.body.description) lesson.description = req.body.description;
    if (req.body.slides) lesson.slides = req.body.slides;

    lesson.save(function (err) {
      if (err) res.send(err);
      res.status(200).send(lesson);
    })
  })
})

router.put('/slides', function(req, res) {
  slide.findById(req.query._id, function(err, slide) {
    if (err) res.status(400).send(err);

    if (req.body.name) slide.name = req.body.name;
    if (req.body.youTubeUrl) slide.youTuleUrl = req.body.youTubeUrl;
    if (req.body.text) slide.text = req.body.text;
    if (req.body.quizUrl) slide.quizUrl = req.body.quizUrl;
    if (req.body.fromLesson) slide.fromLesson = req.body.fromLesson;

    lesson.save(function (err) {
      if (err) res.send(err);
      res.send('slide updated');
    })
  })
})

router.delete('/users', function(req, res) {
  user.findByIdAndRemove(req.query._id, function(err, user) {
    if (err) res.status(400).send(err);

    res.status(200).send(user._id + 'removed');
  })
})

router.delete('/lessons', function(req, res) {
  lesson.findByIdAndRemove(req.query._id, function(err, lesson) {
    if (err) res.status(400).send(err);

    res.status(200).send(lesson._id + 'removed');
  })
})

router.delete('/slides', function(req, res) {
  slide.findByIdAndRemove(req.query._id, function(err, slide) {
    if (err) res.status(400).send(err);

    res.status(200).send(slide._id + 'removed');
  })
})

module.exports = router;
