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
  res.end();
});

router.get('/tutorials', function(req, res) {
  schema.tutorial.find({})
  .then(function(tutorials) {
    res.end(JSON.stringify(tutorials));
  })
});

router.get('/lessons', function(req, res) {
  schema.lesson.find({})
  .then(function(lessons) {
    res.end(JSON.stringify(lessons));
  })
});

router.get('/slides', function(req, res) {
  schema.slide.find({})
  .then(function(slides) {
    console.log(slides);
    res.end(JSON.stringify(slides));
  })
});

router.post('/slides', function(req, res) {
  var slidename = req.body.name;
  var slideyouTubeUrl = req.body.youTubeUrl;
  var slidetext = req.body.text;
  var slidequizUrl = req.body.quizUrl;
  schema.slide.create({ name: slidename, youTubeUrl:slideyouTubeUrl, text: slidetext, quizUrl: slidequizUrl})
  .then(result => {
    console.log(result);
    res.end(`posted slide`);
  });
});

router.post('/lessons', function(req, res) {
  var lessonname = req.body.name;
  var lessondescription = req.body.description;
  var slides = req.body.slides;
  schema.lesson.create({ name: lessonname, description: lessondescription, slides: slides })
  .then(result => {
    res.end(`posted lessons`);
  });
})

router.post('/tutorials', function(req, res) {
  var tutorialname = req.body.name;
  var lessons = req.body.lessons;
  schema.tutorial.create({ name: tutorialname, lessons: lessons })
  .then(result => {
    res.end(`posted tutorials`);
  });
})

module.exports = router;
