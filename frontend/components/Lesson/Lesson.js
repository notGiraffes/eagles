import React from 'react';
import LessonSlideListEntry from './LessonSlideListEntry.js';
import Slide from './Slide.js';
// import lessons from '../testing/dummyData.js'


class Lesson extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      specificLesson: {},
      slides: [],
      currentSlide: null,
      index: 0,
      videoIdOfClickedOnVideo: ''
    }
  }

  componentDidMount() {
    return fetch('/lesson/' + this.props.match.params.id, { method: 'GET' }) 
      .then((response) => response.json())
      .then((lessonDataJSON) => {
        // console.log('LESSON DATA', lessonDataJSON); 
        this.setState({
          specificLesson: lessonDataJSON,
          slides: lessonDataJSON.slides
        });
      })
  }



  onLessonSlideListEntryClick(index) {
    
    var videoIdInUrl = this.state.slides[index].youTubeUrl;
    var sliceFrom = videoIdInUrl.indexOf('=');
    var videoId = videoIdInUrl.slice(sliceFrom + 1);
    this.setState({
      currentSlide: this.state.slides[index],
      index: index,
      videoIdOfClickedOnVideo: videoId
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
  }


  render() {
    return (
      <div>
        { this.state.currentSlide ? (
          <Slide 
          slideData={this.state.currentSlide} 
          videoIdOfClickedOnVideo={this.state.videoIdOfClickedOnVideo}
          previousSlideClick={this.previousSlideClick.bind(this)}
          nextSlideClick={this.nextSlideClick.bind(this)}
          exitClick={this.exit.bind(this)}
          index={this.state.index}
          />
        ) : (
          <div className="lessonSlideList">
            <div className="lesson">
              <h1 className="lessonTitle">{this.state.specificLesson.name}</h1>
              <p className="lessonDescription">{this.state.specificLesson.description}</p>
              <ol className="lessonOrderedList">
                {this.state.slides.map((slide, i) => {
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