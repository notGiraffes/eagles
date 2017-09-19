import React from 'react';
import LessonSlideListEntry from './LessonSlideListEntry.js';
import Slide from './Slide.js';

class Lesson extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentSlide: '',
      slides: props.slides,
      index: ''
    }
  }

  onLessonSlideListEntryClick(index) {
    this.setState({
      currentSide: this.state.slides[index],
      index: index
    });
  }

  previousSlideClick(index) {
    index--;
    this.setState({
      index: index
    });
    onLessonSlideListEntryClick(index);
  }

  nextSlideClick(index) {
    index++;
    this.setState({
      index: index
    });
    onLessonSlideListEntryClick(index);
  }


  render() {
    return (
      <div>
        { this.state.currentSlide ? (
          <Slide 
          slideData={this.state.currentSlide} 
          previousSlideClick={props.previousSlideClick.bind(this)}
          nextSlideClick={props.nextSlideClick.bind(this)}
          />
        ) : (
          <div className="lessonSlideList">
            <div className="lesson">
              <h1 className="lessonTitle">{props.lesson.name}</h1>
              <p className="lessonDescription">{props.lesson.description}</p>
              <ol className="lessonOrderedList">
                {props.slides.map((slide, i) => {
                  return <LessonSlideListEntry
                    slide={slide}
                    index={i}
                    key={i}
                    onLessonSlideListEntryClick={props.onLessonSlideListEntryClick.bind(this)}
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

// previousSlide -  
// currentSlide - 