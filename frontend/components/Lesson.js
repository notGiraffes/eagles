import React from 'react';
import LessonSlideListEntry from './LessonSlideListEntry.js';
import Slide from './Slide.js';
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


// Collin will pass the lesson id, then I query the database in order to pull the relevant information, then I filter that

class Lesson extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentSlide: '',
      // slides: props.slides,
      slides: lesson.slides,
      index: ''
    }
  }

  componentDidMount() {
    return fetch('/lessons', { method: 'GET' })
      .then((response) => response.json())
      .then((lessonsDataJSON) => {
        // this.state.slides = lessons.Data.whereverTheSlidesAre           props.params.id will give the specific lesson to pull slides from
        this.setState({
          
        });
        // responseJSON
        // Or perhaps a setState thing
        console.log(lessonsData);
      })
      .catch((error) => {
        console.log('Disaster!!!');
      })
  }



  onLessonSlideListEntryClick(index) {
    this.setState({
      currentSlide: lesson.slides[index],
      index: index
    });
  }

  previousSlideClick(index) {
    index--;
    if (index < 0) {
      alert("There is no previous slide! You will be redirected to the Lesson Home Page.");
      this.exit();
    } else {
      this.setState({
        index: index
      });
      this.onLessonSlideListEntryClick(index);
    }
  }

  nextSlideClick(index) {
    index++;
    if (index === lesson.slides.length) {
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
  }


  render() {
    return (
      <div>
        { this.state.currentSlide ? (
          <Slide 
          slideData={this.state.currentSlide} 
          previousSlideClick={this.previousSlideClick.bind(this)}
          nextSlideClick={this.nextSlideClick.bind(this)}
          exitClick={this.exit.bind(this)}
          index={this.state.index}
          />
        ) : (
          <div className="lessonSlideList">
            <div className="lesson">
              <h1 className="lessonTitle">{lesson.name}</h1>
              <p className="lessonDescription">{lesson.description}</p>
              <ol className="lessonOrderedList">
                {lesson.slides.map((slide, i) => {
                  return <LessonSlideListEntry
                    slide={slide}
                    index={i}
                    key={i}
                    onLessonSlideListEntryClick={this.onLessonSlideListEntryClick.bind(this)}
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


export default Lesson;

// What should happen after last slide?