/*
Schemas for each part. 
user,tutorial,lesson,slide
//don't mind the {type:String, required: true} it could just be String
*/


const mongoose = require(`mongoose`);
let Schema = mongoose.Schema;

let userSchema = new Schema({
  username: { type: String, required: true }
});
let user = mongoose.model('user', userSchema);


//////////////////

let slideSchema = new Schema({
  name: String,
  youTubeUrl: String,
  text: String,
  quizUrl: String
})
let slide = mongoose.model('slide', slideSchema);

//////////////////

let lessonSchema = new Schema({
  name: {type: String, required: true},
  description: String,
  slides: [slideSchema]
});
let lesson = mongoose.model('lesson', lessonSchema);

//////////////////

let tutorialSchema = new Schema({
  name: { type: String, required: true },
  lessons: [lessonSchema]
});
let tutorial = mongoose.model('tutorial', tutorialSchema);
//////////////////



module.exports = {
  user: user,
  tutorial: tutorial,
  lesson: lesson,
  slide: slide
}

