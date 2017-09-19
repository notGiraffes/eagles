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

router.get('/',function(req, res) {
  res.end();
});

router.get('/tutorials', function(req, res) {
  schema.tutorial.find({})
  .then(function(tutorials) {
    res.end(tutorials);
  })
});

router.get('/lessons', function(req, res) {
  schema.lesson.find({})
  .then(function(lessons) {
    res.end(lessons);
  })
});

router.get('/slides', function(req, res) {
  schema.slide.find({})
  .then(function(slides) {
    res.end(slides);
  })
});

router.post('/slide', function(req, res) {
  var slidename = req.body.name;
  var slidevalue = req.body.value;
  schema.slide.create({ name: slidename, value: slidevalue })
  .then(result => {
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

// let Schema = mongoose.Schema;

// let userSchema = new Schema({
//   username: { type: String, required: true }
// });
// let user = mongoose.model('user', userSchema);

// //////////////////

// let tutorialSchema = new Schema({
//   name: { type: String, required: true },
//   lessons: [[]]
// });
// let tutorial = mongoose.model('tutorial', tutorialSchema);
// //////////////////


// let lessonSchema = new Schema({
//   name: {type: String, required: true},
//   slides: [{
//     name: String,
//     value: String
//   }]
// });
// let lesson = mongoose.model('lesson', lessonSchema);
// //////////////////


// let slideSchema = new Schema({
//   name: String,
//   value: String
// })
// let slide = mongoose.model('slide', slideSchema);