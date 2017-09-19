/*
Schemas for each part. 
user,tutorial,lesson,slide
*/


const mongoose = require(`mongoose`);
let Schema = mongoose.Schema;

let userSchema = new Schema({
  username: { type: String, required: true }
});
let user = mongoose.model('user', userSchema);

//////////////////

let tutorialSchema = new Schema({
  name: { type: String, required: true },
  lessons: [lessonSchema]
});
let tutorial = mongoose.model('tutorial', tutorialSchema);
//////////////////


let lessonSchema = new Schema({
  name: {type: String, required: true},
  description: String,
  slides: [slideSchema]
});
let lesson = mongoose.model('lesson', lessonSchema);
//////////////////


let slideSchema = new Schema({
  name: String,
  value: String
})
let slide = mongoose.model('slide', slideSchema);
/////////////////



module.exports = {
  user: user,
  tutorial: tutorial,
  lesson: lesson,
  slide: slide
}

