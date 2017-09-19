/*
Schemas for each part. 
user,tutorial,lesson,slide
//don't mind the {type:String, required: true} it could just be String

stories: [{ type: Schema.Types.ObjectId, ref: 'Story' }]
*/



const mongoose = require(`mongoose`);
let Schema = mongoose.Schema;

let userSchema = new Schema({
  username: { type: String, required: true },
  lessons: [String],
  favorites: [String],
  createdLessons:[String]
});
let user = mongoose.model('user', userSchema);

//////////////////

let lessonSchema = new Schema({
  name: {type: String, required: true},
  createdBy: String,
  description: String,
  slides: [String]
});
let lesson = mongoose.model('lesson', lessonSchema);

//////////////////

let slideSchema = new Schema({
  name: String,
  youTubeUrl: String,
  text: String,
  quizUrl: String,
  fromLesson: String
})
let slide = mongoose.model('slide', slideSchema);

module.exports = {
  user: user,
  lesson: lesson,
  slide: slide
}

