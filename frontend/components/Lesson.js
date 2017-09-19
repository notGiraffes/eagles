import React from 'react';
import LessonSlideListEntry from './LessonSlideListEntry.js';
import Slide from './Slide.js';
<<<<<<< HEAD

=======
// import lessons from '../testing/dummyData.js'

var slides = [{
  "name": "slide1",
  "youTubeUrl": "lAJWHHUz8_8",
  "text": "This is text for slide1",
  "quizUrl": "quiz for slide1"
},{
  name: 'slide2',
  youTubeUrl: "4ZAEBxGipoA",
  text: "This is text for slide2",
  quizUrl: "quiz for slide2"
},{
  name: 'slide3',
  youTubeUrl: "mFEoarLnnqM",
  text: "This is text for slide3",
  quizUrl: "quiz for slide3"
}];

var lesson = {
  name: 'lesson1',
  description: 'lesson1 description',
  slides: slides
};

>>>>>>> lessonAndSlide
class Lesson extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
<<<<<<< HEAD
      currentSlide: '',
      slides: props.slides,
=======
      specificLesson:'',
      slides: '',
      currentSlide: '',
>>>>>>> lessonAndSlide
      index: ''
    }
  }

<<<<<<< HEAD
  onLessonSlideListEntryClick(index) {
    this.setState({
      currentSide: this.state.slides[index],
=======
  componentDidMount() {
    return fetch('/lessons', { method: 'GET' })
      .then((response) => response.json())
      .then((lessonsDataJSON) => {
        this.setState({
          specificLesson: lessonDataJSON[this.props.params.id],
          slides: lessonDataJSON[this.props.params.id].slides
        });
      })
      .catch((error) => {
        console.log('Disaster!!!');
      })
  }



  onLessonSlideListEntryClick(index) {
    this.setState({
      currentSlide: this.state.slides[index],
>>>>>>> lessonAndSlide
      index: index
    });
  }

  previousSlideClick(index) {
    index--;
<<<<<<< HEAD
    this.setState({
      index: index
    });
    onLessonSlideListEntryClick(index);
=======
    if (index < 0) {
      alert("There is no previous slide! You will be redirected to the Lesson Home Page.");
      this.exit();
    } else {
      this.setState({
        index: index
      });
      this.onLessonSlideListEntryClick(index);
    }
>>>>>>> lessonAndSlide
  }

  nextSlideClick(index) {
    index++;
<<<<<<< HEAD
    this.setState({
      index: index
    });
    onLessonSlideListEntryClick(index);
=======
    if (index === this.state.slides.length) {
      alert('You\'ve made it to the end of the lesson.')
      this.exit();
    } else {
      this.setState({
        index: index
      });
      this.onLessonSlideListEntryClick(index);
    }
  }

  exit() {
    this.setState({
      currentSlide: '',
      index: ''
    });
>>>>>>> lessonAndSlide
  }


  render() {
    return (
      <div>
        { this.state.currentSlide ? (
          <Slide 
          slideData={this.state.currentSlide} 
<<<<<<< HEAD
          previousSlideClick={props.previousSlideClick.bind(this)}
          nextSlideClick={props.nextSlideClick.bind(this)}
=======
          previousSlideClick={this.previousSlideClick.bind(this)}
          nextSlideClick={this.nextSlideClick.bind(this)}
          exitClick={this.exit.bind(this)}
          index={this.state.index}
>>>>>>> lessonAndSlide
          />
        ) : (
          <div className="lessonSlideList">
            <div className="lesson">
<<<<<<< HEAD
              <h1 className="lessonTitle">{props.lesson.name}</h1>
              <p className="lessonDescription">{props.lesson.description}</p>
              <ol className="lessonOrderedList">
                {props.slides.map((slide, i) => {
=======
              <h1 className="lessonTitle">{this.state.specificLesson.name}</h1>
              <p className="lessonDescription">{this.state.specificLesson.description}</p>
              <ol className="lessonOrderedList">
                {this.state.slides.map((slide, i) => {
>>>>>>> lessonAndSlide
                  return <LessonSlideListEntry
                    slide={slide}
                    index={i}
                    key={i}
<<<<<<< HEAD
                    onLessonSlideListEntryClick={props.onLessonSlideListEntryClick.bind(this)}
=======
                    onLessonSlideListEntryClick={this.onLessonSlideListEntryClick.bind(this)}
>>>>>>> lessonAndSlide
                  />
                })}
              </ol>
            </div>
          </div>
        )}
      </div>
    );
  }
}


<<<<<<< HEAD
export default Lesson;

// previousSlide -  
// currentSlide - 
=======
export default Lesson;
>>>>>>> lessonAndSlide
